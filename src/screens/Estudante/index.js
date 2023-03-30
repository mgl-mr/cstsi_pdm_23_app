import React, {useState} from 'react';
import MyButtom from '../../components/MyButtom';

import {Container, Text, TextInput} from './styles';

const Estudante = ({route}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState();
  const [loading, setLoading] = useState(false);

  const log = () => {
    console.log(route.params);
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setCurso(t)}
        value={nome}
      />
      <MyButtom text="Salvar" onClick={log} />
    </Container>
  );
};

export default Estudante;
