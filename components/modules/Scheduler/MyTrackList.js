import React from 'react';
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TrackListEntry from './MyTrackListEntry';
import dummyTracks from '../TrackMaster/dummyData/dummyTracks.json';

const MyTrackList = ({ tracks, showBookmark, showAdd, route }) => {
  const { setAction, scheduleInfo } = route.params;
  tracks = dummyTracks;
  if (!tracks) return <></>;
  if (!tracks.length) return <></>;
  return (
    <ScrollView>
      <StatusBar />
      {tracks.map((track) => (
        <TrackListEntry
          key={track.trackTitle}
          data={track}
          setAction={setAction}
          scheduleInfo={scheduleInfo}
        />
      ))}
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

export default MyTrackList;
