import * as types from '../action/SingleTrackViewer/types';

const initialState = {
  trackData: undefined,
}

const reducer = (state = initialState, action) => {
  const newState = {...state};
  if (action.type === types.SET_SINGLETRACK) {
    newState.trackData = action.payload;
  }
  return newState;
}

export default reducer;