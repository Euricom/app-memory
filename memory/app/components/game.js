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

import { UpdateConfigImageAction } from '../actions/config.actions';

import { getImagesShuffledAndDoubled } from '../data/data';
import { Authenticator } from './authenticator';
import { GameItem } from './game.item';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1,
        justifyContent: 'center',
    },
})

class Game extends React.Component{
    constructor(props){
        super(props);

        //var p = this.calculateWidthAndMargin();
        this.state = {
            modal: false,
            authenticate: {},
            references: [], //those that are being handled
            images: getImagesShuffledAndDoubled(this.props.config.imagesAndPrices),
            imageWidth: 150, //p.imageWidth,
            listMargin: 15,  // p.listMargin
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Authenticator
                    modalVisible={this.state.modal}
                    modalValues={this.state.authenticate}
                    onEnter={this.onEnter.bind(this)}/>
                <View style={this.calculateStyle()}>
                    {this.renderImages()}
                </View>
            </View>
        )
    }
    onEnter(ret){
        this.setState({
            modal: false
        })
    }
    turnCards(){
        console.log(this.state.references);
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
        console.log(storeReference);
        this.setState({
            modal: true,
            authenticate: this.getPasswordObject(storeReference)
        })
        this.updateStateImages(storeReference);
        this.updateStoreImages(storeReference);
        // for (var i = 0; i < this.state.references.length; i++) {
        //     var index = this.state.references[i].index;
        //     this.refs['item'+ index].setDone();
        // }
        this.setState({
            references: []
        })
    }
    updateStateImages(reference){
        var list = [...this.state.images];
        for (var i = 0; i < list.length; i++) {
            console.log(list[i]);
            console.log(reference);
            if(list[i].reference == reference){
                console.log('changing done state on the images')
                list[i].done = true;
            }
        }
        this.setState({
            images: list
        })
    }
    //Updates the store so their images are updated correctly
    updateStoreImages(reference){

        var imagesAndPrices = [...this.props.config.imagesAndPrices];
        var indexOf = imagesAndPrices.indexOf(reference);

        var ref = imagesAndPrices.splice(indexOf, 1);
        ref[0].done = true;

        imagesAndPrices.splice(indexOf, 0, ref[0]);

        this.props.updateImages(imagesAndPrices);
    }

    checkMemory(){
        if(this.state.references.length === 2){
            // check their values
            if(this.state.references[0].item === this.state.references[1].item){
                this.cardsDone();
            } else {
                setTimeout(() => {this.turnCards();}, 750);
                this.setState({
                    modal: true,
                    authenticate: this.getPasswordObjectIncorrect
                })
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
        //Here the amount of tiles gets calculated.
    }
    renderImages() {
        var list = this.state.images.map((item, index) => {
            console.log(item);
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
        console.log(item);
        return {
            header: 'Gefeliciteerd, U heeft gewonnen!!!',
            middleText: `Prijs: ${item.price.price}`,
            footer: 'Toon dit scherm aan een Euricom medewerker',
            image: item.image.image,
            password: true,
            passwordText: 'Unlock',
        }
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)
