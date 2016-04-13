/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React, {
        View,
        Text,
        Image,
        StyleSheet,
        TouchableHighlight,
    }
    from 'react-native';

import { connect } from 'react-redux';

import { Logo, getImagesShuffledAndDoubled } from '../data/data';
import { Authenticator } from './authenticator';
import Configurator from './configurator';
import Game from './game';

import {
    uploadStorageAction,
    updateConfigWinnerAction,
    saveStorageAction,
    saveNewShuffledImagesAction,
} from '../actions/config.actions';

const styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        borderRadius: 65,
        marginTop: 15,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 406,
        width: 224,
    },
    button: {
        borderRadius: 65,
        marginTop: 15,
        height: 65,
        width: 450,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        padding: 10,
        fontSize: 35,
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
    },
});

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticator: true,
            whereTo: '',
            authenticate: this.getPasswordObject(),
        };
    }
    componentDidMount() {
        /* eslint-disable react/prop-types */
        this.props.uploadStorage();
        /* eslint-enable react/prop-types */
    }

    render() {
        return (
            <View style={styles.container}>
                <Authenticator
                    modalVisible={this.state.authenticator}
                    modalValues = { this.state.authenticate}
                    onEnter={this.onEnter.bind(this)}
                />
                <Image
                    style={styles.image}
                    source={Logo}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleToSetup.bind(this)}
                    underlayColor="white"
                >
                    <Text style={styles.buttonText}> Configuratie </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleToGame.bind(this)}
                    underlayColor="white"
                >
                    <Text style={styles.buttonText}> Nieuw spel </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleToExistingGame.bind(this)}
                    underlayColor="white"
                >
                    <Text style={styles.buttonText}> Verder spelen </Text>
                </TouchableHighlight>
            </View>
        );
    }

    onEnter(open) {
        if (this.props.config.winner !== {} && this.props.config.winner !== undefined) {
            this.props.updateWinner({});
            this.props.saveStorage();
        }
        if (open) {
            this.setState({
                authenticator: false,
            });
            this.pushTo();
        } else {
            this.setState({
                authenticator: false,
                authenticate: {},
                whereTo: '',
            });
        }
    }

    getPasswordObject() {
        return {
            header: 'Geef het wachtwoord',
            password: true,
        };
    }

    handleToSetup() {
        this.setState({
            // authenticator: true,
            // authenticate: this.getPasswordObjectForSetup,
            whereTo: 'config',
        });
        this.pushTo();
    }


    pushTo() {
        switch (this.state.whereTo) {
        case 'config':
            this.props.navigator.push({
                title: 'Configurator',
                component: Configurator,
            });
            break;
        case 'newGame':
            this.reShuffleValues();

            this.props.navigator.push({
                title: 'Memories Game',
                component: Game,
                passProps: { images: this.props.config.shuffledImages },
            });
            break;
        case 'existingGame':
            this.props.navigator.push({
                title: 'Memories Game',
                component: Game,
                passProps: { images: this.props.config.shuffledImages },
            });
            break;
        default:
            break;
        }
        this.setState({
            whereTo: '',
        });
    }
    reShuffleValues() {
        const list = [...this.props.config.imagesAndPrices];
        for (let i = 0; i < list.length; i++) {
            list[i].done = false;
        }

        const shuffled = getImagesShuffledAndDoubled(list);
        // save the values in the store
        this.props.reShuffle(list, shuffled);
        // save the the new store inside the storage
        this.props.saveStorage();
    }
    handleToExistingGame() {
        if (this.props.config.winner !== null
            && this.props.config.winner !== undefined
            && this.props.config.winner.image !== undefined) {
            this.setState({
                authenticator: true,
                authenticate: this.getPasswordObject(this.props.config.winner),
            });
        } else if (this.props.config.imagesAndPrices !== undefined
            && this.props.config.imagesAndPrices !== null
            && this.props.config.imagesAndPrices.length > 0) {
            this.setState({
                whereTo: 'existingGame',
            });
            this.pushTo();
        } else {
            this.setState({
                authenticator: true,
                authenticate: this.getPasswordObjectForEmptyConfig,
                whereTo: 'config',
            });
        }
    }

    handleToGame() {
        if (this.props.config.winner !== null
            && this.props.config.winner !== undefined
            && this.props.config.winner.image !== undefined) {
            this.setState({
                authenticator: true,
                authenticate: this.getPasswordObject(this.props.config.winner),
            });
        } else if (this.props.config.imagesAndPrices !== undefined
            && this.props.config.imagesAndPrices !== null
            && this.props.config.imagesAndPrices.length > 0) {
            this.setState({
                whereTo: 'newGame',
            });
            this.pushTo();
        } else {
            this.setState({
                whereTo: 'config',
            });
            this.pushTo();
        }
    }
}
/* eslint-disable no-unused-vars, arrow-body-style*/
const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        uploadStorage: () => {
            dispatch(uploadStorageAction());
        },
        updateWinner: (winner) => {
            dispatch(updateConfigWinnerAction(winner));
        },
        saveStorage: () => {
            dispatch(saveStorageAction());
        },
        reShuffle: (images, shuffledImages) => {
            dispatch(saveNewShuffledImagesAction(images, shuffledImages));
        },
    };
};
/* eslint-enable no-unused-vars, arrow-body-style*/
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
