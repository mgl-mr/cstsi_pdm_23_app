import React, {useContext} from 'react';

import {LobbyContext} from '../../context/LobbyProvider';
import {JogosContext} from '../../context/JogoProvider';
import {Container, Text} from './styles';
import Card from './Card';

const MyScreen = () => {
  const {lobbys} = useContext(LobbyContext);
  const {jogos} = useContext(JogosContext);

  const getJogo = idJogo => {
    const jogo = jogos.find(g => g.id === idJogo);
    return {nome: jogo.nome, urlFoto: jogo.urlFoto}
  };
  return (
    <Container>
      <Text>LOBBYS</Text>
      <Card nome={lobbys[0].nome} jogo={getJogo(lobbys[0].idJogo)} />
    </Container>
  );
};

export default MyScreen;
