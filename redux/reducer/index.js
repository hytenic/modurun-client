import { combineReducers } from 'redux';
import myPageReducer from './myPage';
import trackMasterReducer from './TrackMaster';
import singleTrackViewerReducer from './SingleTrackViewer';
import createdTrackInfoReducer from './CreatedTrackInfo';
import chatRommReducer from './ChatRoom';
import trackManagerReducer from './TrackManager';
import userReducer from './User';
import productionNavReducer from './ProductionNav';

const rootReducer = combineReducers({
  myPage: myPageReducer,
  trackMaster: trackMasterReducer,
  singleTrackViewer: singleTrackViewerReducer,
  createdTrackInfo: createdTrackInfoReducer,
  chatRoom: chatRommReducer,
  trackManager: trackManagerReducer,
  userInfo: userReducer,
  productionNav: productionNavReducer,
});

export default rootReducer;
