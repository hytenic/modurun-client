import * as types from '../action/TrackMaster/types';

const initialState = {
  userLocation: {
    curPosition: undefined,
    curPosCamera: undefined,
  },
  tracks: [],
};

const trackMasterReducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === types.UPDATE_USERLOCATION) {
    newState.userLocation = action.payload;
  }

  if (action.type === types.ADD_TRACK) {
    newState.tracks.push(action.payload);
  }

  return newState;
};

export default trackMasterReducer;
