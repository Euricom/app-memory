import React,
    {
        Component,
        NavigatorIOS,
        StyleSheet
    }
    from 'react-native';

import { Main } from './components/main';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111'
    }
})

export class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                title: 'Memory',
                component: Main,
                }}>
            </NavigatorIOS>
        </Provider>
    );
  }
}
