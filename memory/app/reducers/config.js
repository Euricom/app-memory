import * as types from '../actions/actionTypes';

const initialState = {
  question: {},
  images: []
};

export default function config(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_QUESTION:
      return {
        ...state,
        question: state.question
      };
    default:
      return state;
  }
}
