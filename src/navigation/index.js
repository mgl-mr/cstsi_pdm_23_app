import React from 'react';
import {EstudanteProvider} from '../context/EstudanteProvider';
import {AthUserProvider} from '../context/AuthUserProvider';
import {LobbyProvider} from '../context/LobbyProvider';
import {JogoProvider} from '../context/JogoProvider';
import {ApiProvider} from '../context/ApiProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AthUserProvider>
      <ApiProvider>
        <JogoProvider>
          <EstudanteProvider>
            <LobbyProvider>
              <Navigator />
            </LobbyProvider>
          </EstudanteProvider>
        </JogoProvider>
      </ApiProvider>
    </AthUserProvider>
  );
}
