import * as types from './actionTypes';

export function UpdateConfigAction(question, tileX, tileY, imagesAndPrices) {
  return {
    type: types.UPDATE_CONFIG,
    question,
    tileX,
    tileY,
    imagesAndPrices
  };
}
