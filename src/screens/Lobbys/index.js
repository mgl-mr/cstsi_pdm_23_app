import React, {useContext} from 'react';

import {LobbyContext} from '../../context/LobbyProvider';
import {JogosContext} from '../../context/JogoProvider';
import JogosPicker from '../../components/JogosPicker';
import {Container, Text, FlatList} from './styles';
import Card from './Card';

const Lobbys = () => {
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
    </Container>
  );
};

export default Lobbys;
