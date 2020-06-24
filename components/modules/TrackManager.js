import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import TrackList from './TrackList';
import FindTrack from './TrackManager/FindTrack';
import TrackEditor from './TrackManager/TrackEditor';
import trackManagerActions from '../../redux/action/TrackManager/creator';
import modurunAPI from './API';
import trackManagerUtils from './TrackManager/utils';

const TrackManager = ({ myTracks, foundTracks, dispatch }) => {
  const [selectedMenu, setSelectedMenu] = useState('myTrack');

  const getMyTracks = () => {
    // if (myTracks.length) return;
    modurunAPI.tracks.getMyTracks()
      .then((res) => res.json())
      .then((json) => {
        dispatch(trackManagerActions.setMyTrack(json));
      });
  };

  // trackId: 30,

  const getTracks = (filter) => {
    // if (foundTracks.length) return;
    trackManagerUtils.getUserPos()
      .then((userPos) => {
        modurunAPI.tracks.getTracks(filter, userPos, trackManagerUtils.getBigArea(userPos))
          .then((res) => res.json())
          .then((json) => {
            dispatch(trackManagerActions.setFoundTracks(json));
          });
      });
  };

  useEffect(() => {
    getMyTracks();
  }, []);

  const tranlateButtonNameToKor = {
    myTrack: '내 코스',
    findTrack: '주변 코스',
    createTrack: '코스 제작',
  };

  const colorForMenu = {
    myTrack: 'white',
    findTrack: 'white',
    createTrack: 'white',
  };

  const MenuBarButton = (name, onPress = () => {}) => (
    <View style={{
      flex: 1, backgroundColor: selectedMenu === name ? 'white' : 'transparent', zIndex: selectedMenu === name ? 100 : 0,
    }}
    >
      <TouchableOpacity style={{ padding: 10, backgroundColor: selectedMenu === name ? colorForMenu[name] : 'lightgrey', alignItems: 'center' }} onPress={onPress}>
        <Text style={{ fontSize: 18, color: selectedMenu === name ? 'black' : 'white' }}>{tranlateButtonNameToKor[name]}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMenuBody = (menu) => {
    let renderTarget;
    if (menu === 'myTrack') {
      renderTarget = (
        <TrackList tracks={myTracks} showBookmark />
      );
    }
    if (menu === 'findTrack') {
      renderTarget = (
        <FindTrack onFilterSet={getTracks} tracks={foundTracks} />
      );
    }
    if (menu === 'createTrack') {
      renderTarget = (
        <TrackEditor />
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: colorForMenu[menu] }}>
        {renderTarget}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        {MenuBarButton('myTrack', () => setSelectedMenu('myTrack'))}
        {MenuBarButton('findTrack', () => setSelectedMenu('findTrack'))}
        {MenuBarButton('createTrack', () => setSelectedMenu('createTrack'))}
      </View>
      {renderMenuBody(selectedMenu)}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    myTracks: state.trackManager.myTracks,
    foundTracks: state.trackManager.foundTracks,
  };
};

export default connect(mapStateToProps, null)(TrackManager);
