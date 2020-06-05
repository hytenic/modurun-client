import React from 'react';
import {
  StyleSheet, Text, Button, View,
} from 'react-native';

const Developer = ({ navigation }) => {
  const pages = [
    'TrackMaster',
    'FilterModal',
    'TrackList',
    'CreatedTrackInfo',
    'TrackManagerTab',
    'SignUpManager',
    'SignInManager',
    'Header',
    'ScheduleList',
    'SideBar',
    'Scheduler',
    'SeletedTrackInfo',
    'CreatedScheduleInfo',
    'TrackCreator',
    'ScheduleManager',
    'ChatRoom',
    'MyPage',
  ];
  return (
    <View>
      {pages.map((page) => (
        <Button
          key={page}
          title={page}
          onPress={() => navigation.navigate(page)}
        />
      ))}
    </View>
  );
};

export default Developer;

const styles = StyleSheet.create({});
