import { combineReducers } from 'redux';
import myPageReducer from './myPage';
import trackMasterReducer from './TrackMaster';

const rootReducer = combineReducers({
  myPage: myPageReducer,
  trackMaster: trackMasterReducer,
});

export default rootReducer;
