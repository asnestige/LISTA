import React from 'react';
import {KeepAwake, registerRootComponent} from 'expo';
import App from './src/App';

const AwakeInDevApp = props => [
  <App key="app" {...props} />,
  process.env.NODE_ENV === 'development' ? (
    <KeepAwake key="keep-awake" />
  ) : null,
];

registerRootComponent(AwakeInDevApp);
