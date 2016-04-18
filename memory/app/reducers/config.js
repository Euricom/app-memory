import * as types from '../actions/actionTypes';
import { AsyncStorage } from 'react-native';

const initialState = {
    question: {},
    tiles: 0,
    imagesAndPrices: [],
    winner: {},
    shuffledImages: [],
    password: '0000',
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
                shuffledImages: []
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
        case types.SAVE_PASSWORD:
            return {
                ...state,
                password: action.payload.password,
            }
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
    AsyncStorage.setItem("password", state.password);
    // AsyncStorage.setItem("state", JSON.stringify(state));
}

function GetStateFromStorage(){

    let state = {
        question: {},
        tiles: 0,
        imagesAndPrices: [],
        winner: {},
        shuffledImages: [],
        password: '0000',
    };

    AsyncStorage.getItem("tiles")
        .then((value) => {
            if (value) {
                state.tiles = parseInt(value);
            }
        })
        .done();

    AsyncStorage.getItem("questionImage")
        .then((value) => {
            if (value) {
                state.question = JSON.parse(value);
            }
        })
        .done();
    AsyncStorage.getItem("imagesAndPrices")
        .then((value) => {
            if (value) {
                state.imagesAndPrices = JSON.parse(value);
            }
        })
        .done();
    AsyncStorage.getItem("winner")
        .then((value) => {
            if (value) {
                state.winner = JSON.parse(value);
            }
        })
        .done();
    AsyncStorage.getItem("shuffledImages")
        .then((value) => {
            if( value) {
                state.shuffledImages = JSON.parse(value);
            }
        })
        .done();
    AsyncStorage.getItem("password")
        .then((value) => {
            if( value) {
                state.password = value;
            }
        })
        .done();

    return state;
}
