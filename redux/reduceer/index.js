import { combineReducers } from 'redux';
import myPageReducer from './myPage';

const rootReducer = combineReducers({
  myPage: myPageReducer,
});

export default rootReducer;
