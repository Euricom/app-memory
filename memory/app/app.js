import
    React,
    {
        Component,
        View,
        NavigatorIOS,
        StyleSheet
    }
    from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';

import Main from './components/main';
const logger = createLogger();
const store = createStore(reducers, {config:{}}, applyMiddleware(thunk, logger));
// store.subscribe((state) => {
//
// });
//
// store.disptch({
//     type: LOAD_STATE
// })

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
                }}
                navigationBarHidden={true}>
            </NavigatorIOS>
        </Provider>
    );
  }
}
