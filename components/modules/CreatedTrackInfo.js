import React, { useState, useEffect } from 'react';
import MaskedView from '@react-native-community/masked-view';
import { StyleSheet, Text, View, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as utils from './TrackUtils/utils';
import TrackMaster from './TrackMaster/TrackMaster';
import googlePlaceApi from './googleapis/place';
import PrettyPropInDetail from './PrettyPropInDetail/PrettyPropInDetail';

const styles = StyleSheet.create({
  compactTitleStyle: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    height: '100%',
  },
  trackInfo: {
    position: 'absolute',
    backgroundColor: 'white',
    width: Dimensions.get('screen').width - 80,
    top: 20,
    marginHorizontal: 40,
    paddingBottom: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 50,
  },
  trackTitleStyle: {
    backgroundColor: 'dodgerblue',
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 5,
    marginBottom: 5,
  },
  editCompleteButtonContainer: {
    position: 'absolute',
    top: '85%',
    alignSelf: 'center',
    elevation: 10,
    zIndex: 10,
  },
  editCompleteButton: {
    backgroundColor: '#03D6A7',
    padding: 18,
    width: 200,
    alignItems: 'center',
    borderRadius: 15,
  },
});

const CreatedTrackInfo = ({ data }) => {
  if (!data) return <Text>트랙 데이터가 없습니다.</Text>;
  const {origin, destination, route, trackLength, trackTitle} = data;
  const [originInfo, setOriginInfo] = useState('');
  const [destinationInfo, setDestinationInfo] = useState('');

  const navigation = useNavigation();

  const confirmTrack = () => {
    navigation.navigate('TrackManagerTabs');
  };

  useEffect(() => {
    googlePlaceApi.getNearestAddr(origin)
      .then((addr) => setOriginInfo(addr));
    googlePlaceApi.getNearestAddr(destination)
      .then((addr) => setDestinationInfo(addr));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.trackInfo}>
        <View style={styles.trackTitleStyle}>
          <Text style={styles.compactTitleStyle}>{trackTitle}</Text>
        </View>
        <View>
          <PrettyPropInDetail name="길이" value={utils.prettyLength(trackLength)} />
          <PrettyPropInDetail name="출발점" value={originInfo} />
          <PrettyPropInDetail name="도착점" value={destinationInfo} />
          <PrettyPropInDetail name="시간(남)" value={utils.predictDuration(trackLength, 'm')} />
          <PrettyPropInDetail name="시간(여)" value={utils.predictDuration(trackLength, 'f')} />
        </View>
      </View>
      <View style={styles.editCompleteButtonContainer}>
        <TouchableOpacity onPress={confirmTrack} style={styles.editCompleteButton}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
            확인
          </Text>
        </TouchableOpacity>
      </View>
      <TrackMaster mode="trackViewer" tracks={[data]} initialCamera={origin} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.createdTrackInfo.track,
  };
};

export default connect(mapStateToProps, null)(CreatedTrackInfo);
