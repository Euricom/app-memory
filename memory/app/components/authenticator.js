/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React, {
    View,
    StyleSheet,
    Text,
    Modal,
    TouchableHighlight,
    TextInput,
    Image,
} from 'react-native';

import { pw } from '../data/data';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        marginTop: 15,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        width: 350,
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 45,
        marginTop: 15,
        height: 44,
        width: 250,
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'green',
    },
    buttonText: {
        padding: 10,
        fontSize: 35,
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 150,
        height: 50,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 8,
        color: 'black',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        alignSelf: 'center',
    },
    image: {
        height: 200,
        width: 200,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 45,
    },
    wrongImage: {
        margin: 15,
        height: 100,
        width: 100,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 25,
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
});

export class Authenticator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animated: true,
            transparent: true,
            inputValue: '',
        };
    }

    render() {
        const modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        const innerContainerTransparentStyle = this.state.transparent ? {
            backgroundColor: '#fff',
            padding: 20,
        }
        : null;

        return (
            <Modal
                animated={this.state.animated}
                transparent={this.state.transparent}
                visible={this.props.modalVisible}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                        {this.showHeader()}
                        {this.showMiddle()}
                        {this.showImage()}
                        {this.showWrongImages()}
                        {this.showFooter()}
                        <Text />
                        {this.showPassword()}
                        {this.showClose()}
                    </View>
                </View>
            </Modal>
      );
    }
    showWrongImages() {
        if (this.props.modalValues.image1 && this.props.modalValues.image2) {
            return (
                <View style={styles.rowContainer}>
                    <Text />
                    <Image
                        style={styles.wrongImage}
                        source={this.props.modalValues.image1}
                    />
                    <Image
                        style={styles.wrongImage}
                        source={this.props.modalValues.image2}
                    />
                    <Text />
                </View>
            );
        }
        return (<View />);
    }
    showImage() {
        if (this.props.modalValues.image) {
            return (
                <View>
                    <Text />
                    <Image
                        style={styles.image}
                        source={this.props.modalValues.image}
                    />
                    <Text />
                </View>
            );
        }
        return (<View />);
    }
    showHeader() {
        if (this.props.modalValues.header) {
            return (
                <Text>{this.props.modalValues.header}</Text>
            );
        }
        return (<View />);
    }
    showMiddle() {
        if (this.props.modalValues.middleText) {
            return (
                <Text>{this.props.modalValues.middleText}</Text>
            );
        }
        return (<View />);
    }
    showFooter() {
        if (this.props.modalValues.footer) {
            return (
                <Text>{this.props.modalValues.footer}</Text>
            );
        }
        return (<View />);
    }
    showClose() {
        console.log(this.props.modalValues);
        if (this.props.modalValues.closeText) {
            return (
                <TouchableHighlight
                  onPress={this.close.bind(this)}
                  style={styles.button}
                >
                    <Text style={styles.buttonText}>{this.props.modalValues.closeText}</Text>
                </TouchableHighlight>
            );
        }
        return (<View />);
    }
    /* eslint-disable */
    showPassword() {
        if (this.props.modalValues.password) {
            return (
                <View>
                    <TextInput
                        keyboardType = 'numeric'
                        ref="InputField"
                        secureTextEntry={true}
                        style={styles.input}
                        value={this.state.textValue}
                        onChange={this.handleInput.bind(this)}
                    />
                </View>
            );
        }
        return (<View />);
    }
    /* eslint-enable */
    close() {
        this.setState({
            password: '',
        });
        this.props.onEnter(false);
    }
    checkPassword() {
        if (pw === this.state.inputValue) {
            this.setState({
                inputValue: '',
            });
            this.props.onEnter(true);
        }
    }
    handleInput(event) {
        this.setState({
            inputValue: event.nativeEvent.text,
        });
        this.checkPassword();
    }
}

Authenticator.propTypes = {
    onEnter: React.PropTypes.func.isRequired,
    modalVisible: React.PropTypes.bool.isRequired,
    modalValues: React.PropTypes.object.isRequired,
};
