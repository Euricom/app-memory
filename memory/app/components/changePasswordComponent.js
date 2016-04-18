/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React, {
    View,
    Text,
    Modal,
    TouchableHighlight,
    TextInput,
} from 'react-native';

import { styles } from '../styles';

export class ChangePasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animated: true,
            transparent: true,
            originalPassword: '',
            newPassword: '',
            newPasswordAgain: '',
            hasError: false,
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
        /* eslint-disable */
        return (
            <Modal
                animated={this.state.animated}
                transparent={this.state.transparent}
                visible={this.props.modalVisible}
            >
                <View style={[styles.modalContainer, modalBackgroundStyle]}>
                    <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                    <View>
                        <Text style={styles.modalText}>Change the password</Text>
                        <Text style={styles.modalText}>Original password</Text>
                        <TextInput
                            keyboardType = 'numeric'
                            ref="InputField"
                            secureTextEntry={true}
                            style={styles.modalInput}
                            value={this.state.originalPassword}
                            onChange={this.handleInputOriginalPassword.bind(this)}
                        />
                        <Text />
                        <Text style={styles.modalText}>New password</Text>
                        <TextInput
                            keyboardType = 'numeric'
                            ref="InputField"
                            secureTextEntry={true}
                            style={styles.modalInput}
                            value={this.state.newPassword}
                            onChange={this.handleInputNewPassword.bind(this)}
                        />
                        <Text />
                        <Text style={styles.modalText}>New password 2</Text>
                        <TextInput
                            keyboardType = 'numeric'
                            ref="InputField"
                            secureTextEntry={true}
                            style={styles.modalInput}
                            value={this.state.newPasswordAgain}
                            onChange={this.handleInputNewPasswordAgain.bind(this)}
                        />
                        <Text />
                        <TouchableHighlight
                          onPress={this.save.bind(this)}
                          style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>Save</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                          onPress={this.close.bind(this)}
                          style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>Sluiten</Text>
                        </TouchableHighlight>
                        {this.showError()}
                    </View>
                    </View>
                </View>
            </Modal>
      );
    }

    showError() {
        if (this.state.hasError) {
            return (
                <Text style={styles.wrongAmountText}>Passwords do not match!</Text>
            );
        } else {
            return ( <View />);
        }
    }
    /* eslint-enable */

    save() {
        if (this.props.oldPassword === this.state.originalPassword
            && this.state.newPassword === this.state.newPasswordAgain) {
            if (this.state.newPassword === undefined || this.state.newPassword === '') {
                this.setState({
                    hasError: 'New passwords are empty!',
                    originalPassword: '',
                    newPassword: '',
                    newPasswordAgain: '',
                });
            } else {
                this.props.onSave(true, this.state.newPassword);
            }
        } else {
            this.setState({
                hasError: 'Passwords do not match!',
                originalPassword: '',
                newPassword: '',
                newPasswordAgain: '',
            });
        }
    }

    close() {
        this.props.onSave(false);
    }

    handleInputOriginalPassword(event) {
        this.setState({
            originalPassword: event.nativeEvent.text,
        });
    }
    handleInputNewPassword(event) {
        this.setState({
            newPassword: event.nativeEvent.text,
        });
    }
    handleInputNewPasswordAgain(event) {
        this.setState({
            newPasswordAgain: event.nativeEvent.text,
        });
    }
}

ChangePasswordComponent.propTypes = {
    onSave: React.PropTypes.func.isRequired,
    modalVisible: React.PropTypes.bool.isRequired,
    oldPassword: React.PropTypes.string.isRequired,
};
