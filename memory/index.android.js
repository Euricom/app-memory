import React, {
  AppRegistry,
  Component,
} from 'react-native';

import { App } from './app/app';
/* eslint-disable react/prefer-stateless-function*/
class memory extends Component {
    render() {
        return (
            <App />
        );
    }
}
/* eslint-enable react/prefer-stateless-function*/
AppRegistry.registerComponent('memory', () => memory);
