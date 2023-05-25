import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const LobbyContext = createContext();

export const LobbyProvider = ({children}) => {
  const [lobbys, setLobbys] = useState([]);
  const [lobby, setLobby] = useState({});
  const [activeLobbyId, setActiveLobbyId] = useState('');

  useEffect(() => {
    const listener = firestore()
      .collection('lobbys')
      .onSnapshot(snapShot => {
        let data = [];
        snapShot.forEach(doc => {
          //console.log(doc.id, ' => ', doc.data());
          data.push({
            id: doc.id,
            nome: doc.data().nome,
            maxJogadores: doc.data().maxJogadores,
            numJogadores: doc.data().numJogadores,
            convidar: doc.data().convidar,
            idDono: doc.data().id_dono,
            jogo: doc.data().jogo,
          });
        });
        setLobbys(data);
      });
    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    const listener = firestore()
    .collection('lobbys')
    .doc(activeLobbyId)
    .onSnapshot(doc => {
      if (doc.exists) {
        setLobby({
          id: doc.id,
          nome: doc.data().nome,
          maxJogadores: doc.data().maxJogadores,
          numJogadores: doc.data().numJogadores,
          jogadores: doc.data().jogadores,
          convidar: doc.data().convidar,
          idDono: doc.data().id_dono,
          jogo: doc.data().jogo,
        });
      } else {
        setLobby({});
      }
    });
    
    return () => {
      listener();
    };
  }, [activeLobbyId, lobbys]);

  const saveLobby = async lobby => {
    try {
      const data = {
        nome: lobby.nome,
        maxJogadores: lobby.maxJogadores,
        convidar: lobby.convidar,
        id_dono: lobby.id_dono,
        jogo: lobby.jogo,
      };

      if(!lobby.id) {
        data.numJogadores = 0;
        data.jogadores = [];
      }

      const lobbyRef = firestore().collection('lobbys').doc(lobby.id);
      const lobbyId = lobbyRef.id;

      await lobbyRef.set(data, { merge: true })

      setActiveLobbyId(lobbyId);
      return true;
    } catch (error) {
      console.log('LobbyProvider, saveLobby' + error);
      return false;
    }
  };

  const deleteLobby = async id => {
    try {
      await firestore().collection('lobbys').doc(id).delete();
      setActiveLobbyId('');
      return true;
    } catch (error) {
      console.log('LobbyProvider, deleteLobby' + error);
    }
  };

  const enterLobby = async (user, lobby) => {
    try {
      let numJogadores = parseInt(lobby.numJogadores) + 1;
      await firestore()
        .collection('lobbys')
        .doc(lobby.id)
        .update({
          numJogadores: numJogadores,
          jogadores: firestore.FieldValue.arrayUnion(user),
        });
      setActiveLobbyId(lobby.id);
      return true;
    } catch (error) {
      console.log('LobbyProvider, deleteLobby' + error);
      return 'Erro ao entrar no Lobby.'
    }
  }

  return (
    <LobbyContext.Provider value={{lobbys, lobby, enterLobby, saveLobby, deleteLobby}}>
      {children}
    </LobbyContext.Provider>
  );
};
