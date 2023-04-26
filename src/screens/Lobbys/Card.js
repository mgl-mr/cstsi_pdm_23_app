import React from 'react';
import styled from 'styled-components/native';

import {COLORS} from '../../assets/colors';

const Card = ({nome, jogo}) => {
  return (
    <Container>
      <Div>
        <TextNome>{nome}</TextNome>
        <TextJogo>{jogo.nome}</TextJogo>
      </Div>
      <Image source={{uri: jogo.urlFoto}} />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 120px;
  background-color: ${COLORS.primary};
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Div = styled.View`
  width: 50%;
  background-color: ${COLORS.primary};
`;

const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
`;

const TextJogo = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.white};
`;

const TextNome = styled.Text`
  font-size: 16px;
  color: ${COLORS.white};
`;

export default Card;
