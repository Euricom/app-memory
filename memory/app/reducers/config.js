import * as types from '../actions/actionTypes';

const initialState = {
    question: {},
    tileX: 0,
    tileY: 0,
    imagesAndPrices: []
};

export default function config(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_CONFIG:
      return {
        ...state,
        question: state.question,
        tileX: state.tileX,
        tileY: state.tileY,
        imagesAndPrices: state.imagesAndPrices
      };
    default:
      return state;
  }
}
