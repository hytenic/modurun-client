import types from './types';

const setUserInformation = (userInfo) => ({
  type: types.SET_USER_INFORMATION,
  payload: userInfo,
});

export default setUserInformation;
