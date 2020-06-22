import * as types from '../action/CreatedTrackInfo/types';

const initialState = {
  track: null,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === types.SET_CREATEDTRACK) {
    newState.track = action.payload;
  }
  return newState;
};

export default reducer;
