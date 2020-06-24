import types from './types';

const setMyTrack = (newTracks) => ({
  type: types.SET_MY_TRACKS,
  payload: newTracks,
});

const addMyTrack = (track) => ({
  type: types.ADD_MY_TRACK,
  payload: track,
});

const toggleBookmark = (trackId) => ({
  type: types.TOGGLE_BOOKMARK,
  payload: trackId,
});

const deleteMyTrack = (trackId) => ({
  type: types.DELETE_MY_TRACK,
  payload: trackId,
});

const setTrackFilter = (filter) => ({
  type: types.SET_TRACK_FILTER,
  payload: filter,
});

const setFoundTracks = (newTracks) => ({
  type: types.SET_FOUND_TRACKS,
  payload: newTracks,
});

const addFoundTracks = (moreTracks) => ({
  type: types.ADD_FOUND_TRACKS,
  payload: moreTracks,
});

export default {
  setMyTrack,
  addMyTrack,
  toggleBookmark,
  deleteMyTrack,
  setTrackFilter,
  setFoundTracks,
  addFoundTracks,
};
