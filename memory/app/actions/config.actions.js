import * as types from './actionTypes';

export function UpdateConfigAction(question, tiles, imagesAndPrices) {
  return {
    type: types.UPDATE_CONFIG,
    payload: {
        question,
        tiles,
        imagesAndPrices
    },
  };
}

export function UpdateConfigImageAction(imagesAndPrices){
    return {
        type: types.UPDATE_CONFIG_IMAGE,
        payload: {imagesAndPrices}
    }
}

export function SaveStorageAction(){
    return {
        type: types.SAVE_STORAGE
    }
}
export function UploadStorageAction(){
    return {
        type: types.UPLOAD_STORAGE
    }
}
export function UpdateConfigWinnerAction(winner){
    return {
        type: types.UPDATE_CONFIG_WINNER,
        payload: {winner}
    }
}
