import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import MyButtom from '../../components/MyButtom';

import {EstudanteContext} from '../../context/EstudanteProvider';
import {Container, TextInput} from './styles';
import Loading from '../../components/Loading';

const Estudante = ({navigation, route}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState();
  const [loading, setLoading] = useState(false);

  const {save} = useContext(EstudanteContext);

  useEffect(() => {
    setNome(route.params.value.nome);
    setCurso(route.params.value.curso);
    setUid(route.params.value.uid);
  }, [route]);

  const salvar = async () => {
    if (nome && curso) {
      let estudante = {};
      estudante.uid = uid;
      estudante.nome = nome;
      estudante.curso = curso;

      setLoading(true);
      if (await save(estudante)) {
        Alert.alert('Show!', 'Você salvou com sucesso.');
        setLoading(false);
        navigation.goBack();
      } else {
        Alert.alert('Ops!', 'Deu problema ao salvar.');
        setLoading(false);
      }
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
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
        value={curso}
      />
      <MyButtom text="Salvar" onClick={salvar} />
      {loading && <Loading />}
    </Container>
  );
};

export default Estudante;
