import * as types from '../actions/actionTypes';

const initialState = {
    question: {},
    tileX: 0,
    tileY: 0,
    imagesAndPrices: []
};

export default function config(state = initialState, action = {}) {
    console.log(action)
    switch(action.type){
        case types.UPDATE_CONFIG_IMAGE:
            console.log('updating the config imagesAndPrices');
            return {
                ...state,
                imagesAndPrices: action.payload.imagesAndPrices
            };
            break;
        case types.UPDATE_CONFIG:
            console.log('updating the whole config');
            return {
                ...state,
                question: action.payload.question,
                tileX: action.payload.tileX,
                tileY: action.payload.tileY,
                imagesAndPrices: action.payload.imagesAndPrices
            };
            break;
        default:
            return state;
    }
}
