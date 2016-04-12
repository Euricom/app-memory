import React,
    {
        View,
        Text,
        StyleSheet,
        TouchableHighlight,
        Dimensions,
    }
    from 'react-native';

import { connect } from 'react-redux';

import
    {
        UpdateConfigImageAction,
        SaveStorageAction,
        UpdateConfigWinnerAction,
        SaveShuffledImagesAction
    }
    from '../actions/config.actions';


import { Authenticator } from './authenticator';
import { GameItem } from './game.item';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flex: 1,
    },
    button: {
        borderRadius: 65,
        marginTop: 15,
        height: 35,
        width: 150,
        backgroundColor: 'green',
        justifyContent: 'center',
    },
    buttonText: {
        padding: 5,
        fontSize: 16,
        color: 'white',
        alignSelf: 'center'
    }
})

class Game extends React.Component{
    constructor(props){
        super(props);

        var p = this.calculateWidthAndMargin();
        this.state = {
            modal: false,
            authenticate: {},
            references: [], //those that are being handled
            images: this.props.images,
            imageWidth: p.imageWidth,
            listMargin: p.listMargin,
            back: false,
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Authenticator
                    modalVisible={this.state.modal}
                    modalValues={this.state.authenticate}
                    onEnter={this.onEnter.bind(this)}/>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleBack.bind(this)}
                    underlayColor='white'>
                    <Text style={styles.buttonText}> Ga terug </Text>
                </TouchableHighlight>
                <View style={this.calculateStyle()}>
                    {this.renderImages()}
                </View>
            </View>
        )
    }
    handleBack(){
        this.setState({
            modal: true,
            authenticate: this.getPasswordObjectForBack,
            back: true,
        })
    }
    onEnter(ret){
        if(this.props.config.winner !== {} && this.props.config.winner !== undefined){
            this.props.updateWinner({});
            this.props.saveStorage();
        }
        if(this.state.back ){
            this.setState({
                back: false
            })
            if(ret){
                this.props.navigator.pop();
            }
        }
        this.setState({
            modal: false
        })
    }
    turnCards(){
        for (var i = 0; i < this.state.references.length; i++) {
            var index = this.state.references[i].index;
            this.refs['item'+ index].setUnactive();
        }
        this.setState({
            references: []
        })
    }
    cardsDone(){
        var storeReference = this.state.references[0].item;
        this.setState({
            modal: true,
            authenticate: this.getPasswordObject(storeReference)
        })
        //update the state images
        this.updateStateImages(storeReference);

        //update the store
        this.updateStoreImages(storeReference);

        //update the AsyncStorage with the new store
        this.props.saveStorage();

        this.setState({
            references: []
        })
    }
    updateStateImages(reference){
        var list = [...this.state.images];
        for (var i = 0; i < list.length; i++) {
            if(list[i].reference == reference){
                list[i].done = true;
            }
        }
        this.setState({
            images: list
        })
        this.props.saveShuffledImages(list);
    }

    //Updates the store so their images are updated correctly
    updateStoreImages(reference){

        var imagesAndPrices = [...this.props.config.imagesAndPrices];
        var indexOf = imagesAndPrices.indexOf(reference);

        var ref = imagesAndPrices.splice(indexOf, 1);
        ref[0].done = true;

        imagesAndPrices.splice(indexOf, 0, ref[0]);

        //update the store
        this.props.updateImages(imagesAndPrices);

        //update the store winner
        this.props.updateWinner(reference);
    }

    checkMemory(){
        if(this.state.references.length === 2){

            if(this.state.references[0].item.image.reference === this.state.references[1].item.image.reference){
                this.cardsDone();
            } else {
                this.setState({
                    modal: true,
                    authenticate: this.getPasswordObjectIncorrect
                })
                setTimeout(() => {this.turnCards();}, 3500);
            }
        }
    }
    handleGameItemClick(item, index) {
        var newReferences = [];
        newReferences.push(...this.state.references);
        newReferences.push({item,index});

        this.setState({
            references: newReferences
        });
        this.checkMemory();
    }
    calculateStyle(){
        return {
            marginTop: 65,
            marginLeft: this.state.listMargin,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }
    }
    calculateWidthAndMargin() {
        if(this.props.config.tiles <= 12)
        {
            return {
                imageWidth: 200,
                listMargin: 25,
            }
        }
        else if(this.props.config.tiles <= 24){
            return {
                imageWidth: 150,
                listMargin: 15,
            }
        }
        else if(this.props.config.tiles <= 30){
            return {
                imageWidth: 125,
                listMargin: 5,
            }
        } else if(this.props.config.tiles <= 40){
            return {
                imageWidth: 115,
                listMargin: 5,
            }
        } else if(this.props.config.tiles <= 54){
            return {
                imageWidth: 100,
                listMargin: 5,
            }
        } else {
            return {
                imageWidth: 90,
                listMargin: 5,
            }
        }
    }
    renderImages() {
        var list = this.state.images.map((item, index) => {
            var binder = this.handleGameItemClick.bind(this, item, index);
            return (
                <View key={index}>
                    <GameItem
                        width={this.state.imageWidth}
                        reference={item.image.reference}
                        link={item.image.image}
                        isDone={item.done}
                        onClick={binder}
                        ref={'item'+index}/>
                </View>
            )
        })
        return list;
    }
    getPasswordObjectIncorrect = {
        header: 'Jammer, u heeft geen prijs gewonnen.',
        middleText: 'Probeer het later nog eens',
        footer: 'Toon dit scherm aan een Euricom medewerker.',
        password: true,
        passwordText: 'Unlock',
    }
    getPasswordObject(item) {
        return {
            header: 'Gefeliciteerd, U heeft gewonnen!!!',
            // middleText: `Prijs: ${item.price.price}`,
            footer: 'Toon dit scherm aan een Euricom medewerker',
            image: item.image.image,
            password: true,
        }
    }
    getPasswordObjectForBack = {
        header: 'Geef het wachtwoord',
        password: true,
        closeText: 'Sluiten',
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateImages: (images) => {
            dispatch(UpdateConfigImageAction(images))
        },
        updateWinner: (winner) => {
            dispatch(UpdateConfigWinnerAction(winner))
        },
        saveStorage: () => {
            dispatch(SaveStorageAction())
        },
        saveShuffledImages: (images) => {
            dispatch(SaveShuffledImagesAction(images))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)
