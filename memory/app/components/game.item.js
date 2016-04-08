import React,
    {
        View,
        Image,
        StyleSheet,
        TouchableHighlight,
    }
    from 'react-native';
import { Question } from '../data/data';


const styles = StyleSheet.create({
    button:{
        borderRadius: 10,
        height: 150,
        width: 150,
        flexWrap: 'wrap'
    },
    image: {
        height: 145,
        width: 145,
        padding: 5,
    }
})

export class GameItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            active: false,
            done: false
        }
    }
    render(){
        return (
            <TouchableHighlight
                onPress={this.handleClick.bind(this)}
                style={styles.button}
                underlayColor="white">
                <Image
                    style={styles.image}
                    source={this.getImageOnState()}
                    resizeMode='stretch'/>
            </TouchableHighlight>
        )
    }
    setDone(){
        this.setState({
            done: true
        })
    }
    setUnactive(){
        this.setState({
            active: false
        })
    }
    handleClick(){
        this.setState({
            active: true
        })
        if(!this.state.done){
            this.props.onClick();
        }
    }
    getImageOnState(){
        if(this.state.active){
            return this.props.link;
        } else {
            return Question;
        }
    }
}

GameItem.propTypes = {
    reference: React.PropTypes.string.isRequired,
    link: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
}
