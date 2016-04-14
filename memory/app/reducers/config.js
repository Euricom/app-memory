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
                /*eslint-disable*/
                ...state,
                /*eslint-enable*/
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
        default:
            return state;
    }
}

function WriteToStorage(state){
    AsyncStorage.setItem("state", JSON.stringify(state));
}

function GetStateFromStorage(){

    let state = {
        question: {},
        tiles: 0,
        imagesAndPrices: [],
        winner: {},
        shuffledImages: [],
    };

    AsyncStorage.getItem("state")
        .then((value) => {
            console.log(value)
            if(value){
                console.log('writing to state: ',value)
                state = JSON.parse(value);
            }
        })
        .done();
    return state;
}
