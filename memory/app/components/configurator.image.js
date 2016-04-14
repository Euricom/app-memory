/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React,
    {
        View,
        Image,
        TouchableHighlight,
    }
    from 'react-native';

import { styles } from '../styles';

export class ConfiguratorImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <View>
                <TouchableHighlight
                    onPress={this.handleClick.bind(this)}
                    style={this.getButtonStyle()}
                    underlayColor="white"
                >
                    <Image
                        style={this.getImageStyle()}
                        source={this.props.item.image}
                    />
                </TouchableHighlight>
            </View>
        );
    }
    getImageStyle() {
        if (this.state.active) {
            return styles.activeGameImage;
        }
        return styles.gameImage;
    }
    getButtonStyle() {
        if (this.state.active) {
            return styles.activeGameButton;
        }
        return styles.gameButton;
    }
    handleClick() {
        this.props.onClick(!this.state.active);
    }
    setActiveState(value) {
        this.setState({
            active: value,
        });
    }
}

ConfiguratorImage.propTypes = {
    item: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
};
