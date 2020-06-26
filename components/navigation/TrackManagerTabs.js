import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TrackManager from '../modules/TrackManager';

const initialLayout = { width: Dimensions.get('window').width };

const MyTrack = (props) => <TrackManager type="myTrack" {...props} />;
const FindTrack = (props) => <TrackManager type="findTrack" {...props} />;
const TrackEditor = (props) => <TrackManager type="createTrack" {...props} />;

const TrackManagerTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [swipeEnabled, setSwipeEnabled] = React.useState(true);
  const [routes] = React.useState([
    { key: 'myTrackScreen', title: '코스 제작' },
    { key: 'findTrackScreen', title: '코스 찾기' },
    { key: 'trackEditorScreen', title: '코스 제작' },
  ]);

  const renderScene = ({route}) => {
    if (route.key === 'myTrackScreen') return <MyTrack />;
    if (route.key === 'findTrackScreen') return <FindTrack />;
    if (route.key === 'trackEditorScreen') return <TrackEditor setSwipeEnabled={setSwipeEnabled} />;
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      swipeEnabled={swipeEnabled}
    />
  );
};

export default TrackManagerTabs;
