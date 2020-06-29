import React from 'react';
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TrackListEntry from './TrackList/TrackListEntry';

const anyOfKeyIsFalsy = (object, keys) => {
  for (let i = 0; i < keys.length; i += 1) {
    if (!object[keys[i]]) return true;
  }
  return false;
};

const TrackList = ({ tracks, showBookmark, showAdd, getMyTracks, setTabIndex }) => {

  const alertNoTrack = () => (
    <View style={{ margin: 20, backgroundColor: 'white', elevation: 3, borderRadius: 10, height: 200, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey', textAlign: 'center' }}>추가한 코스가 없습니다</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>먼저 코스를 추가해볼까요?</Text>
      <TouchableOpacity onPress={() => setTabIndex(1)} style={{padding: 10, backgroundColor: 'dodgerblue', borderRadius: 10, margin: 10, paddingHorizontal: 20 }}>
        <Text style={{ color: 'white' }}>코스 찾기</Text>
      </TouchableOpacity>
    </View>
  );

  if (!tracks) return <></>;
  if (!tracks.length) return alertNoTrack();

  const filteredTracks = tracks.filter((track) => !anyOfKeyIsFalsy(track, ['destination', 'origin', 'route']));

  return (
    <ScrollView
      style={{
        backgroundColor: '#1E90FF',
      }}
    >
      <StatusBar />
      {filteredTracks.map((track) => (
        <TrackListEntry
          key={track.id}
          showBookmark={showBookmark}
          showAdd={showAdd}
          data={track}
          getMyTracks={getMyTracks}
        />
      ))}
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

export default TrackList;
