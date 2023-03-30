import React, {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Body, TextInput} from './styles';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  const cadastar = () => {
    if (email !== '' || pass !== '' || confirPass !== '') {
      if (pass === confirPass) {
        setLoading(true);
        auth()
          .createUserWithEmailAndPassword(email, pass)
          .then(() => {
            auth()
              .currentUser.sendEmailVerification()
              .then(() => {
                setLoading(false);
                Alert.alert(
                  'Informação',
                  `Conta cadastrada com sucesso.Foi enviado um email de confirmação para: ${email}`,
                );
                navigation.goBack();
              })
              .catch(e => {
                console.log('SignUp, cadastrar: ' + e);
              });
          })
          .catch(e => {
            setLoading(false);
            console.log('SignUp, cadastrar: ' + e);
            switch (e.code) {
              case 'auth/email-already-in-use':
                Alert.alert('ERRO', 'Email já está em uso.');
                break;
              case 'auth/operation-not-allowed':
                Alert.alert('ERRO', 'Problemas ao cadastrar o usuário.');
                break;
              case 'auth/invalid-email':
                Alert.alert('ERRO', 'email inválido.');
                break;
              case 'auth/weak-password':
                Alert.alert(
                  'ERRO',
                  'Senha fraca, por favor, digite uma senha forte.',
                );
                break;
            }
          });
      } else {
        Alert.alert('Erro', 'As senhas digitadas são diferentes.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <Body>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setPass(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
        onChangeText={t => setConfirmPass(t)}
      />
      <MyButtom text="Cadastrar" onClick={cadastar} />
      {loading && <Loading />}
    </Body>
  );
};

export default SignUp;
