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
        width: 250,
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
        width: 150,
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
    render(){

    }
    constructor(props) {
        super(props);
        this.state = {
            animated: true,
            transparent: true,
            password: '',
            truePassword: '3uric0m',
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
                <Text>Master Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={this.state.password}
                    onChange={this.handlePasswordChange.bind(this)}/>
                <TouchableHighlight
                  onPress={this.checkPassword.bind(this)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this.close.bind(this)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
      );
    }
    close(){
        this.setState({
            password: ''
        })
        this.props.onLogin(false);
    }
    checkPassword(){
        if(this.state.password === this.state.truePassword){
            this.setState({
                password: ''
            })
            this.props.onLogin(true);
        }
    }
    handlePasswordChange(event){
        this.setState({
            password: event.nativeEvent.text
        })
    }
}

Authenticator.propTypes = {
    onLogin: React.PropTypes.func.isRequired,
    modalVisible: React.PropTypes.bool.isRequired
}
