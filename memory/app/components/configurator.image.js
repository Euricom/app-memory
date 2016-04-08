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
        height: 47,
        width: 47,
        flexWrap: 'wrap',
        margin:2,
    },
    activeButton: {
        margin: 2,
        borderRadius: 10,
        height: 47,
        width: 47,
        flexWrap: 'wrap',
        borderColor: 'green',
        borderWidth: 2,
    },
    image: {
        borderRadius: 10,
        height: 47,
        width: 47,
    },
    activeImage: {
        borderRadius: 8,
        height: 43,
        width: 43,
    }
})

export class ConfiguratorImage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            active: false,
        }
    }
    render(){
        return (
            <TouchableHighlight
                onPress={this.handleClick.bind(this)}
                style={this.getButtonStyle()}
                underlayColor="white">
                <Image
                    style={this.getImageStyle()}
                    source={this.props.item.image}
                    resizeMode='stretch'/>
            </TouchableHighlight>
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
        this.setState({
            active: !this.state.active
        })
        this.props.onClick(this.state.active);
    }
}

ConfiguratorImage.propTypes = {
    item: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
}
