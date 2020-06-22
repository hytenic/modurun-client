import types from './types';

const updateChat = (newChat, scheduleId) => {
  return {
    type: types.UPDATE_CHAT,
    payload: { newChat, scheduleId },
  };
};

const addMessage = (newMessage, scheduleId) => {
  return {
    type: types.ADD_MESSAGE,
    payload: { newMessage, scheduleId },
  };
};

const addMessagesToHead = (prevChat, scheduleId) => {
  return {
    type: types.ADD_MESSAGES_TO_HEAD,
    payload: { prevChat, scheduleId },
  };
};

const setChatOffset = (newOffset, scheduleId) => {
  return {
    type: types.SET_CHAT_OFFSET,
    payload: { newOffset, scheduleId },
  };
};

export default {
  updateChat,
  addMessage,
  addMessagesToHead,
  setChatOffset,
};
