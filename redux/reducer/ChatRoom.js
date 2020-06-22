import types from '../action/ChatRoom/types';

const initialState = {
  data: {},
  offset: {},
};

const reducer = (state = initialState, action) => {
  const newState = {
    data: { ...state.data },
    offset: { ...state.offset },
  };

  if (action.type === types.UPDATE_CHAT) {
    const { scheduleId, newChat } = action.payload;
    newState.data[scheduleId] = newChat;
  }

  if (action.type === types.ADD_MESSAGE) {
    const { scheduleId, newMessage } = action.payload;
    newState.data[scheduleId] = [...state.data[scheduleId].concat(newMessage)];
  }

  if (action.type === types.ADD_MESSAGES_TO_HEAD) {
    const { scheduleId, prevChat } = action.payload;
    newState.data[scheduleId] = [...prevChat.concat(state.data[scheduleId])];
  }

  if (action.type === types.SET_CHAT_OFFSET) {
    const { newOffset, scheduleId } = action;
    newState.offset[scheduleId] = newOffset;
  }

  return newState;
};

export default reducer;
