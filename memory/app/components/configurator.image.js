import React,
    {
        View,
        Image,
        StyleSheet,
        TouchableHighlight,
    }
    from 'react-native';
import question from '../data/question.jpg';

const styles = StyleSheet.create({
    button:{
        height: 75,
        width: 75,
        flexWrap: 'wrap',
        margin:2,
    },
    activeButton: {
        margin: 2,
        borderRadius: 10,
        height: 75,
        width: 75,
        flexWrap: 'wrap',
        borderColor: 'green',
        borderWidth: 5,
    },
    image: {
        borderRadius: 10,
        height: 75,
        width: 75,
    },
    activeImage: {
        borderRadius: 8,
        height: 65,
        width: 65,
    }
})

export class ConfiguratorImage extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return (
            <View>
                <TouchableHighlight
                    onPress={this.handleClick.bind(this)}
                    style={this.getButtonStyle()}
                    underlayColor="white">
                    <Image
                        style={this.getImageStyle()}
                        source={this.props.item.image}
                        resizeMode='stretch'/>
                </TouchableHighlight>
            </View>
        )
    }
    getImageStyle(){
        if(this.state.active){
            return styles.activeImage;
        }
        return styles.image;
    }
    getButtonStyle(){
        if(this.state.active){
            return styles.activeButton;
        }
        return styles.button;
    }
    handleClick(){
        this.props.onClick(!this.state.active);
    }
    setActiveState(value){
        this.setState({
            active: value
        })
    }
}

ConfiguratorImage.propTypes = {
    item: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
}
