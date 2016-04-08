import React,
    {
        View,
        Text,
        StyleSheet,
        TouchableHighlight,
        CameraRoll,
        NativeModules,
        Image,
        TextInput,
    }
    from 'react-native';
import { ImagePickerManager } from 'NativeModules';
import { ConfiguratorImage } from './configurator.image';
import { getImages } from '../data/data';
import { Question } from '../data/data';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
    },
    rowContainer: {
        flexDirection: 'row',
        margin: 5,
    },
    question: {
        flexDirection: 'row',
        height: 35,
        width: 35,
        justifyContent: 'center'
    },
    text: {
        flex: 2,
        padding: 10,
        fontSize: 18,
    },
    button: {
        borderRadius: 65,
        height: 44,
        backgroundColor: 'green',
        flex: 2,
        justifyContent: 'flex-end',
    },
    buttonText: {
        padding: 10,
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 55,
        width: 55
    },
    list:{
        marginTop: 15,
        marginLeft: 45,
        marginRight: 45,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 8,
        color: 'black',
        flex:2,
        justifyContent: 'center'
    }
})

export class Configurator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            questionSource: '',
            tileX: 2,
            tileY: 3,
            images: getImages(30),
            activeImages: []
        }
    }
    // <TouchableHighlight
    //     style={styles.button}
    //     onPress={this.selectQuestionImage.bind(this)}
    //     underlayColor='white'>
    //     <Text style={styles.buttonText}>Browse</Text>
    // </TouchableHighlight>
    render(){
        return(
            <View style={styles.container}>
                <View
                    style={styles.rowContainer}>
                    <Text style={styles.text}>Default question image: </Text>
                </View>
                <View style={styles.list}>
                    <Image style={styles.image} source={Question}/>
                </View>
                <View style={styles.list}>
                    <Image
                        style={styles.question}
                        source={this.state.questionSource}
                        resizeMode='stretch'/>
                </View>
                <View
                    style={styles.rowContainer}>
                    <Text style={styles.text}>Amount of Tiles</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.tileX.toString()}
                        onChange={this.handleOnXChange.bind(this)}/>
                    <TextInput
                        style={styles.input}
                        value={this.state.tileY.toString()}
                        onChange={this.handleOnYChange.bind(this)}/>
                </View>
                <View
                    style={styles.rowContainer}>
                </View>
                <View style={styles.list}>
                    {this.showImages()}
                </View>
                <View
                    style={styles.rowContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.saveToState.bind(this)}
                        underlayColor='white'>
                        <Text style={styles.buttonText}>Save setup</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
    saveToState(){
        console.log('data should now be saved onto the store');
        
    }
    handleOnXChange(event){
        this.setState({
            tileX: parseInt(event.nativeEvent.text === ''? 0 : event.nativeEvent.text)
        })
    }
    handleOnYChange(event){
        this.setState({
            tileY: parseInt(event.nativeEvent.text === ''? 0 : event.nativeEvent.text)
        })
    }
    showImages(){
        var list = this.state.images.map((item, index) => {
            return (
                <View key={index}>
                    <ConfiguratorImage item={item} onClick={this.addImageToState.bind(this, item)}/>
                </View>
            )
        })
        return list;
    }
    addImageToState(item, add){
        let images = [];
        images.push(...this.state.activeImages);

        if(add){
            images.push(item);
        } else {
            var index = images.indexOf(item);
            if (index > -1) {
                images.splice(index, 1);
            }
        }

        this.setState({
            activeImages: images
        })
    }

    /*Gets the images through the cameralRoll*/

    // getImages(){
    //     return CameraRoll.getPhotos({first:50})
    //         .then((res)=>{
    //             this.storeImages(res);
    //         })
    //         .catch((err)=>{
    //             this.logImageError(err)
    //         })
    // }
    //
    // storeImages(data) {
    //     const assets = data.edges;
    //     const images = assets.map( asset => asset.node.image );
    //     this.setState({
    //         images: images,
    //     });
    //     console.log(images);
    //  }
    //
    //  logImageError(err) {
    //      console.log(err);
    //  }

    /*This code is added for getting images from the device memory*/
    //  selectQuestionImage() {
    //     var options = {
    //         title: '', // specify null or empty string to remove the title
    //         cancelButtonTitle: 'Cancel',
    //         takePhotoButtonTitle: '', // specify null or empty string to remove this button
    //         chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
    //         cameraType: 'back', // 'front' or 'back'
    //         mediaType: 'photo', // 'photo' or 'video'
    //         maxWidth: 100, // photos only
    //         maxHeight: 100, // photos only
    //         quality: 0.2, // 0 to 1, photos only
    //         noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
    //         storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    //             skipBackup: true, // ios only - image will NOT be backed up to icloud
    //         }
    //     };
    //     ImagePickerManager.showImagePicker(options, (response) => {
    //         console.log('Response = ', response);
    //
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         }
    //         else if (response.error) {
    //             console.log('ImagePickerManager Error: ', response.error);
    //         }
    //         else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         }
    //         else {
    //             const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
    //             this.setState({
    //                 questionSource: source
    //             });
    //         }
    //     });
    // }
}
