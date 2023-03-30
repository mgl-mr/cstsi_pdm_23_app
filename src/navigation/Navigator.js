import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';
import Cursos from '../screens/Cursos/styles';
import {COLORS} from '../assets/colors';
import Estudante from '../screens/Estudante';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
    <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen
      component={Home}
      name="Home"
      options={{
        tabBarLabel: 'Alunos',
        tabBarIcon: () => {
          <Icon name="people" color={COLORS.primary} />;
        },
      }}
    />
    <Tab.Screen component={Cursos} name="Cursos" size={24} />
    <Tab.Screen component={Estudante} name="Estudante" size={24} />
  </Tab.Navigator>
);

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
    </Stack.Navigator>
  </NavigationContainer>
);
export default Navigator;
