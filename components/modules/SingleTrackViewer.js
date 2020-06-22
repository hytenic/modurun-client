import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TrackMaster from './TrackMaster/TrackMaster';
import PrettyProp from './PrettyProp/PrettyProp';
import * as trackUtils from './TrackUtils/utils';

const SingleTrackViewer = ({ data }) => {
  if (!data) return <></>;
  const {trackLength, origin, destination, trackTitle} = data;
  return (
    <View style={{ flex: 1 }}>
      <TrackMaster
        mode="trackViewer"
        tracks={[data]}
        initialCamera={origin}
      />
      <ScrollView style={{ flex: 0.7 }}>
        <View style={{ backgroundColor: 'dodgerblue' }}>
          <Text style={{ fontSize: 20, padding: 10, color: 'white' }}>{trackTitle}</Text>
        </View>
        <View style={{ padding: 10 }}>
          <PrettyProp name="거리" value="유저 현 위치랑 오리진 비교해서 구해야 됨" color="rgba(66, 135, 245, 1)" />
          <PrettyProp name="길이" value={trackUtils.prettyLength(trackLength)} color="rgba(123, 66, 245, 1)" />
          <PrettyProp name="출발점" value={JSON.stringify(origin)} color="rgba(191, 59, 209, 1)" />
          <PrettyProp name="도착점" value={JSON.stringify(destination)} color="rgba(209, 59, 151, 1)" />
          <PrettyProp name="시간(남)" value={trackUtils.predictDuration(trackLength, 'm')} color="rgba(59, 217, 217, 1)" />
          <PrettyProp name="시간(여)" value={trackUtils.predictDuration(trackLength, 'f')} color="rgba(60, 181, 100, 1)" />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  data: state.singleTrackViewer.trackData,
});

export default connect(mapStateToProps, null)(SingleTrackViewer);
