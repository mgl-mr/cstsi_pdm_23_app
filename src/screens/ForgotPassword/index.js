import React, {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Body, TextInput} from './styles';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const recover = props => {
    if (email !== '') {
      setLoading(true);
      auth()
        .sendPasswordResetEmail(email)
        .then(r => {
          setLoading(false);
          Alert.alert(
            'Atenção',
            'Enviammos uma email de recuperação de senha para o seguinte endereço: ' +
              email,
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
        })
        .catch(e => {
          setLoading(false);
          console.log('ForgotPassword, recover: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('ERRO', 'Usuário não cadastrado');
              break;
            case 'auth/invalid-email':
              Alert.alert('ERRO', 'email inválido');
              break;
            case 'auth/user-disabled':
              Alert.alert('ERRO', 'Usuário desabilitado ');
              break;
          }
        });
    } else {
      Alert.alert('ERRO', 'Por favor, digite o email cadastrado. ');
    }
  };

  return (
    <Body>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MyButtom text="Recuperar" onClick={recover} />
      {loading && <Loading />}
    </Body>
  );
};
export default ForgotPassword;
