import types from '../action/ProductionNav/types';

const initialState = {
  chatRoomTitle: '',
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === types.SET_CHATROOM_TITLE) {
    newState.chatRoomTitle = action.payload;
  }
  return newState;
};

export default reducer;
