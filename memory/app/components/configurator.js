/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React,
    {
        ScrollView,
        View,
        Text,
        StyleSheet,
        TouchableHighlight,
        TextInput,
    }
    from 'react-native';

import { connect } from 'react-redux';

import {
    updateConfigAction,
    saveStorageAction,
} from '../actions/config.actions';

import { ConfiguratorImage } from './configurator.image';
import { BrowseImage } from './browseImage';
import { getImages, Question } from '../data/data';

const imageitem = 'image';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
    },
    question: {
        flexDirection: 'row',
        height: 35,
        width: 35,
    },
    text: {
        padding: 10,
        fontSize: 18,
    },
    button: {
        borderRadius: 65,
        height: 44,
        backgroundColor: 'green',
        width: 250,
    },
    buttonText: {
        padding: 10,
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 55,
        width: 55,
    },
    list: {
        margin: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    input: {
        width: 250,
        height: 50,
        padding: 4,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 8,
        color: 'black',
        justifyContent: 'center',
        textAlign: 'center',
    },
});

class Configurator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: Question,
            tiles: 0,
            images: getImages(30),
            activeImages: [],
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View
                    style={styles.rowContainer}
                >
                    <Text style={styles.text}>Verborgen afbeelding:</Text>
                </View>
                <View style={styles.list}>
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
                <View style={styles.list}>
                    {this.showImages()}
                </View>
                <Text />
                <View
                    style={styles.rowContainer}
                >
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.saveToState.bind(this)}
                        underlayColor="white"
                    >
                        <Text style={styles.buttonText}>Save setup</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
    onQuestionImageClick(image) {
        this.setState({
            question: image,
        });
    }
    saveToState() {
        const imagesAndPrices = [];
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
        this.props.saveInStore();

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
        saveInStore: () => {
            dispatch(saveStorageAction());
        },
    };
};
/* eslint-enable no-unused-vars, arrow-body-style*/

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Configurator);
