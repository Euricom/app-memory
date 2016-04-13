/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React,
    {
        View,
        StyleSheet,
    }
    from 'react-native';

import { connect } from 'react-redux';

import
    {
        updateConfigImageAction,
        saveStorageAction,
        updateConfigWinnerAction,
        saveShuffledImagesAction,
    }
    from '../actions/config.actions';


import { Authenticator } from './authenticator';
import { GameItem } from './game.item';

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flex: 1,
    },
    button: {
        borderRadius: 65,
        marginTop: 15,
        height: 35,
        width: 150,
        backgroundColor: 'green',
        justifyContent: 'center',
    },
    buttonText: {
        padding: 5,
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
    },
});

class Game extends React.Component {
    constructor(props) {
        super(props);

        const p = this.calculateWidthAndMargin();
        this.state = {
            modal: false,
            authenticate: {},
            references: [],
            images: this.props.images,
            imageWidth: p.imageWidth,
            listMargin: p.listMargin,
            imageMargin: p.margin,
            back: false,
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Authenticator
                    modalVisible={this.state.modal}
                    modalValues={this.state.authenticate}
                    onEnter={this.onEnter.bind(this)}
                />
                <View style={this.calculateStyle()}>
                    {this.renderImages()}
                </View>
            </View>
        );
    }
    handleBack() {
        this.setState({
            modal: true,
            authenticate: this.getPasswordObjectForBack,
            back: true,
        });
    }
    onEnter(ret) {
        // turn the shown cards if their timer isn't completed yet
        this.turnCards();
        if (this.props.config.winner !== {} && this.props.config.winner !== undefined) {
            this.props.updateWinner({});
            this.props.saveStorage();
        }
        if (this.state.back) {
            this.setState({
                back: false,
            });
            if (ret) {
                this.props.navigator.pop();
            }
        }
        this.setState({
            modal: false,
        });
    }
    turnCards() {
        for (let i = 0; i < this.state.references.length; i++) {
            const index = this.state.references[i].index;
            this.refs[`item${index}`].setUnactive();
        }
        this.setState({
            references: [],
        });
    }
    cardsDone() {
        const storeReference = this.state.references[0].item;

        // update the state images
        this.updateStateImages(storeReference);

        // update the store
        this.updateStoreImages(storeReference);

        // update the AsyncStorage with the new store
        this.props.saveStorage();

        this.setState({
            modal: true,
            authenticate: this.getPasswordObject(storeReference),
        });
        this.setState({
            references: [],
        });
    }
    updateStateImages(reference) {
        const list = [...this.state.images];
        for (let i = 0; i < list.length; i++) {
            if (list[i].image.reference === reference.image.reference) {
                list[i].done = true;
            }
        }
        this.setState({
            images: list,
        });
        this.props.saveShuffledImages(list);
    }

    // Updates the store so their images are updated correctly
    updateStoreImages(reference) {
        const imagesAndPrices = [...this.props.config.imagesAndPrices];
        const indexOf = imagesAndPrices.indexOf(reference);

        const ref = imagesAndPrices.splice(indexOf, 1);
        ref[0].done = true;

        imagesAndPrices.splice(indexOf, 0, ref[0]);

        // update the store
        this.props.updateImages(imagesAndPrices);

        // update the store winner
        this.props.updateWinner(reference);
    }

    checkMemory() {
        if (this.state.references.length === 2) {
            const ref1 = this.state.references[0];
            const ref2 = this.state.references[1];
            if (ref1.item.image.reference === ref2.item.image.reference) {
                this.cardsDone();
            } else {
                this.setState({
                    modal: true,
                    authenticate: this.getPasswordObjectIncorrect(),
                });
            }
        }
    }
    handleGameItemClick(item, index) {
        const newReferences = [];
        newReferences.push(...this.state.references);
        newReferences.push({ item, index });

        this.setState({
            references: newReferences,
        });
        this.checkMemory();
    }
    calculateStyle() {
        return {
            margin: this.state.listMargin,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
        };
    }
    calculateWidthAndMargin() {
        if (this.props.config.tiles <= 12) {
            return {
                imageWidth: 200,
                listMargin: 25,
                margin: 5,
            };
        } else if (this.props.config.tiles <= 24) {
            return {
                imageWidth: 150,
                listMargin: 15,
                margin: 5,
            };
        } else if (this.props.config.tiles <= 30) {
            return {
                imageWidth: 130,
                listMargin: 5,
                margin: 5,
            };
        } else if (this.props.config.tiles <= 42) {
            return {
                imageWidth: 110,
                listMargin: 50,
                margin: 3,
            };
        } else if (this.props.config.tiles <= 54) {
            return {
                imageWidth: 100,
                listMargin: 5,
                margin: 2,
            };
        }
        return {
            imageWidth: 90,
            listMargin: 5,
            margin: 2,
        };
    }
    renderImages() {
        const list = this.state.images.map((item, index) => {
            const binder = this.handleGameItemClick.bind(this, item, index);
            return (
                <View key={index}>
                    <GameItem
                        width={this.state.imageWidth}
                        reference={item.image.reference}
                        link={item.image.image}
                        isDone={item.done}
                        onClick={binder}
                        margin={this.state.imageMargin}
                        ref={`item${index}`}
                    />
                </View>
            );
        });
        return list;
    }


    getPasswordObjectIncorrect() {
        return {
            header: 'Jammer, u heeft geen prijs gewonnen.',
            footer: 'Toon dit scherm aan een Euricom medewerker.',
            password: true,
            passwordText: 'Unlock',
        };
    }
    getPasswordObject(item) {
        return {
            header: 'Gefeliciteerd, U heeft gewonnen!!!',
            // middleText: `Prijs: ${item.price.price}`,
            footer: 'Toon dit scherm aan een Euricom medewerker',
            image: item.image.image,
            password: true,
        };
    }

    getPasswordObjectForBack() {
        return {
            header: 'Geef het wachtwoord',
            password: true,
            closeText: 'Sluiten',
        };
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
        updateImages: (images) => {
            dispatch(updateConfigImageAction(images));
        },
        updateWinner: (winner) => {
            dispatch(updateConfigWinnerAction(winner));
        },
        saveStorage: () => {
            dispatch(saveStorageAction());
        },
        saveShuffledImages: (images) => {
            dispatch(saveShuffledImagesAction(images));
        },
    };
};
/* eslint-enable no-unused-vars, arrow-body-style*/
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
