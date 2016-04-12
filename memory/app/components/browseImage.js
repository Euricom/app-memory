import React,
    {
        View,
        Image,
        StyleSheet,
        TouchableHighlight,
    }
    from 'react-native';
import question from '../data/question.jpg';

import { ImagePickerManager } from 'NativeModules';

export class BrowseImage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image: this.props.image
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
                        source={this.state.image}
                        resizeMode='stretch'/>
                </TouchableHighlight>
            </View>
        )
    }
    getButtonStyle(){
        return {
            height: this.props.width,
            width: this.props.width,
            flexWrap: 'wrap',
            margin:2,
        }
    }
    getImageStyle(){
        return {
            borderRadius: 10,
            height: this.props.width,
            width: this.props.width,
        }
    }
    handleClick(){
        //this.selectImage()
        this.props.onClick(this.state.image);
    }

    /*This code is added for getting images from the device memory*/
    selectImage() {
        var options = {
            title: '', // specify null or empty string to remove the title
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: '', // specify null or empty string to remove this button
            chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
            cameraType: 'back', // 'front' or 'back'
            mediaType: 'photo', // 'photo' or 'video'
            maxWidth: 100, // photos only
            maxHeight: 100, // photos only
            quality: 0.2, // 0 to 1, photos only
            noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
            storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
                skipBackup: true, // ios only - image will NOT be backed up to icloud
            }
        };
        ImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                this.setState({
                    image: source
                });
            }
        });
    }

}

BrowseImage.propTypes = {
    image: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
}
