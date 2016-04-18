/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React, {
    View,
    Text,
    Modal,
    TouchableHighlight,
    TextInput,
    Image,
} from 'react-native';

import { styles } from '../styles';

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
                <View style={[styles.modalContainer, modalBackgroundStyle]}>
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
                        style={styles.correctImage}
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
                <Text style={styles.modalText}>{this.props.modalValues.header}</Text>
            );
        }
        return (<View />);
    }
    showMiddle() {
        if (this.props.modalValues.middleText) {
            return (
                <Text style={styles.modalText}>{this.props.modalValues.middleText}</Text>
            );
        }
        return (<View />);
    }
    showFooter() {
        if (this.props.modalValues.footer) {
            return (
                <Text style={styles.modalText}>{this.props.modalValues.footer}</Text>
            );
        }
        return (<View />);
    }
    showClose() {
        if (this.props.modalValues.closeText) {
            return (
                <TouchableHighlight
                  onPress={this.close.bind(this)}
                  style={styles.modalButton}
                >
                    <Text style={styles.modalButtonText}>{this.props.modalValues.closeText}</Text>
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
                        style={styles.modalInput}
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
        this.props.onEnter(this.props.modalValues.password, '');
    }
    handleInput(event) {
        this.setState({
            inputValue: event.nativeEvent.text,
        });
        this.props.onEnter(this.props.modalValues.password, this.state.inputValue);
    }
}

Authenticator.propTypes = {
    onEnter: React.PropTypes.func.isRequired,
    modalVisible: React.PropTypes.bool.isRequired,
    modalValues: React.PropTypes.object.isRequired,
};
