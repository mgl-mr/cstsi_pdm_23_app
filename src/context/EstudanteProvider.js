import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const EstudanteContext = createContext({});

export const EstudanteProvider = ({children}) => {
  const [estudantes, setEstudantes] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('estudantes')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        let data = [];
        snapShot.forEach(doc => {
          //console.log(doc.id, ' => ', doc.data());
          data.push({
            uid: doc.id,
            nome: doc.data().nome,
            curso: doc.data().curso,
          });
        });
        setEstudantes(data);
      });

    return () => {
      listener();
    };
  }, []);

  const save = async estudante => {
    try {
      await firestore().collection('estudantes').doc(estudante.uid).set(
        {
          curso: estudante.curso,
          nome: estudante.nome,
        },
        {merge: true},
      );
      return true;
    } catch (error) {
      console.log('EstudanteProvider, save' + error);
      return false;
    }
  };

  const del = async uid => {
    try {
      await firestore().collection('estudantes').doc(uid).delete();
      return true;
    } catch (error) {
      console.log('EstudanteProvider, del' + error);
    }
  };

  return (
    <EstudanteContext.Provider value={{estudantes, save, del}}>
      {children}
    </EstudanteContext.Provider>
  );
};
