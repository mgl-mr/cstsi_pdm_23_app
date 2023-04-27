import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../assets/colors';
import Search from './Search';

const JogosPicker = ({jogos, onJogoSelecionado}) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [jogoSelecionado, setJogoSelecionado] = useState(null);
  const [textoPesquisa, setTextoPesquisa] = useState('');

  const exibirModal = () => {
    setModalVisivel(true);
  };

  const ocultarModal = () => {
    setModalVisivel(false);
  };

  const selecionarJogo = jogo => {
    setJogoSelecionado(jogo);
    onJogoSelecionado(jogo.id);
    ocultarModal();
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => selecionarJogo(item)}>
        <Text style={styles.itemTexto}>{item.nome}</Text>
      </TouchableOpacity>
    );
  };

  const jogosFiltrados = jogos
    .filter(
      jogo =>
        jogo.nome.toLowerCase().includes(textoPesquisa.toLowerCase()) &&
        jogo.multiplayer,
    )
    .slice(0, 50);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={exibirModal}>
        <Text>
          {jogoSelecionado ? jogoSelecionado.nome : 'Selecione um jogo'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisivel} onRequestClose={ocultarModal}>
        <Search text="Procurar jogo" setChave={setTextoPesquisa} />
        <FlatList
          data={jogosFiltrados}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Modal>
    </View>
  );
};

export default JogosPicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '95%',
    paddingLeft: 2,
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 15,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
  },
  itemTexto: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
});
