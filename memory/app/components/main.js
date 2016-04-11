import React,
    {
        View,
        Text,
        Image,
        StyleSheet,
        TouchableHighlight,
    }
    from 'react-native';

import { connect } from 'react-redux';

import { Logo } from '../data/data';
import { Authenticator } from './authenticator';
import Configurator from './configurator';
import Game from './game';

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

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            authenticator: false,
            whereTo: '',
            authenticate: {}
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Authenticator
                    modalVisible={this.state.authenticator}
                    modalValues = { this.state.authenticate}
                    onEnter={this.onEnter.bind(this)}/>
                <Image
                    style={styles.image}
                    source={Logo}/>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleCreate.bind(this)}
                    underlayColor='white'>
                    <Text style={styles.buttonText}> New game </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleContinue.bind(this)}
                    underlayColor='white'>
                    <Text style={styles.buttonText}> Continue Memory </Text>
                </TouchableHighlight>
            </View>
        )
    }
    handleCreate(){
        this.setState({
            authenticator: true,
            authenticate: this.getPasswordObject,
            whereTo: 'config'
        })
    }
    onEnter(open){
        if(open){
            this.setState ({
                authenticator: false,
            })
            this.pushTo();
        } else {
            this.setState ({
                authenticator: false,
                authenticate: {},
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
                    title: 'Memories Game',
                    component: Game
                })
                break;
        }
        this.setState ({
            whereTo: '',
            authenticate: {},
        })
    }
    handleContinue(){
        if(this.props.config.imagesAndPrices !== undefined
            && this.props.config.imagesAndPrices.length > 0) {
            this.setState({
                authenticator: true,
                authenticate: this.getPasswordObject,
                whereTo: 'game'
            })
        }
        else {
            this.setState({
                authenticator: true,
                authenticate: this.getPasswordObjectForEmtyConfig,
                whereTo: 'config'
            })
        }
    }

    getPasswordObjectForEmtyConfig = {
        header: 'Er is nog geen setup aanwezig. Geef het wachtwoord om verder te gaan.',
        password: true,
        passwordText: 'Ga verder',
        passwordToCheck: '3uric0m',
        closeText: 'Sluiten',
    }

    getPasswordObject = {
        header: 'Geef het wachtwoord',
        password: true,
        passwordText: 'Ga verder',
        passwordToCheck: '3uric0m',
        closeText: 'Sluiten',
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // sayHello: () => {
        //     dispatch({type: 'getData', payload: 'Hello'})
        // }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
