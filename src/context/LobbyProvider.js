import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const LobbyContext = createContext();

export const LobbyProvider = ({children}) => {
  const [lobbys, setLobbys] = useState([]);

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
            convidar: doc.data().convidar,
            idDono: doc.data().id_dono,
            idJogo: doc.data().id_jogo,
          });
        });
        setLobbys(data);
      });

    return () => {
      listener();
    };
  }, []);

  return (
    <LobbyContext.Provider value={{lobbys}}>{children}</LobbyContext.Provider>
  );
};
