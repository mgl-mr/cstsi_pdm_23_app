import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';
import { ScrollView } from 'react-native/types';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

export const Scrool = styled.ScrollView`
  width: 100%;
  padding: 10px;
`;

export const Div = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
  margin-top: 15px;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 2px;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  width: 100%;
  height: 26px;
  font-size: 16px;
  color: ${COLORS.black};
`;

export const P = styled.Text`
  width: 70%;
  height: 26px;
  font-size: 16px;
  color: ${COLORS.black};
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
`;
