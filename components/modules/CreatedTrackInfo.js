import React, { useState, useEffect } from 'react';
import MaskedView from '@react-native-community/masked-view';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as utils from './TrackUtils/utils';
import TrackMaster from './TrackMaster/TrackMaster';
import googlePlaceApi from './googleapis/place';

const CreatedTrackInfo = ({ data }) => {
  if (!data) return <Text>트랙 데이터가 없습니다.</Text>;
  const {origin, destination, route, trackLength, trackTitle} = data;
  const [originInfo, setOriginInfo] = useState('');
  const [destinationInfo, setDestinationInfo] = useState('');

  useEffect(() => {
    googlePlaceApi.getNearestAddr(origin)
      .then((addr) => setOriginInfo(addr));
    googlePlaceApi.getNearestAddr(destination)
      .then((addr) => setDestinationInfo(addr));
  }, []);

  const compactDesContainerStyle = {
    flexDirection: 'row',
  };
  const compactDesTitleStyle = {
    fontSize: 12,
    flexBasis: 80,
  };
  const compactDesContentStyle = {
    fontSize: 12,
    flex: 1,
  };

  return (
    <View style={{ backgroundColor: 'white', elevation: 1, flex: 1 }}>
      <View style={{ margin: 20, marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{trackTitle}</Text>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 0, marginBottom: 0, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
        <View style={compactDesContainerStyle}>
          <Text style={compactDesTitleStyle}>코스 길이</Text>
          <Text style={compactDesContentStyle}>{utils.prettyLength(trackLength)}</Text>
        </View>
        <View style={compactDesContainerStyle}>
          <Text style={compactDesTitleStyle}>소요 시간(남)</Text>
          <Text style={compactDesContentStyle}>{utils.predictDuration(trackLength, 'm')}</Text>
        </View>
        <View style={compactDesContainerStyle}>
          <Text style={compactDesTitleStyle}>소요 시간(여)</Text>
          <Text style={compactDesContentStyle}>{utils.predictDuration(trackLength, 'f')}</Text>
        </View>
        <View style={compactDesContainerStyle}>
          <Text style={compactDesTitleStyle}>시작 지점</Text>
          <Text style={compactDesContentStyle}>{originInfo}</Text>
        </View>
        <View style={compactDesContainerStyle}>
          <Text style={compactDesTitleStyle}>도착 지점</Text>
          <Text style={compactDesContentStyle}>{destinationInfo}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TrackMaster
          mode="trackViewer"
          tracks={[data]}
          initialCamera={origin}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.createdTrackInfo.track,
  };
};

export default connect(mapStateToProps, null)(CreatedTrackInfo);

const styles = StyleSheet.create({});
