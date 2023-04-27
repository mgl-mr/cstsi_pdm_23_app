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
import {Container, Div, TextInput, Text} from './styles';

const Lobby = ({navigation}) => {
  const {jogos} = useContext(JogosContext);
  const {lobbys, save, del} = useContext(LobbyContext);
  
  const [lobbyId, setLobbyId] = useState('');
  const [nome, setNome] = useState('');
  const [maxJogadores, setMaxJogadores] = useState('');
  const [convite, setConvite  ] = useState(false);
  const [jogoId, setJogoId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const lobby = lobbys.filter(l => l.idDono === auth().currentUser.uid);
    setLobbyId(lobby[0].id);
    setNome(lobby[0].nome);
    setMaxJogadores(lobby[0].maxJogadores);
    setConvite(lobby[0].convidar);
    setJogoId(lobby[0].idJogo);
  }, []);

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
    lobby.id = lobbyId;
    lobby.nome = nome;
    lobby.maxJogadores = maxJogadores;
    lobby.convidar = convite;
    lobby.id_dono = auth().currentUser.uid;
    lobby.id_jogo = jogoId;

    setLoading(true);
      if (await save(lobby)) {
        showToastWithGravity('lobby atualizado com sucesso');
        setLoading(false);
      } else {
        showToastWithGravity('Ops! Deu problema ao salvar.');
        setLoading(false);
      }
  }

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
          await del(lobbyId);
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
      <DeleteButton texto="Excluir" onClick={excluir} />
      {loading && <Loading />}
    </Container>
  );
};

export default Lobby;