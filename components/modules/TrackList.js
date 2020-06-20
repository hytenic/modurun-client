import React from 'react';
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TrackListEntry from './TrackList/TrackListEntry';
import dummyTracks from './TrackMaster/dummyData/dummyTracks.json';

const TrackList = ({ tracks, showBookmark, showAdd }) => {
  tracks = dummyTracks;
  if (!tracks) return <></>;
  if (!tracks.length) return <></>;
  return (
    <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.05)'}}>
      <StatusBar />
      {tracks.map((track) => (
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
