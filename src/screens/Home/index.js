import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {EstudanteContext} from '../../context/EstudanteProvider';
import MyButtom from '../../components/MyButtom';
import {Container} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import Search from '../../components/Search';

const Home = ({navigation}) => {
  const {estudantes} = useContext(EstudanteContext);
  const [chavePesquisa, setChavePesquisa] = useState('');
  const [estudantesFiltrados, setEstudantesFiltrados] = useState('');

  useEffect(() => {
    let a = [];
    estudantes.forEach(estudante => {
      if (estudante.nome.toLowerCase().includes(chavePesquisa.toLowerCase())) {
        a.push(estudante);
      }
    });
    setEstudantesFiltrados(a);
  }, [chavePesquisa, estudantes]);

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
      <Search text="Procurar Aluno" setChave={setChavePesquisa} />

      {estudantesFiltrados.length > 0
        ? estudantesFiltrados.map((v, k) => {
            return <Item item={v} onPress={() => routeStudent(v)} key={k} />;
          })
        : estudantes.map((v, k) => {
            return <Item item={v} onPress={() => routeStudent(v)} key={k} />;
          })}

      <AddFloatButton onClick={() => routeStudent(null)} />
      <MyButtom text="Sair" onClick={logout} />
    </Container>
  );
};
export default Home;
