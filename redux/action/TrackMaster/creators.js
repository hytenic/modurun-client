/* eslint-disable import/prefer-default-export */
import * as types from './types';

export const setUserLocation = ({ curPosition, curPosCamera }) => {
  return {
    type: types.UPDATE_USERLOCATION,
    payload: { curPosition, curPosCamera },
  };
};
