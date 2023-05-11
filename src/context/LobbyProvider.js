import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const LobbyContext = createContext({});

export const LobbyProvider = ({children}) => {
  const [lobbys, setLobbys] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('lobbys')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        let data = [];
        snapShot.forEach(doc => {
          //console.log(doc.id, ' => ', doc.data());
          data.push({
            id: doc.id,
            nome: doc.data().nome,
            maxJogadores: doc.data().maxJogadores,
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

  const save = async (lobby, id) => {
    try {
      await firestore().collection('lobbys').doc(id).set(lobby, {merge: true});
      return true;
    } catch (error) {
      console.log('LobbyProvider, save' + error);
      return false;
    }
  };

  const del = async id => {
    try {
      await firestore().collection('lobbys').doc(id).delete();
      return true;
    } catch (error) {
      console.log('EstudanteProvider, del' + error);
    }
  };

  return (
    <LobbyContext.Provider value={{lobbys, save, del}}>
      {children}
    </LobbyContext.Provider>
  );
};
