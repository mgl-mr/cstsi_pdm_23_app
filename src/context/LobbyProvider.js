import React, {createContext, useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';

import {ApiContext} from './ApiProvider';

export const LobbyContext = createContext({});

export const LobbyProvider = ({children}) => {
  const [lobbys, setLobbys] = useState([]);
  const {api} = useContext(ApiContext);
  
  useEffect(() => {
    if (api) {
      getLobbys();
    }
  }, [api]);

  const getLobbys = async () => {
    try {
      const response = await api.get('/lobbys');
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/pdm-23-aula/databases/(default)/documents/lobbys/',
        );
        data.push({
          id: k[1],
          nome: d.fields.nome.stringValue,
          maxJogadores: d.fields.maxJogadores.stringValue,
          convidar: d.fields.convidar.booleanValue,
          idDono: d.fields.id_dono.stringValue,
          jogo: {
            id: d.fields.jogo.mapValue.fields.id.stringValue,
            nome: d.fields.jogo.mapValue.fields.nome.stringValue,
            multiplayer: d.fields.jogo.mapValue.fields.multiplayer.booleanValue,
            urlFoto: d.fields.jogo.mapValue.fields.urlFoto.stringValue,
          },
        });
      });
      setLobbys(data);
    } catch (response) {
      console.error('Erro em getLobbys via API:');
      console.error(response);
    }
  };

  const saveLobby = async val => {
    try {
      await api.post('/lobbys/', {
        fields: {
          nome: {stringValue: val.nome},
          maxJogadores: {stringValue: val.maxJogadores},
          convidar: {booleanValue: val.convidar},
          id_dono: {stringValue: val.id_dono},
          jogo: {mapValue: {
            fields: {
              id: {stringValue: val.jogo.id},
              nome: {stringValue: val.jogo.nome},
              urlFoto: {stringValue: val.jogo.urlFoto},
              multiplayer: {booleanValue: val.jogo.multiplayer},
            }
          }},
        },
      });
      getLobbys();
      return true;
    } catch (response) {
      console.error('Erro em saveCompany via API: ' + response);
      return false;
    }
  };

  const updateLobby = async val => {
    try {
      await api.patch('/lobbys/' + val.id, {
        fields: {
          nome: {stringValue: val.nome},
          maxJogadores: {stringValue: val.maxJogadores},
          convidar: {booleanValue: val.convidar},
          id_dono: {stringValue: val.id_dono},
          jogo: {mapValue: {
            fields: {
              id: {stringValue: val.jogo.id},
              nome: {stringValue: val.jogo.nome},
              urlFoto: {stringValue: val.jogo.urlFoto},
              multiplayer: {booleanValue: val.jogo.multiplayer},
            }
          }},
        },
      });
      getLobbys();
      return true;
    } catch (response) {
      console.error('Erro em updateCompany via API: ' + response);
      return false;
    }
  };

  const deleteLobby = async val => {
    try {
      await api.delete('/lobbys/' + val);
      getLobbys();
      return true;
    } catch (response) {
      console.error('Erro em deleteCompany via API: ' + response);
      return false;
    }
  };

  return (
    <LobbyContext.Provider value={{lobbys, saveLobby, updateLobby, deleteLobby}}>
      {children}
    </LobbyContext.Provider>
  );
};
