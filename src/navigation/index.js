import React from 'react';
import {EstudanteProvider} from '../context/EstudanteProvider';
import {AthUserProvider} from '../context/AuthUserProvider';
import {LobbyProvider} from '../context/LobbyProvider';
import {JogoProvider} from '../context/JogoProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AthUserProvider>
      <JogoProvider>
        <EstudanteProvider>
          <LobbyProvider>
            <Navigator />
          </LobbyProvider>
        </EstudanteProvider>
      </JogoProvider>
    </AthUserProvider>
  );
}
