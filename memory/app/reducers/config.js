import * as types from '../actions/actionTypes';
import { AsyncStorage } from 'react-native';

const initialState = {
    question: {},
    tiles: 0,
    imagesAndPrices: [],
    winner: {},
    shuffledImages: []
}

export default function config(state = initialState, action = {}) {
    switch(action.type){
        case types.UPDATE_CONFIG_IMAGE:
            return {
                ...state,
                imagesAndPrices: action.payload.imagesAndPrices
            };
        case types.UPDATE_CONFIG:
            return {
                ...state,
                question: action.payload.question,
                tiles: action.payload.tiles,
                imagesAndPrices: action.payload.imagesAndPrices,
            };
        case types.UPDATE_CONFIG_WINNER:
            return {
                ...state,
                winner: action.payload.winner
            }
        case types.SAVE_SHUFFLEDIMAGES:
            return {
                ...state,
                shuffledImages: action.payload.images,
            }
        case types.SAVE_NEWSHUFFLEDIMAGES:
            return {
                ...state,
                imagesAndPrices: action.payload.images,
                shuffledImages: action.payload.shuffledImages,
            }
        case types.SAVE_STORAGE:
            WriteToStorage(state);
            return state;
        case types.UPLOAD_STORAGE:
            return GetStateFromStorage();
        default:
            return state;
    }
}

function WriteToStorage(state){

    AsyncStorage.setItem("tiles", state.tiles.toString());
    AsyncStorage.setItem("questionImage", JSON.stringify(state.question));
    AsyncStorage.setItem("imagesAndPrices", JSON.stringify(state.imagesAndPrices));
    AsyncStorage.setItem("winner", JSON.stringify(state.winner));
    AsyncStorage.setItem("shuffledImages", JSON.stringify(state.shuffledImages));
}

function GetStateFromStorage(){

    let state = {
        question: {},
        tiles: 0,
        imagesAndPrices: [],
        winner: {},
        shuffledImages: [],
    };

    AsyncStorage.getItem("tiles").then((value) => {
            console.log('value of tiles: ',value);
            state.tiles = parseInt(value);
            console.log(state.tiles);
        }).done();
    AsyncStorage.getItem("questionImage").then((value) => {
            console.log(value);
            state.question = JSON.parse(value);
            console.log(state.question);
        }).done();
    AsyncStorage.getItem("imagesAndPrices").then((value) => {
            console.log(value);
            state.imagesAndPrices = JSON.parse(value);
            console.log(state.imagesAndPrices);
        }).done();
    AsyncStorage.getItem("winner").then((value) => {
            console.log(value);
            state.winner = JSON.parse(value);
            console.log(state.winner);
        }).done();
    AsyncStorage.getItem("shuffledImages").then((value) => {
            console.log(value);
            state.shuffledImages = JSON.parse(value);
            console.log(state.shuffledImages);
        }).done();
    return state;
}
