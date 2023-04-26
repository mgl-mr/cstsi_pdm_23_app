import React, { useContext, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import {ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';

import {LobbyContext} from '../../context/LobbyProvider';
import {JogosContext} from '../../context/JogoProvider';
import Loading from '../../components/Loading';
import JogosPicker from '../../components/JogosPicker';
import MyButtom from '../../components/MyButtom';
import {Container, Div, TextInput, Text} from './styles';

const AdicionarLobby = ({navigation}) => {
  const {jogos} = useContext(JogosContext);
  const [nome, setNome] = useState('');
  const [maxJogadores, setMaxJogadores] = useState('');
  const [convite, setConvite  ] = useState(false);
  const [jogoId, setJogoId] = useState('');
  const [loading, setLoading] = useState(false);

  const {save} = useContext(LobbyContext);

  const salvar = async () => {
    if (nome.length == 0 || maxJogadores == '' || maxJogadores == 0 || jogoId == '') {
      showToastWithGravity('Preencha todos os campos!');
      return 0;
    }
    if (nome.length > 20) {
      showToastWithGravity('Nome com mais de 20 caracteres.');
      return 0;
    }
    if (maxJogadores > 30) {
      showToastWithGravity('Máximo de 30 jogadores.');
      return 0;
    }

    let lobby = {};
    lobby.id = '';
    lobby.nome = nome;
    lobby.maxJogadores = maxJogadores;
    lobby.convidar = convite;
    lobby.id_dono = auth().currentUser.uid;
    lobby.id_jogo = jogoId;

    setLoading(true);
      if (await save(lobby)) {
        showToastWithGravity('lobby criado com sucesso');
        setLoading(false);
        navigation.goBack();
      } else {
        showToastWithGravity('Ops! Deu problema ao salvar.');
        setLoading(false);
      }
  }

  const showToastWithGravity = (mensagem) => {
    ToastAndroid.showWithGravity(
      mensagem,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  return (
    <Container>
      <TextInput
        placeholder="Nome Do lobby"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Máximo de jogadores"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setMaxJogadores(t)}
        value={maxJogadores}
      />
      <Div>
        <Text>Convidar: </Text>
        <CheckBox value={convite} onValueChange={setConvite}/>
      </Div>
      <JogosPicker jogos={jogos} onJogoSelecionado={setJogoId} />
      <MyButtom text="Salvar" onClick={salvar} />
      {loading && <Loading />}
    </Container>
  );
};

export default AdicionarLobby;