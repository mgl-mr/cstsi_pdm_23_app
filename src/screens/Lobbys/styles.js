import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  border-width: 0px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const FlatList = styled.FlatList`
  width: 90%;
`;
