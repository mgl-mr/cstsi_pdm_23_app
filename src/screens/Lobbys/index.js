import React, {useContext, useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {LobbyContext} from '../../context/LobbyProvider';
import {JogosContext} from '../../context/JogoProvider';
import Card from './Card';
import AddFloatButton from '../../components/AddFloatButton';
import JogosPicker from '../../components/JogosPicker';
import {Container, FlatList, Button} from './styles';
import {COLORS} from '../../assets/colors';

const Lobbys = ({navigation}) => {
  const {lobbys} = useContext(LobbyContext);
  const {jogos} = useContext(JogosContext);
  const [lobbysFiltrados, setLobbysFiltrados] = useState('');

  useEffect(() => {}, [lobbys]);

  const renderItem = ({item}) => {
    return <Card nome={item.nome} jogo={item.jogo} />;
  };

  const filtraLobbys = id => {
    let data = lobbys.filter(l => l.jogo.idJogo === id);
    if (data.length > 0) {
      setLobbysFiltrados(lobbys.filter(l => l.idJogo === id));
    } else {
      setLobbysFiltrados('');
      showToastWithGravity('Sem resultados.');
    }
  };

  const showToastWithGravity = mensagem => {
    ToastAndroid.showWithGravity(
      mensagem,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  return (
    <Container>
      <JogosPicker jogos={jogos} onJogoSelecionado={filtraLobbys} />
      <FlatList
        data={lobbysFiltrados !== '' ? lobbysFiltrados : lobbys}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button onPress={() => setLobbysFiltrados('')}>
        <Icon name="close-circle-outline" size={30} color={COLORS.primary} />
      </Button>
      <AddFloatButton onClick={() => navigation.navigate('AdicionarLobby')} />
    </Container>
  );
};

export default Lobbys;
