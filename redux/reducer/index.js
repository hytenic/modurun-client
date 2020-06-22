import { combineReducers } from 'redux';
import myPageReducer from './myPage';
import trackMasterReducer from './TrackMaster';
import singleTrackViewerReducer from './SingleTrackViewer';
import createdTrackInfoReducer from './CreatedTrackInfo';
import chatRommReducer from './ChatRoom';

const rootReducer = combineReducers({
  myPage: myPageReducer,
  trackMaster: trackMasterReducer,
  singleTrackViewer: singleTrackViewerReducer,
  createdTrackInfo: createdTrackInfoReducer,
  chatRoom: chatRommReducer,
});

export default rootReducer;
