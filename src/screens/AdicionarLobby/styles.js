import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

export const Div = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 95%;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
  margin-top: 15px;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 2px;
`;

export const TextInput = styled.TextInput`
  width: 95%;
  height: 50px;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  width: 45%;
  height: 26px;
  font-size: 16px;
  color: ${COLORS.black};
`;
