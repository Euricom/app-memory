/* eslint-disable react/jsx-indent-props, react/jsx-no-bind, react/prop-types, react/sort-comp */
import React,
    {
        View,
        Image,
        TouchableHighlight,
    }
    from 'react-native';

import { ImagePickerManager } from 'NativeModules';

export class BrowseImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
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
                        source={this.state.image}
                        resizeMode="stretch"
                    />
                </TouchableHighlight>
            </View>
        );
    }
    getButtonStyle() {
        return {
            height: this.props.width,
            width: this.props.width,
            flexWrap: 'wrap',
            margin: 2,
        };
    }
    getImageStyle() {
        return {
            borderRadius: 10,
            height: this.props.width,
            width: this.props.width,
        };
    }
    handleClick() {
        this.props.onClick(this.state.image);
    }

    /* This code is added for getting images from the device memory*/
    selectImage() {
        const options = {
            title: '',
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: '',
            chooseFromLibraryButtonTitle: 'Choose from Library...',
            cameraType: 'back', // 'front' or 'back'
            mediaType: 'photo', // 'photo' or 'video'
            maxWidth: 100, // photos only
            maxHeight: 100, // photos only
            quality: 0.2, // 0 to 1, photos only
            noData: false,
            storageOptions: {
                skipBackup: true, // ios only - image will NOT be backed up to icloud
            },
        };
        ImagePickerManager.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                // console.log('ImagePickerManager Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: `data:image/jpeg;base64,${response.data}`, isStatic: true };
                this.setState({
                    image: source,
                });
            }
        });
    }

}

BrowseImage.propTypes = {
    image: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
};
