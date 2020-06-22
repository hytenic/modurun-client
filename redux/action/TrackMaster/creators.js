/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import * as types from './types';

export const setUserLocation = ({ curPosition, curPosCamera }) => {
  return {
    type: types.UPDATE_USERLOCATION,
    payload: { curPosition, curPosCamera },
  };
};

export const addTrack = (track) => {
  return {
    type: types.ADD_TRACK,
    payload: track,
  };
};

// export const catchMapView = (mapViewCurrent) => {
//   return {
//     type: types.CATCH_MAPVIEW,
//     payload: mapViewCurrent,
//   };
// };
