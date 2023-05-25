import React, {useContext, useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

import {LobbyContext} from '../../context/LobbyProvider';
import {JogosContext} from '../../context/JogoProvider';
import Card from './Card';
import AddFloatButton from '../../components/AddFloatButton';
import JogosPicker from '../../components/JogosPicker';
import Loading from '../../components/Loading';
import {Container, FlatList, Button} from './styles';
import {COLORS} from '../../assets/colors';

const Lobbys = ({navigation}) => {
  const {lobbys, enterLobby} = useContext(LobbyContext);
  const {jogos} = useContext(JogosContext);
  const [lobbysFiltrados, setLobbysFiltrados] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [lobbys]);

  const renderItem = ({item}) => {
    return (
      <Card onPress={() => entrar(item)} nome={item.nome} jogo={item.jogo} />
    );
  };

  const filtraLobbys = id => {
    let data = lobbys.filter(l => l.jogo.idJogo === id);
    if (data.length > 0) {
      setLobbysFiltrados(lobbys.filter(l => l.idJogo === id));
    } else {
      setLobbysFiltrados('');
      showToastWithGravity('Sem resultados.');
    }
  };

  const showToastWithGravity = mensagem => {
    ToastAndroid.showWithGravity(
      mensagem,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const entrar = async lobby => {
    if (parseInt(lobby.numJogadores) === parseInt(lobby.maxJogadores)) {
      showToastWithGravity('Lobby cheio!');
      console.log('cheio');
      return false;
    }
    
    let user = {
      uid: auth().currentUser.uid,
      email: auth().currentUser.email,
    };

    setLoading(true);
    let response = await enterLobby(user, lobby);
    setLoading(false);

    if (response !== true) {
      showToastWithGravity(response);
      return;
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'LobbyStack'}],
      }),
    );
  };

  return (
    <Container>
      <JogosPicker jogos={jogos} onJogoSelecionado={filtraLobbys} />
      <FlatList
        data={lobbysFiltrados !== '' ? lobbysFiltrados : lobbys}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button onPress={() => setLobbysFiltrados('')}>
        <Icon name="close-circle-outline" size={30} color={COLORS.primary} />
      </Button>
      <AddFloatButton onClick={() => navigation.navigate('AdicionarLobby')} />
      {loading && <Loading />}
    </Container>
  );
};

export default Lobbys;
