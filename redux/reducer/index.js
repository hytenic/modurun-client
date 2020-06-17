import { combineReducers } from 'redux';
import myPageReducer from './myPage';
import trackMasterReducer from './TrackMaster';
import singleTrackViewerReducer from './SingleTrackViewer';

const rootReducer = combineReducers({
  myPage: myPageReducer,
  trackMaster: trackMasterReducer,
  SingleTrackViewer: singleTrackViewerReducer,
});

export default rootReducer;
