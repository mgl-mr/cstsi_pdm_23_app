/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

import Loading from '../../components/Loading';

const Preload = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (error) {
      // There was an error on the native side
      console.error('Preload, retrieveUserSession' + error);
      return null;
    }
  }

  const entrar = async () => {
    const userSession = await retrieveUserSession();
    if (userSession) {
      try {
        setLoading(true);
        await auth().signInWithEmailAndPassword(
          userSession.email,
          userSession.pass,
        );
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } catch (e) {
        setLoading(false);
        console.error('Preload,' + e);
      }
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    entrar();
  }, []);

  return <View style={styles.container}>{loading && <Loading />}</View>;
};

export default Preload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
