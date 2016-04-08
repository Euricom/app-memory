import React,
    {
        ScrollView,
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
import { connect } from 'react-redux';
import { UpdateConfigAction} from '../actions/config.actions';

import { ImagePickerManager } from 'NativeModules';
import { ConfiguratorImage } from './configurator.image';
import { getImages, Question, getImagesShuffledAndDoubled } from '../data/data';

const imageitem = 'image';
const priceitem = 'image';
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

class Configurator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tileX: 0,
            tileY: 0,
            images: getImages(30),
            activeImages: [],
            activePrices: [],
        }
    }
    render(){
        return(
            <ScrollView style={styles.container}>
                <View
                    style={styles.rowContainer}>
                    <Text style={styles.text}>Default question image: </Text>
                </View>
                <View style={styles.list}>
                    <Image style={styles.image} source={Question}/>
                </View>
                <View
                    style={styles.rowContainer}>
                    <Text style={styles.text}>Amount of Tiles</Text>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        value={this.state.tileX.toString()}
                        onChange={this.handleOnXChange.bind(this)}/>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        value={this.state.tileY.toString()}
                        onChange={this.handleOnYChange.bind(this)}/>
                </View>
                <View
                    style={styles.rowContainer}>
                    <Text>Update gegevens</Text>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.updateTiles.bind(this)}
                        underlayColor='white'>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableHighlight>
                </View>
                <Text>Afbeeldingen</Text>
                <View style={styles.list}>
                    {this.showImages()}
                </View>
                <Text>Te behalen prijzen</Text>
                <View>
                    {this.showPrices()}
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
            </ScrollView>
        )
    }
    saveToState(){
        console.log('data should now be saved onto the store');
        var imagesAndPrices = [];
        for (var i = 0; i < this.getTileToImageCount(); i++) {
            var ob = {
                image: this.state.activeImages[i],
                price: this.state.activePrices[i]
            }
            imagesAndPrices.push(ob);
        }
        console.log(imagesAndPrices);
        this.updateConfig(Question, this.state.tileX, this.state.tileY, imagesAndPrices);
    }
    handleOnXChange(event){
        this.setState({
            tileX: parseInt(event.nativeEvent.text === ''? 0 : event.nativeEvent.text)
        })
        // this.setTiles();
    }
    handleOnYChange(event){
        this.setState({
            tileY: parseInt(event.nativeEvent.text === ''? 0 : event.nativeEvent.text)
        })
        // this.setTiles();
    }
    showPrices(){
        var list = this.state.activePrices.map((item, index) => {
            return (
                <View key={index}>
                    <Text>{item.price}</Text>
                </View>
            )
        })
        return list;
    }
    showImages(){
        var list = this.state.images.map((item, index) => {
            return (
                <View key={index}>
                    <ConfiguratorImage
                        item={item}
                        index={index}
                        onClick={this.addImageToState.bind(this, item, index)}
                        ref={imageitem+index}/>
                </View>
            )
        })
        return list;
    }
    updateTiles(){
        this.setTiles();
        this.setPrices();
    }
    setPrices(){
        var amount = this.getTileToImageCount();
        if(this.state.activePrices.length === 0){
            var list = [];
            for (var i = 0; i < amount; i++) {
                var object= {
                    price: 'Price ' + i
                }
                list.push(object);
            }
            this.setState({
                activePrices: list
            })
        }
    }
    getTileToImageCount(){
        return (this.state.tileX * this.state.tileY) / 2;
    }
    setTiles(){
        var amount = this.getTileToImageCount();
        var toActiveState = []
        for (var i = 0; i < amount; i++) {

            this.refs[imageitem+ i].setActiveState(true);
            toActiveState.push(this.state.images[i]);
        }
        this.setState({
            activeImages: toActiveState,
        })
    }
    addImageToState(item, index, add){
        // this.refs['item'+ i].setActiveState(true);

        let images = [];
        images.push(...this.state.activeImages);

        var amount = this.getTileToImageCount();

        if (this.state.activeImages.length >= amount && add) {
            this.refs[imageitem+ index].setActiveState(false)
        } else if (add) {
            this.refs[imageitem+ index].setActiveState(true);
            images.push(item);
        } else {
            this.refs[imageitem+ index].setActiveState(false);
            var i = images.indexOf(item);
            if (i > -1) {
                images.splice(i, 1);
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

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateConfig: (question, tileX, tileY, imagesAndPrices) => {
            dispatch(UpdateConfigAction(question, tileX, tileY, imagesAndPrices))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Configurator);
