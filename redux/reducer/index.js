import { combineReducers } from 'redux';
import trackMasterReducer from './TrackMaster';
import singleTrackViewerReducer from './SingleTrackViewer';
import createdTrackInfoReducer from './CreatedTrackInfo';
import chatRommReducer from './ChatRoom';
import trackManagerReducer from './TrackManager';
import userReducer from './User';
import productionNavReducer from './ProductionNav';

const rootReducer = combineReducers({
  trackMaster: trackMasterReducer,
  singleTrackViewer: singleTrackViewerReducer,
  createdTrackInfo: createdTrackInfoReducer,
  chatRoom: chatRommReducer,
  trackManager: trackManagerReducer,
  userInfo: userReducer,
  productionNav: productionNavReducer,
});

export default rootReducer;
