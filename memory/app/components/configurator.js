/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React,
    {
        ScrollView,
        View,
        Text,
        TouchableHighlight,
        TextInput,
    }
    from 'react-native';

import { connect } from 'react-redux';

import {
    updateConfigAction,
    saveStorageAction,
    savePasswordAction,
} from '../actions/config.actions';

import { ConfiguratorImage } from './configurator.image';
import { BrowseImage } from './browseImage';
import { ChangePasswordComponent } from './changePasswordComponent';
import { getImages, Question } from '../data/data';

import { styles } from '../styles';

const imageitem = 'image';

class Configurator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            question: Question,
            tiles: 0,
            images: getImages(30),
            activeImages: [],
            differentAmount: false,
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ChangePasswordComponent
                    modalVisible={this.state.modal}
                    oldPassword={this.props.config.password}
                    onSave={this.onPasswordSave.bind(this)}
                />
                <TouchableHighlight
                    style={styles.navSmallButton}
                    onPress={this.changePassword.bind(this)}
                    underlayColor="white"
                >
                    <Text style={styles.navSmallButtonText}> Change password </Text>
                </TouchableHighlight>
                <View
                    style={styles.rowContainer}
                >
                    <Text style={styles.text}>Verborgen afbeelding:</Text>
                </View>
                <View style={styles.wrappedList}>
                    <BrowseImage
                        width={150}
                        image={this.state.question}
                        onClick={this.onQuestionImageClick.bind(this)}
                    />
                </View>
                <View
                    style={styles.rowContainer}
                >
                    <Text style={styles.text}>Aantal tegels:</Text>
                </View>
                <View
                    style={styles.rowContainer}
                >
                    <TextInput
                        keyboardType={'numeric'}
                        style={styles.input}
                        value={this.state.tiles.toString()}
                        onChange={this.handleOnTileChange.bind(this)}
                    />
                </View>
                <Text />
                <View style={styles.wrappedList}>
                    {this.showImages()}
                </View>
                {this._differentAmount()}
                <Text />
                <View
                    style={styles.rowContainer}
                >
                    <TouchableHighlight
                        style={styles.navSmallButton}
                        onPress={this.saveToState.bind(this)}
                        underlayColor="white"
                    >
                        <Text style={styles.navSmallButtonText}> Save setup </Text>
                    </TouchableHighlight>
                    <Text style={styles.navSpace} />
                    <TouchableHighlight
                        style={styles.navSmallButton}
                        onPress={this.cancelState.bind(this)}
                        underlayColor="white"
                    >
                        <Text style={styles.navSmallButtonText}> Cancel Setup </Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }

    changePassword() {
        this.setState({
            modal: true,
        });
    }

    onPasswordSave(newPassword) {
        if (newPassword !== 'undefined') {
            this.props.updatePassword(newPassword);
            this.props.saveStorage();
        }
        this.setState({
            modal: false,
        });
    }

    _differentAmount() {
        if (this.state.differentAmount) {
            return (
                <Text style={styles.wrongAmountText}>
                    Het aantal afbeeldingen komt niet overeen met het aantal tegels.
                </Text>
            );
        }
        return (<View />);
    }
    onQuestionImageClick(image) {
        this.setState({
            question: image,
        });
    }
    cancelState() {
        this.props.navigator.pop();
    }
    saveToState() {
        const imagesAndPrices = [];
        if (this.state.activeImages.length !== this.getTileToImageCount()) {
            this.setState({
                differentAmount: true,
            });
            return;
        }
        this.setState({
            differentAmount: false,
        });
        for (let i = 0; i < this.getTileToImageCount(); i++) {
            const ob = {
                image: this.state.activeImages[i],
                done: false,
            };
            imagesAndPrices.push(ob);
        }
        this.props.updateConfig(
            this.state.question,
            this.state.tiles,
            imagesAndPrices);
        this.props.saveStorage();

        this.props.navigator.pop();
    }

    handleOnTileChange(event) {
        this.setState({
            tiles: parseInt(event.nativeEvent.text === '' ? 0 : event.nativeEvent.text, 10),
        });
        // Check if value not bigger then the amount of max images
        if (this.state.tiles % 2 > 0) {
            this.setState({
                tiles: this.state.tiles - 1,
            });
        }
        if (this.state.tiles > this.state.images.length * 2) {
            this.setState({
                tiles: this.state.images.length * 2,
            });
        }
        this.updateTiles();
    }
    showImages() {
        /* eslint-disable arrow-body-style*/
        const list = this.state.images.map((item, index) => {
        /* eslint-enable arrow-body-style*/
            return (
                <View key={index}>
                    <ConfiguratorImage
                        item={item}
                        index={index}
                        onClick={this.addImageToState.bind(this, item, index)}
                        ref={imageitem + index}
                    />
                </View>
            );
        });
        return list;
    }
    updateTiles() {
        this.setTiles();
    }
    getTileToImageCount() {
        return this.state.tiles / 2;
    }
    setTiles() {
        const amount = this.getTileToImageCount();
        const toActiveState = [];
        for (let i = 0; i < this.state.images.length; i++) {
            this.refs[imageitem + i].setActiveState(false);
        }
        for (let i = 0; i < amount; i++) {
            this.refs[imageitem + i].setActiveState(true);
            toActiveState.push(this.state.images[i]);
        }

        this.setState({
            activeImages: toActiveState,
        });
    }

    addImageToState(item, index, add) {
        const images = [];
        images.push(...this.state.activeImages);

        const amount = this.getTileToImageCount();

        if (this.state.activeImages.length >= amount && add) {
            this.refs[imageitem + index].setActiveState(false);
        } else if (add) {
            this.refs[imageitem + index].setActiveState(true);
            images.push(item);
        } else {
            this.refs[imageitem + index].setActiveState(false);
            const i = images.indexOf(item);
            if (i > -1) {
                images.splice(i, 1);
            }
        }

        this.setState({
            activeImages: images,
        });
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
        updateConfig: (question, tiles, imagesAndPrices) => {
            dispatch(updateConfigAction(question, tiles, imagesAndPrices));
        },
        saveStorage: () => {
            dispatch(saveStorageAction());
        },
        updatePassword: (newPassword) => {
            dispatch(savePasswordAction(newPassword));
        },
    };
};
/* eslint-enable no-unused-vars, arrow-body-style*/

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Configurator);
