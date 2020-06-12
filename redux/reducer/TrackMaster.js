import * as types from '../action/TrackMaster/types';

const initialState = {
  userLocation: {
    curPosition: undefined,
    curPosCamera: undefined,
  },
};

const trackMasterReducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === types.UPDATE_USERLOCATION) {
    newState.userLocation = action.payload;
  }

  return newState;
};

export default trackMasterReducer;
