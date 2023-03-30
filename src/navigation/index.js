import React from 'react';
import {EstudanteProvider} from '../context/EstudanteProvider';
import {AthUserProvider} from '../context/AuthUserProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AthUserProvider>
      <EstudanteProvider>
        <Navigator />
      </EstudanteProvider>
    </AthUserProvider>
  );
}
