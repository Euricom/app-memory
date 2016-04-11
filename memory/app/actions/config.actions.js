import * as types from './actionTypes';

export function UpdateConfigAction(question, tileX, tileY, imagesAndPrices) {
  return {
    type: types.UPDATE_CONFIG,
    payload: {
        question,
        tileX,
        tileY,
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
