/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import
    React,
    {
        Component,
        NavigatorIOS,
    }
    from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';

import Main from './components/main';
const logger = createLogger();
const store = createStore(reducers, { config: {} }, applyMiddleware(thunk, logger));

import { styles } from './styles';

/* eslint-disable react/prefer-stateless-function*/
export class App extends Component {
    render() {
        /* eslint-disable react/jsx-boolean-value*/
        return (
            <Provider store={store}>
                <NavigatorIOS
                    style={styles.container}
                    initialRoute={{
                        title: 'Memory',
                        component: Main,
                    }}
                    navigationBarHidden={true}
                />
            </Provider>
        );
        /* eslint-enable react/jsx-boolean-value*/
    }
}
/* eslint-enable react/prefer-stateless-function*/
