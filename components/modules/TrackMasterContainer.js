/* eslint-disable react/jsx-props-no-spreading */
import {
  StyleSheet, Text, View, TouchableOpacity, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as createdTrackInfoActions from '../../redux/action/CreatedTrackInfo/creator';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrackMaster from './TrackMaster/TrackMaster';
import utils from './TrackMaster/utils';
import dummyTracks from './TrackMaster/dummyData/dummyTracks.json';
import dummySchedules from './TrackMaster/dummyData/dummySchedules.json';

const { logStringified } = utils;

const styles = {
  modeSelector: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 5,
      borderBottomWidth: 1,
    },
  },
  arrow: {
    container: {
      flex: 1,
    },
    icon: {
      textAlign: 'center',
      backgroundColor: 'dodgerblue',
      padding: 10,
      color: 'white',
      borderRadius: 10,
    },
  },
  modeText: {
    backgroundColor: 'dodgerblue',
    flex: 1,
    padding: 10,
    margin: 10,
    color: 'white',
    borderRadius: 10,
    textAlign: 'center',
  },
};

function TrackMasterContainer({ mode, updateCreatedTrack }) {
  const navigation = useNavigation();
  const [modeIndex, setModeIndex] = useState(0);
  const modes = ['trackViewer', 'scheduleViewer', 'trackEditor'];
  const curMode = modes[modeIndex];
  const next = () => setModeIndex(modeIndex === modes.length - 1 ? 0 : modeIndex + 1);
  const prev = () => setModeIndex(modeIndex === 0 ? modes.length - 1 : modeIndex - 1);

  const modeSelector = (
    <View style={styles.modeSelector.container}>
      <TouchableOpacity onPress={prev} style={styles.arrow.container}>
        <Icon name="arrow-left" size={20} style={styles.arrow.icon} />
      </TouchableOpacity>

      <Text style={styles.modeText}>{modes[modeIndex]}</Text>

      <TouchableOpacity onPress={next} style={styles.arrow.container}>
        <Icon name="arrow-right" size={20} style={styles.arrow.icon} />
      </TouchableOpacity>
    </View>
  );
  const [region, setRegion] = useState();
  const renderTrackMaster = (mode) => {
    if (mode === 'trackViewer') {
      return (
        <TrackMaster
          mode={mode}
          onRegionChange={(region) => {console.log(region)}} // 화면이 이동할 때마다 "현재 영역에 존재하는 트랙을 가져오는 액션"이 일어나야 합니다.
          onTrackSelected={(track) => { logStringified(track); }}
          tracks={dummyTracks}
          // initialCamera={{}}
        />
      );
    }
    if (mode === 'trackEditor') {
      return (
        <TrackMaster
          mode={mode}
          onCompleteEdit={(track) => {
            updateCreatedTrack(track);
            navigation.navigate('CreatedTrackInfo');
          }}
        />
      );
    }
    if (mode === 'scheduleViewer') {
      return (
        <TrackMaster
          mode={mode}
          onRegionChange={(region) => {console.log(region)}} // 화면이 이동할 때마다 "현재 영역에 존재하는 스케줄을 가져오는 액션"이 일어나야 합니다.
          onTrackSelected={(schedules) => {console.log(schedules)}}
          schedules={dummySchedules}
          // initialCamera={{}}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      {modeSelector}
      <View style={{ flex:1 }}>
        {renderTrackMaster(curMode)}
      </View>
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCreatedTrack: (track) => dispatch(createdTrackInfoActions.setCreatedTrack(track)),
  };
};

export default connect(null, mapDispatchToProps)(TrackMasterContainer);
