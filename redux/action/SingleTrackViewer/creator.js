import * as types from './types';

export const setSingleTrack = (track) => {
  return {
    type: types.SET_SINGLETRACK,
    payload: track,
  }
}