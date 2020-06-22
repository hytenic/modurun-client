/* eslint-disable import/prefer-default-export */
import * as types from './types';

export const setCreatedTrack = (track) => ({
  type: types.SET_CREATEDTRACK,
  payload: track,
});
