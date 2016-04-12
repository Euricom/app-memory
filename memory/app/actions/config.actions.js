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
