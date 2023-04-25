import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const JogosContext = createContext();

export const JogoProvider = ({children}) => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('jogos')
      .onSnapshot(snapShot => {
        let data = [];
        snapShot.forEach(doc => {
          //console.log(doc.id, ' => ', doc.data());
          data.push({
            id: doc.id,
            nome: doc.data().nome,
            multiplayer: doc.data().multiplayer,
            urlFoto: doc.data().urlFoto,
          });
        });
        setJogos(data);
      });

    return () => {
      listener();
    };
  }, []);

  return (
    <JogosContext.Provider value={{jogos}}>{children}</JogosContext.Provider>
  );
};
