/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React, {
        View,
        Text,
        Image,
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

import { styles } from '../styles';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticator: true,
            whereTo: '',
            authenticate: this._getPasswordObject(),
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
                    modalValues={ this.state.authenticate}
                    onEnter={this._onEnter.bind(this)}
                />
                <Image
                    style={styles.mainImage}
                    source={Logo}
                />
                <TouchableHighlight
                    style={styles.navButton}
                    onPress={this._handleToSetup.bind(this)}
                    underlayColor="white"
                >
                    <Text style={styles.navButtonText}> Configuratie </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.navButton}
                    onPress={this._handleToGame.bind(this)}
                    underlayColor="white"
                >
                    <Text style={styles.navButtonText}> Nieuw spel </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.navButton}
                    onPress={this._handleToExistingGame.bind(this)}
                    underlayColor="white"
                >
                    <Text style={styles.navButtonText}> Verder spelen </Text>
                </TouchableHighlight>
            </View>
        );
    }

    _onEnter(open) {
        if (this.props.config.winner !== {} && this.props.config.winner !== undefined) {
            this.props.updateWinner({});
            this.props.saveStorage();
        }
        if (open) {
            this.setState({
                authenticator: false,
            });
            this._pushTo();
        } else {
            this.setState({
                authenticator: false,
                authenticate: {},
                whereTo: '',
            });
        }
    }

    _getPasswordObject() {
        return {
            header: 'Geef het wachtwoord',
            password: true,
        };
    }

    _handleToSetup() {
        this.setState({
            // authenticator: true,
            // authenticate: this.getPasswordObjectForSetup,
            whereTo: 'config',
        });
        this._pushTo();
    }


    _pushTo() {
        switch (this.state.whereTo) {
        case 'config':
            this.props.navigator.push({
                title: 'Configurator',
                component: Configurator,
            });
            break;
        case 'newGame':
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
    _reShuffleValues(reset) {
        const list = [...this.props.config.imagesAndPrices];
        if (reset) {
            for (let i = 0; i < list.length; i++) {
                list[i].done = false;
            }
        }

        const shuffled = getImagesShuffledAndDoubled(list);
        // save the values in the store
        this.props.reShuffle(list, shuffled);
        // save the the new store inside the storage
        this.props.saveStorage();
    }

    _handleToExistingGame() {
        if (this.props.config.winner !== null
            && this.props.config.winner !== undefined
            && this.props.config.winner.image !== undefined) {
            this.setState({
                authenticator: true,
                authenticate: this._getPasswordObject(this.props.config.winner),
            });
        } else if (this.props.config.shuffledImages !== undefined
            && this.props.config.shuffledImages !== null
            && this.props.config.shuffledImages.length > 0) {
            this.setState({
                whereTo: 'existingGame',
            });
            this._pushTo();
        } else {
            if (this.props.config.imagesAndPrices !== undefined
                && this.props.config.imagesAndPrices !== null
                && this.props.config.imagesAndPrices.length > 0) {
                this._reShuffleValues(false);
                this.setState({
                    whereTo: 'existingGame',
                });
                this._pushTo();
            } else {
                this.setState({
                    whereTo: 'config',
                });
                this._pushTo();
            }
        }
    }

    _handleToGame() {
        if (this.props.config.winner !== null
            && this.props.config.winner !== undefined
            && this.props.config.winner.image !== undefined) {
            this.setState({
                authenticator: true,
                authenticate: this._getPasswordObject(this.props.config.winner),
            });
        } else if (this.props.config.imagesAndPrices !== undefined
            && this.props.config.imagesAndPrices !== null
            && this.props.config.imagesAndPrices.length > 0) {
            this._reShuffleValues(true);
            this.setState({
                whereTo: 'newGame',
            });
            this._pushTo();
        } else {
            this.setState({
                whereTo: 'config',
            });
            this._pushTo();
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
