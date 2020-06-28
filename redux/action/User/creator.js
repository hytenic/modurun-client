import types from './types';

const setUserInformation = (userInfo) => ({
  type: types.SET_USER_INFORMATION,
  payload: userInfo,
});

const changeUserName = (newName) => ({
  type: types.CHANGE_USER_NAME,
  payload: newName,
});

export default {
  setUserInformation,
  changeUserName,
};
