import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

import MyButtom from '../../components/MyButtom';
import {Text} from './styles';

const Home = ({navigation}) => {
  const [cont, setCont] = useState(0);

  //useEffect(() => {}, []);
  //criação do componente
  // useEffect(() => {
  //   console.log('chamou na criação do componente');

  //   return () => {
  //     console.log('chamou ao destruir o componente');
  //   };
  // }, []);

  //na atualização do componente
  // useEffect(() => {
  //   console.log('chamou na atualização do componente');
  // }, [cont]);

  const incrementar = () => {
    setCont(cont + 1);
  };

  const decrementar = () => {
    setCont(cont - 1);
  };

  const logout = async () => {
    EncryptedStorage.removeItem('user_session')
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AuthStack'}],
          }),
        );
      })
      .catch(error => {
        console.error('Home, logout' + error);
        Alert.alert('Erro', 'Problema ao sair.');
      });
  };

  return (
    <View>
      <Text>Contador: {cont}</Text>
      <MyButtom text="Incrementar" onClick={incrementar} />
      <MyButtom text="Decrementar" onClick={decrementar} />
      <MyButtom
        text="Vai para Screen Curso"
        onClick={() => navigation.navigate('Cursos')}
      />
      <MyButtom text="Sair" onClick={logout} />
    </View>
  );
};
export default Home;
