import React,
    {
        View,
        Text,
        StyleSheet,
        TouchableHighlight,
    }
    from 'react-native';
import { getImagesShuffledAndDoubledByAmount } from '../data/data';
import { GameItem } from './game.item';

const styles = StyleSheet.create({
    container: {
        marginTop: 65,
        marginLeft: 15,
        flex: 1,
    },
    rowContainer: {
        flexWrap: 'wrap',
    },
    buttonContainer: {
        flexWrap: 'wrap',
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
})

export class Game extends React.Component{
    constructor(props){
        super(props);
        this.state={
            counter: 0,
            references: [],
            images: getImagesShuffledAndDoubledByAmount(12)
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>This will become the game component</Text>
                <View style={styles.list}>
                    {this.renderImages()}
                </View>
            </View>
        )
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
        for (var i = 0; i < this.state.references.length; i++) {
            var index = this.state.references[i].index;
            this.refs['item'+ index].setDone();
        }
        this.setState({
            references: []
        })
    }
    checkMemory(){
        if(this.state.references.length === 2){
            // check their values
            if(this.state.references[0].item === this.state.references[1].item){
                this.cardsDone();
            } else {
                setTimeout(() => {this.turnCards();}, 1000);
            }
        }
    }
    handleGameItemClick(item, index){
        var newReferences = [];
        newReferences.push(...this.state.references);
        newReferences.push({item,index});

        this.setState({
            references: newReferences
        });
        this.checkMemory();
    }
    renderImages(){
        console.log('rendering the images');
        var list = this.state.images.map((item, index) => {
            var binder = this.handleGameItemClick.bind(this, item, index);
            return (
                <View key={index}>
                    <GameItem                        
                        reference={item.reference}
                        link={item.image}
                        onClick={binder}
                        ref={'item'+index}/>
                </View>
            )
        })
        return list;
    }
}
