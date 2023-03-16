import React, {useState} from 'react';
import {Alert} from 'react-native';

import {Body, TextInput} from './styles';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  const cadastar = async () => {
    if (email !== '' && pass !== '' && confirPass !== '') {
      if (pass === confirPass) {
      } else {
        Alert.alert('Erro', 'As senhas digitadas são diferentes.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, digite email e senha.');
    }
  };

  return (
    <Body>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
      />
      <MyButtom texto="Cadastrar" onClick={cadastar} />
      {loading && <Loading />}
    </Body>
  );
};

export default SignUp;
