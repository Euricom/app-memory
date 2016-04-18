/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React,
    {
        View,
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

import { styles } from '../styles';

class Game extends React.Component {
    constructor(props) {
        super(props);

        const p = this.calculateStylesOnTileAmount();
        this.state = {
            modal: false,
            authenticate: {},
            references: [],
            images: this.props.images,
            imageWidth: p.imageWidth,
            listMarginRightAndLeft: p.listMargin,
            listMarginTop: p.listMarginTop,
            imageMargin: p.margin,
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Authenticator
                    modalVisible={this.state.modal}
                    modalValues={this.state.authenticate}
                    onEnter={this.onModalEnter.bind(this)}
                />
                <View style={this.calculateListStyle()}>
                    {this.renderImages()}
                </View>
            </View>
        );
    }

    onModalEnter(isPassword, pw) {
        if (pw === this.props.config.password) {
            this.turnGameCards();
            this.emptyReferences();
            this.emptyStoreWinner();
            this.closeModal();
        }
    }

    closeModal() {
        this.setState({
            modal: false,
        });
    }

    emptyStoreWinner() {
        if (this.props.config.winner !== {} && this.props.config.winner !== undefined) {
            this.props.updateWinner({});
            this.props.saveStorage();
        }
    }

    turnGameCards() {
        for (let i = 0; i < this.state.references.length; i++) {
            const index = this.state.references[i].index;
            this.updateCardActiveState(index, false);
        }
    }

    emptyReferences() {
        this.setState({
            references: [],
        });
    }

    openModal(modalValues) {
        this.setState({
            modal: true,
            authenticate: modalValues,
        });
    }

    setCorrectCards() {
        const storeReference = this.state.references[0].item;
        this.updateStateAndStore(storeReference);
        this.emptyReferences();
        this.openModal(this.getPasswordObject(storeReference));
    }

    updateWinner(modalValue) {
        this.props.updateWinner(modalValue);
    }

    updateStateAndStore(storeReference) {
        this.updateStateImages(storeReference);
        this.updateStoreImages(storeReference);
        this.updateWinner(this.getPasswordObject(storeReference));
        this.props.saveStorage();
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

    updateStoreImages(reference) {
        const imagesAndPrices = [...this.props.config.imagesAndPrices];
        const indexOf = imagesAndPrices.indexOf(reference);

        const ref = imagesAndPrices.splice(indexOf, 1);
        ref[0].done = true;

        imagesAndPrices.splice(indexOf, 0, ref[0]);

        this.props.updateImages(imagesAndPrices);
    }

    checkMemory() {
        if (this.state.references.length === 2) {
            const ref1 = this.state.references[0];
            const ref2 = this.state.references[1];

            if (ref1.item.image.reference === ref2.item.image.reference) {
                this.setCorrectCards();
            } else {
                this.updateWinner(this.getPasswordObjectIncorrect(ref1.item, ref2.item));
                this.props.saveStorage();
                this.openModal(this.getPasswordObjectIncorrect(ref1.item, ref2.item));
            }
        }
    }

    handleGameItemClick(item, index) {
        if (this.state.references.length < 2) {
            this.addReference(item, index);
            this.updateCardActiveState(index, true);
            this.checkMemory();
        }
    }

    addReference(item, index) {
        const newReferences = [];
        newReferences.push(...this.state.references);
        newReferences.push({ item, index });
        this.setState({
            references: newReferences,
        });
    }

    updateCardActiveState(index, value) {
        this.refs[`item${index}`].setActiveState(value);
    }

    calculateListStyle() {
        return {
            marginTop: this.state.listMarginTop,
            marginLeft: this.state.listMarginRightAndLeft,
            marginRight: this.state.listMarginRightAndLeft,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
        };
    }

    calculateStylesOnTileAmount() {
        if (this.props.config.tiles <= 4) {
            return {
                imageWidth: 350,
                listMargin: 25,
                listMarginTop: 15,
                margin: 5,
            };
        } else if (this.props.config.tiles <= 6) {
            return {
                imageWidth: 300,
                listMargin: 25,
                margin: 5,
            };
        } else if (this.props.config.tiles <= 8) {
            return {
                imageWidth: 235,
                listMargin: 25,
                listMarginTop: 15,
                margin: 5,
            };
        } else if (this.props.config.tiles <= 12) {
            return {
                imageWidth: 200,
                listMargin: 25,
                listMarginTop: 15,
                margin: 5,
            };
        } else if (this.props.config.tiles <= 16) {
            return {
                imageWidth: 165,
                listMargin: 50,
                listMarginTop: 15,
                margin: 10,
            };
        } else if (this.props.config.tiles <= 20) {
            return {
                imageWidth: 165,
                listMargin: 25,
                listMarginTop: 15,
                margin: 10,
            };
        } else if (this.props.config.tiles <= 24) {
            return {
                imageWidth: 150,
                listMargin: 15,
                listMarginTop: 70,
                margin: 5,
            };
        } else if (this.props.config.tiles <= 30) {
            return {
                imageWidth: 130,
                listMargin: 5,
                listMarginTop: 15,
                margin: 5,
            };
        } else if (this.props.config.tiles <= 42) {
            return {
                imageWidth: 110,
                listMargin: 50,
                listMarginTop: 15,
                margin: 3,
            };
        } else if (this.props.config.tiles <= 54) {
            return {
                imageWidth: 100,
                listMargin: 5,
                listMarginTop: 15,
                margin: 2,
            };
        }
        return {
            imageWidth: 90,
            listMargin: 5,
            listMarginTop: 15,
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


    getPasswordObjectIncorrect(ref1, ref2) {
        return {
            header: 'Jammer, u heeft geen prijs gewonnen.',
            footer: 'Toon dit scherm aan een Euricom medewerker.',
            password: true,
            image1: ref1.image.image,
            image2: ref2.image.image,
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
