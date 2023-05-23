/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useEffect, useContext} from 'react';

import {ApiContext} from './ApiProvider';

export const LobbyContext = createContext({});

export const LobbyProvider = ({children}) => {
  const [lobbys, setLobbys] = useState([]);
  const [lobby, setLobby] = useState({});
  const {api} = useContext(ApiContext);

  useEffect(() => {
    if (api) {
      getLobbys();
    }
  }, [api]);

  const getLobbys = async () => {
    try {
      const response = await api.get('/lobbys');
      if (!response.data.documents) {
        return false;
      }
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
          numJogadores: d.fields.numJogadores.integerValue,
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

  const getLobby = async id => {
    try {
      const response = await api.get('/lobbys/' + id);
      let data = {};
      data.id = id;
      data.nome = response.data.fields.nome.stringValue;
      data.maxJogadores = response.data.fields.maxJogadores.stringValue;
      data.convidar = response.data.fields.convidar.booleanValue;
      data.idDono = response.data.fields.id_dono.stringValue;
      data.numJogadores = response.data.fields.numJogadores.integerValue;

      data.jogo = {
        id: response.data.fields.jogo.mapValue.fields.id.stringValue,
        nome: response.data.fields.jogo.mapValue.fields.nome.stringValue,
        multiplayer:
          response.data.fields.jogo.mapValue.fields.multiplayer.booleanValue,
        urlFoto: response.data.fields.jogo.mapValue.fields.urlFoto.stringValue,
      };
      setLobby(data);
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
          numJogadores: {integerValue: 0},
          id_dono: {stringValue: val.id_dono},
          jogo: {
            mapValue: {
              fields: {
                id: {stringValue: val.jogo.id},
                nome: {stringValue: val.jogo.nome},
                urlFoto: {stringValue: val.jogo.urlFoto},
                multiplayer: {booleanValue: val.jogo.multiplayer},
              },
            },
          },
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
          numJogadores: {integerValue: val.numJogadores},
          id_dono: {stringValue: val.id_dono},
          jogo: {
            mapValue: {
              fields: {
                id: {stringValue: val.jogo.id},
                nome: {stringValue: val.jogo.nome},
                urlFoto: {stringValue: val.jogo.urlFoto},
                multiplayer: {booleanValue: val.jogo.multiplayer},
              },
            },
          },
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

  const enterLobby = async (user, val) => {
    try {
      await getLobby(val.id);

      if (lobby.numJogadores === lobby.maxJogadores) {
        return 'Lobby está cheio!';
      }
      let numJogadores = +lobby.numJogadores + 1;

      await api.patch('/lobbys/' + val.id, {
        fields: {
          nome: {stringValue: val.nome},
          maxJogadores: {stringValue: val.maxJogadores},
          convidar: {booleanValue: val.convidar},
          numJogadores: {integerValue: numJogadores},
          id_dono: {stringValue: val.idDono},
          jogo: {
            mapValue: {
              fields: {
                id: {stringValue: val.jogo.id},
                nome: {stringValue: val.jogo.nome},
                urlFoto: {stringValue: val.jogo.urlFoto},
                multiplayer: {booleanValue: val.jogo.multiplayer},
              },
            },
          },
        },
      });
      getLobbys();
      return true;
    } catch (response) {
      console.error('Erro em enterLobby via API: ');
      console.log(response);
      return false;
    }
  };

  return (
    <LobbyContext.Provider
      value={{lobbys, saveLobby, updateLobby, deleteLobby, enterLobby}}>
      {children}
    </LobbyContext.Provider>
  );
};
