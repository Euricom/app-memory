import React,
    {
        View,
        StyleSheet,
        Text,
        Modal,
        TouchableHighlight,
        TextInput
    }
    from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center'
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
        backgroundColor: 'green'
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
});

export class Authenticator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            animated: true,
            transparent: true,
            inputValue: '',
        };
    }

    render() {
      var modalBackgroundStyle = {
        backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
      };
      var innerContainerTransparentStyle = this.state.transparent
        ? {backgroundColor: '#fff', padding: 20}
        : null;

      return (
          <Modal
            animated={this.state.animated}
            transparent={this.state.transparent}
            visible={this.props.modalVisible}>
            <View style={[styles.container, modalBackgroundStyle]}>
              <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                <Text>{this.props.modalValues.header}</Text>
                {this.hasPassword()}

                <TouchableHighlight
                  onPress={this.close.bind(this)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>{this.props.modalValues.closeText}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
      );
    }
    hasPassword(){
        if(this.props.modalValues.password){
            return (
                <View>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        value={this.state.textValue}
                        onChange={this.handleInput.bind(this)}/>
                    <TouchableHighlight
                      onPress={this.checkPassword.bind(this)}
                      style={styles.button}>
                      <Text style={styles.buttonText}>{this.props.modalValues.passwordText}</Text>
                    </TouchableHighlight>
                </View>
            )
        } else {
            return ( <View />)
        }
    }
    close(){
        this.setState({
            password: ''
        })
        this.props.onEnter(false);
    }
    checkPassword(){
        if(this.props.modalValues.passwordToCheck === this.state.inputValue){
            this.setState({
                inputValue: ''
            })
            this.props.onEnter(true);
        }
    }
    handleInput(event){
        this.setState({
            inputValue: event.nativeEvent.text
        })
    }
}

Authenticator.propTypes = {
    onEnter: React.PropTypes.func.isRequired,
    modalVisible: React.PropTypes.bool.isRequired,
    modalValues: React.PropTypes.object.isRequired,
}
