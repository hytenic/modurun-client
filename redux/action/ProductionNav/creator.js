import types from './types';

const setChatRoomTitle = (newTitle) => ({
  type: types.SET_CHATROOM_TITLE,
  payload: newTitle,
});

export default {
  setChatRoomTitle,
};
