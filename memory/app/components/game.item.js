/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React, {
    Image,
    TouchableHighlight,
} from 'react-native';
import rebound from 'rebound';

import { Question } from '../data/data';

export class GameItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: this.props.isDone,
            done: this.props.isDone,
            scale: 1,
        };
    }
    componentWillMount() {
        this.springSystem = new rebound.SpringSystem();
        this._scrollSpin = this.springSystem.createSpring();
        const springConfig = this._scrollSpin.getSpringConfig();
        springConfig.tension = 230;
        springConfig.friction = 10;

        this._scrollSpin.addListener({
            onSpringUpdate: () => {
                const currentValue = this._scrollSpin.getCurrentValue();
                this.setState({
                    scale: currentValue,
                });
            },
        });
        this._scrollSpin.setCurrentValue(1);
    }
    render() {
        return (
            <TouchableHighlight
                onPressIn={this._onPressIn.bind(this)}
                onPressOut={this._onPressOut.bind(this)}
                style={this.getButtonStyle()}
                underlayColor="white"
            >
                <Image
                    style={this.getImageButtonStyle()}
                    source={this.getImageOnState()}
                />
            </TouchableHighlight>
        );
    }
    _onPressIn() {
        if (this.state.active) {
            return;
        }
        this._scrollSpin.setEndValue(0.5);
    }
    _onPressOut() {
        if (this.state.active) {
            return;
        }
        this._scrollSpin.setEndValue(1);
        this.handleClick();
    }
    getButtonStyle() {
        return {
            margin: this.props.margin,
            borderRadius: 10,
            height: this.props.width,
            width: this.props.width,
            transform: [
                { scaleX: this.state.scale },
                { scaleY: this.state.scale },
            ],
        };
    }
    getImageButtonStyle() {
        return {
            borderRadius: 10,
            height: this.props.width,
            width: this.props.width,
        };
    }
    setDone() {
        this.setState({
            done: true,
        });
    }
    setActiveState(value) {
        this.setState({
            active: value,
        });
    }
    handleClick() {
        if (!this.state.done) {
            this.props.onClick();
        }
    }
    getImageOnState() {
        if (this.state.active) {
            return this.props.link;
        }
        return Question;
    }
}

GameItem.propTypes = {
    reference: React.PropTypes.string.isRequired,
    link: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
    width: React.PropTypes.number.isRequired,
    isDone: React.PropTypes.bool.isRequired,
    margin: React.PropTypes.number.isRequired,
};
