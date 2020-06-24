import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TrackMaster from './TrackMaster/TrackMaster';
import PrettyPropInDetail from './PrettyPropInDetail/PrettyPropInDetail';
import * as trackUtils from './TrackUtils/utils';
import googlePlaceApi from './googleapis/place';

const trackInfo = {
  position: 'absolute',
  backgroundColor: 'white',
  paddingBottom: 5,
  borderRadius: 15,
  margin: 10,
  shadowColor: '#000',
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 0.4,
  shadowRadius: 3,
  elevation: 50,
};

const trackTitleStyle = {
  backgroundColor: 'dodgerblue',
  height: '12%',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  padding: 5,
  marginBottom: 5,
  textAlignVertical: 'center',
  textAlign: 'center',
};

const SingleTrackViewerInDetail = ({ data }) => {
  if (!data) return <></>;
  const {trackLength, origin, destination, trackTitle} = data;

  const [originInfo, setOriginInfo] = useState('');
  const [destinationInfo, setDestinationInfo] = useState('');
  useEffect(() => {
    googlePlaceApi.nearestPlace(origin).then((nearestPlace) => {
      setOriginInfo(nearestPlace.vicinity);
    });
    googlePlaceApi.nearestPlace(destination).then((nearestPlace) => {
      setDestinationInfo(nearestPlace.vicinity);
    });
  }, [data]);
  return (
    <View style={{ flex: 1 }}>
      <TrackMaster
        mode="trackViewer"
        tracks={[data]}
        initialCamera={origin}
      />
      <View style={trackInfo}>
        <View style={trackTitleStyle}>
          <Text style={{ fontSize: 13, color: 'white', textAlign: 'center', fontWeight: 'bold'}}>{trackTitle}</Text>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10, width: 180 }}>
          <PrettyPropInDetail name="거리" value="5km" />
          <PrettyPropInDetail name="길이" value={trackUtils.prettyLength(trackLength)} />
          <PrettyPropInDetail name="출발점" value={originInfo} />
          <PrettyPropInDetail name="도착점" value={destinationInfo} />
          <PrettyPropInDetail name="시간(남)" value={trackUtils.predictDuration(trackLength, 'm')} />
          <PrettyPropInDetail name="시간(여)" value={trackUtils.predictDuration(trackLength, 'f')} />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  data: state.singleTrackViewer.trackData,
});

export default connect(mapStateToProps, null)(SingleTrackViewerInDetail);