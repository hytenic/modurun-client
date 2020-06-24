import React from 'react';
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TrackListEntry from './TrackList/TrackListEntry';

const anyOfKeyIsFalsy = (object, keys) => {
  for (let i = 0; i < keys.length; i += 1) {
    if (!object[keys[i]]) return true;
  }
  return false;
};

const TrackList = ({ tracks, showBookmark, showAdd }) => {
  if (!tracks) return <></>;
  if (!tracks.length) return <></>;

  const filteredTracks = tracks.filter((track) => !anyOfKeyIsFalsy(track, ['destination', 'origin', 'route']));

  return (
    <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.05)'}}>
      <StatusBar />
      {filteredTracks.map((track) => (
        <TrackListEntry
          key={track.trackTitle}
          showBookmark={showBookmark}
          showAdd={showAdd}
          data={track}
        />
      ))}
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

export default TrackList;
