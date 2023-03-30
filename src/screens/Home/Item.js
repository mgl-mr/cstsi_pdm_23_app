import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 100px;
  background-color: ${COLORS.primaryLight};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const Div = styled.View`
  width: 100%;
  height: 35px;
  flex-direction: row;
  align-items: baseline;
`;

const TextNome = styled.Text`
  font-size: 24px;
  text-align: justify;
  color: ${COLORS.white};
`;

const TextCurso = styled.Text`
  font-size: 16px;
  color: ${COLORS.white};
`;

const TextAdiantamento = styled.Text`
  font-size: 14px;
  color: ${COLORS.white};
  margin-left: 5px;
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextNome>{item.nome}</TextNome>
        <Div>
          <TextCurso>{item.curso}</TextCurso>
          <TextAdiantamento>{item.adiantamento}</TextAdiantamento>
        </Div>
      </>
    </Button>
  );
};
export default Item;
