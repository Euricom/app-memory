/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
} from 'react-native';

import { App } from './app/app';

class memory extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('memory', () => memory);
