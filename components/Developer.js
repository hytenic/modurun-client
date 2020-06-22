import React, { useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert,
} from 'react-native';

const Developer = ({ navigation }) => {
  const pages = [
    'TestLogin',
    'APITester',
    'Main',
    'TrackMaster',
    'FilterModal',
    'TrackList',
    'CreatedTrackInfo',
    'TrackManagerTab',
    'SignUpManager',
    'SignInManager',
    'TrackManager',
    'ScheduleManager',
    'MainHeader',
    'ScheduleList',
    'SideBar',
    'Scheduler',
    'SelectedTrackInfo',
    'SingleTrackViewer',
    'CreatedScheduleInfo',
    'TrackCreator',
    'ChatRoom',
    'MyPage',
    'MainScheduleListTest',
    'Rate',
  ];

  return (
    <ScrollView>
      {pages.map((page) => (
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            backgroundColor: 'green',
            borderWidth: 1,
            borderColor: 'darkgreen',
          }}
          key={page}
          title={page}
          onPress={() => navigation.navigate(page)}
        >
          <Text style={{
            color: 'white',
            alignSelf: 'center',
          }}
          >
            {page}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Developer;

const styles = StyleSheet.create({});
