import React, {useContext, useEffect, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {Alert, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

import {LobbyContext} from '../../context/LobbyProvider';
import {JogosContext} from '../../context/JogoProvider';
import Loading from '../../components/Loading';
import JogosPicker from '../../components/JogosPicker';
import MyButtom from '../../components/MyButtom';
import DeleteButton from '../../components/DeleteButton';
import {Container, Scrool, Div, TextInput, Text, Image} from './styles';

const Lobby = ({navigation}) => {
  const {jogos} = useContext(JogosContext);
  const {lobbys, saveLobby, deleteLobby} = useContext(LobbyContext);

  const [lobbyId, setLobbyId] = useState('');
  const [nome, setNome] = useState('');
  const [maxJogadores, setMaxJogadores] = useState('');
  const [convite, setConvite] = useState(false);
  const [numJogadores, setNumjogadores] = useState('');
  const [jogo, setJogo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const lobby = lobbys.filter(l => l.idDono === auth().currentUser.uid);
    if (lobby[0]) {
      setLobbyId(lobby[0].id);
      setNome(lobby[0].nome);
      setMaxJogadores(lobby[0].maxJogadores);
      setConvite(lobby[0].convidar);
      setNumjogadores(lobby[0].numJogadores);
      setJogo(lobby[0].jogo);
    }
  }, [lobbys]);

  const salvar = async () => {
    if (
      nome.length === 0 ||
      maxJogadores === '' ||
      maxJogadores === 0 ||
      jogo === ''
    ) {
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
    lobby.id = lobbyId;
    lobby.nome = nome;
    lobby.maxJogadores = maxJogadores;
    lobby.numJogadores = numJogadores;
    lobby.convidar = convite;
    lobby.id_dono = auth().currentUser.uid;
    lobby.jogo = jogo;

    setLoading(true);
    if (await saveLobby(lobby)) {
      showToastWithGravity('lobby atualizado com sucesso');
      setLoading(false);
    } else {
      showToastWithGravity('Ops! Deu problema ao salvar.');
      setLoading(false);
    }
  };

  const excluir = () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o Lobby?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteLobby(lobbyId);
          setLoading(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AppStack'}],
            }),
          );
        },
      },
    ]);
  };

  const showToastWithGravity = mensagem => {
    ToastAndroid.showWithGravity(
      mensagem,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  return (
    <Container>
      <Scrool>
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
          <CheckBox value={convite} onValueChange={setConvite} />
        </Div>
        <Div>
          <Image source={{uri: jogo.urlFoto}} />
          <JogosPicker jogos={jogos} onJogoSelecionado={setJogo} />
        </Div>
        <MyButtom text="Salvar" onClick={salvar} />
        <DeleteButton texto="Excluir" onClick={excluir} />
      </Scrool>
      {loading && <Loading />}
    </Container>
  );
};

export default Lobby;
