import React, {useContext} from 'react';

import {LobbyContext} from '../../context/LobbyProvider';
import {JogosContext} from '../../context/JogoProvider';
import Card from './Card';
import AddFloatButton from '../../components/AddFloatButton';
import {Container, Text, FlatList} from './styles';

const Lobbys = ({navigation}) => {
  const {lobbys} = useContext(LobbyContext);
  const {jogos} = useContext(JogosContext);

  const getJogo = idJogo => {
    const jogo = jogos.find(g => g.id === idJogo);
    return {nome: jogo.nome, urlFoto: jogo.urlFoto}
  };

  const renderItem = ({ item }) => {
    return <Card nome={item.nome} jogo={getJogo(item.idJogo)} />;
  };

  return (
    <Container>
      <Text>LOBBYS</Text>
      <FlatList
        data={lobbys}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <AddFloatButton onClick={() => navigation.navigate('AdicionarLobby')} />
    </Container>
  );
};

export default Lobbys;
