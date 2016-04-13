import React,
    {
        View,
        Image,
        StyleSheet,
        TouchableHighlight,
    }
    from 'react-native';

const styles = StyleSheet.create({
    button:{
        height: 90,
        width: 90,
        flexWrap: 'wrap',
        margin:2,
    },
    activeButton: {
        margin: 2,
        borderRadius: 10,
        height: 90,
        width: 90,
        flexWrap: 'wrap',
        borderColor: 'green',
        borderWidth: 5,
    },
    image: {
        borderRadius: 10,
        height: 90,
        width: 90,
    },
    activeImage: {
        borderRadius: 8,
        height: 80,
        width: 80,
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
