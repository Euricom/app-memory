import React,
    {
        Component,
        NavigatorIOS,
        StyleSheet,
        View
    }
    from 'react-native';

import { Main } from './components/main'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111'
    }
})

export class App extends Component {
  render() {
    return (
        <NavigatorIOS
            style={styles.container}
            initialRoute={{
            title: 'Memory',
            component: Main,
            }}>
        </NavigatorIOS>
    );
  }
}
