import React, {useState, useContext} from 'react';
import {StyleSheet, View, Alert, TouchableHighlight, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {COLORS} from '../../assets/colors';
import {LobbyContext} from '../../context/LobbyProvider';
import Icon from 'react-native-vector-icons/Ionicons';

const LobbyMap = ({route, navigation}) => {
  const [mapType, setMapType] = useState('standard');
  const {lobbys} = useContext(LobbyContext);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    text: {
      fontSize: 20,
      color: mapType === 'standard' ? COLORS.primary : COLORS.white,
    },
    button: {
      width: '35%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff0',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: mapType === 'standard' ? COLORS.primary : COLORS.white,
    },
  });

  const pickCoordinates = (e) => {
    route.params.onGoBack(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    );
    Alert.alert(
      'Show!',
      'Latitude= ' +
        e.nativeEvent.coordinate.latitude +
        '\nLongitude= ' +
        e.nativeEvent.coordinate.longitude +
        '\nConfirmar esse local?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            navigation.goBack();
          },
          style: 'cancel',
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => {
          if (typeof route.params !== 'undefined') {
            pickCoordinates(e);
          }
        }}
        initialRegion={{
          latitude: -31.766108372781073,
          longitude: -52.35215652734042,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {lobbys.map(lobby => {
          return (
            <Marker
              key={lobby.id}
              coordinate={{
                latitude: Number(lobby.latitude),
                longitude: Number(lobby.longitude),
              }}
              title={lobby.nome}
              description={lobby.jogo.nome}
              draggable
              onDragEnd={e => {
                if (route.params && route.params.edit === lobby.id) {
                  pickCoordinates(e);
                }
              }} 
            >
              <Icon
                name="game-controller"
                color={mapType === 'standard' ? COLORS.primary : COLORS.white}
                size={35}
              />
            </Marker>
          );
        })}
      </MapView>
      <TouchableHighlight
        style={styles.button}
        onPress={() =>
          mapType === 'standard'
            ? setMapType('satellite')
            : setMapType('standard')
        }>
        <Text style={styles.text}>
          {mapType === 'standard' ? 'Padrão' : 'Satélite'}
        </Text>
      </TouchableHighlight>
    </View>
  );
};
export default LobbyMap;