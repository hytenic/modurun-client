import types from '../action/TrackManager/types';

const initialState = {
  myTracks: [],
  foundTracks: [],
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === types.SET_MY_TRACKS) {
    newState.myTracks = action.payload;
  }
  if (action.type === types.ADD_MY_TRACK) {
    newState.myTracks = state.myTracks.concat(action.payload);
  }
  if (action.type === types.DELETE_MY_TRACK) {
    const targetTrackId = action.payload;
    newState.myTracks = state.myTracks.filter((track) => track.trackId !== targetTrackId);
  }
  if (action.type === types.TOGGLE_BOOKMARK) {
    const targetTrackId = action.payload;
    newState.myTracks = state.myTracks.map((track) => {
      if (track.trackId !== targetTrackId) return track;
      return { ...track, bookmark: 1 - track.bookmark };
    });
  }
  if (action.type === types.SET_FOUND_TRACKS) {
    const newTracks = action.payload;
    // console.log(newTracks);
    newState.foundTracks = newTracks;
  }
  if (action.type === types.ADD_FOUND_TRACKS) {
    const moreTracks = action.payload;
    newState.foundTracks = state.foundTracks.concat(moreTracks);
  }

  return newState;
};

export default reducer;
