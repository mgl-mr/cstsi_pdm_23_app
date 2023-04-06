import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {EstudanteContext} from '../../context/EstudanteProvider';
import MyButtom from '../../components/MyButtom';
import {Container, Text} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';

const Home = ({navigation}) => {
  const {estudantes} = useContext(EstudanteContext);

  useEffect(() => {
    //console.log(estudantes);
  }, [estudantes]);

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

  const routeStudent = value => {
    navigation.navigate('Estudante', {value});
  };

  return (
    <Container>
      <Text>Estudantes</Text>

      {estudantes.map((v, k) => {
        return <Item item={v} onPress={() => routeStudent(v)} key={k} />;
      })}

      <AddFloatButton onClick={() => routeStudent(null)} />
      <MyButtom text="Sair" onClick={logout} />
    </Container>
  );
};
export default Home;
