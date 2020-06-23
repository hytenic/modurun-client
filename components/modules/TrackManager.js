import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import dummyTracks from './TrackMaster/dummyData/dummyTracks.json';
import TrackList from './TrackList';
import FindTrack from './TrackManager/FindTrack';
import TrackEditor from './TrackManager/TrackEditor';

const TrackManager = () => {
  const [selectedMenu, setSelectedMenu] = useState('myTrack');
  const tranlateButtonNameToKor = {
    myTrack: '내 코스',
    findTrack: '주변 코스',
    createTrack: '코스 제작',
  };

  const colorForMenu = {
    myTrack: '#1E90FF',
    findTrack: '#1E90FF',
    createTrack: '#1E90FF',
  };

  const MenuBarButton = (name, onPress = () => {}) => (
    <View style={{
      flex: 1, backgroundColor: selectedMenu === name ? 'white' : 'transparent', zIndex: selectedMenu === name ? 100 : 0,
    }}
    >
      <TouchableOpacity style={{ padding: 10, backgroundColor: selectedMenu === name ? colorForMenu[name] : 'white', alignItems: 'center' }} onPress={onPress}>
        <Text style={{ fontSize: 18, color: selectedMenu === name ? 'white' : '#1E90FF' }}>{tranlateButtonNameToKor[name]}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMenuBody = (menu) => {
    let renderTarget;
    if (menu === 'myTrack') {
      renderTarget = (
        <TrackList tracks={dummyTracks} showBookmark />
      );
    }
    if (menu === 'findTrack') {
      renderTarget = (
        <FindTrack tracks={dummyTracks} />
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

export default TrackManager;

const styles = StyleSheet.create({});
