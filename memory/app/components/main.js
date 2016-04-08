import React,
    {
        View,
        Text,
        Image,
        StyleSheet,
        TouchableHighlight,
    }
    from 'react-native';
import { Logo } from '../data/data';
import { Game } from './game';
import { Configurator } from './configurator';
import { Authenticator } from './authenticator';

const styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        borderRadius: 65,
        marginTop: 65,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 65,
        marginTop: 65,
        height: 65,
        backgroundColor: 'green',
    },
    buttonText: {
        padding: 10,
        fontSize: 35,
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
    }
})

export class Main extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            modal: false,
            whereTo: ''
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Authenticator
                    modalVisible={this.state.modal}
                    onLogin={this.onLogin.bind(this)} />
                <Image
                    style={styles.image}
                    source={Logo}/>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleCreate.bind(this)}
                    underlayColor='white'>
                    <Text style={styles.buttonText}>New game</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleContinue.bind(this)}
                    underlayColor='white'>
                    <Text style={styles.buttonText}>Continue Memory</Text>
                </TouchableHighlight>
            </View>
        )
    }
    handleCreate(){
        this.setState({
            modal: true,
            whereTo: 'config'
        })
    }
    onLogin(open){
        if(open){
            this.setState ({
                modal: false,
            })
            this.pushTo();
        } else {
            this.setState ({
                modal: false,
                whereTo: ''
            })
        }

    }
    pushTo(){
        switch (this.state.whereTo) {
            case 'config':
                this.props.navigator.push({
                    title: 'Configurator',
                    component: Configurator
                })
                break;
            case 'game':
                this.props.navigator.push({
                    title: 'Memories',
                    component: Game
                })
                break;
        }
        this.setState ({
            whereTo: ''
        })
    }
    handleContinue(){
        this.setState({
            modal: true,
            whereTo: 'game'
        })
    }
}
