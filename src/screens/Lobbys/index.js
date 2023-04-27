import React, {useContext, useEffect, useState} from 'react';
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

  useEffect(() => {
    if (lobbysFiltrados === '') {
      setLobbysFiltrados(lobbys);
    }
  }, [lobbysFiltrados, lobbys]);

  const getJogo = idJogo => {
    const jogo = jogos.find(g => g.id === idJogo);
    return {nome: jogo.nome, urlFoto: jogo.urlFoto};
  };

  const renderItem = ({item}) => {
    return <Card nome={item.nome} jogo={getJogo(item.idJogo)} />;
  };

  const filtraLobbys = id => {
    setLobbysFiltrados(lobbys.filter(l => l.idJogo === id));
  };

  return (
    <Container>
      <JogosPicker jogos={jogos} onJogoSelecionado={filtraLobbys} />
      <FlatList
        data={lobbysFiltrados}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {lobbysFiltrados !== lobbys && (
        <Button onPress={() => setLobbysFiltrados(lobbys)}>
          <Icon name="close-circle-outline" size={30} color={COLORS.primary} />
        </Button>
      )}
      <AddFloatButton onClick={() => navigation.navigate('AdicionarLobby')} />
    </Container>
  );
};

export default Lobbys;
