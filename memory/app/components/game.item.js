import React,
    {
        View,
        Image,
        StyleSheet,
        TouchableHighlight,
    }
    from 'react-native';
import { Question } from '../data/data';

export class GameItem extends React.Component{
    constructor(props){
        super(props);

        this.state={
            active: this.props.isDone,
            done: this.props.isDone,
        }
    }

    render(){
        return (
            <TouchableHighlight
                onPress={this.handleClick.bind(this)}
                style={this.getButtonStyle()}
                underlayColor="white">
                <Image
                    style={this.getImageButtonStyle()}
                    source={this.getImageOnState()}
                    resizeMode='stretch'/>
            </TouchableHighlight>
        )
    }
    getButtonStyle(){
        return {
            margin: 5,
            borderRadius: 10,
            height: this.props.width,
            width: this.props.width,
        }
    }
    getImageButtonStyle(){
        return {
            height: this.props.width - 5,
            width: this.props.width - 5,
            padding: 5,
        }
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
        //check if own component is already clicked ( should halt possible doubleclicks)
        if(this.state.active){
            return;
        }

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
    width: React.PropTypes.number.isRequired,
    isDone: React.PropTypes.bool.isRequired,
}
