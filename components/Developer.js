import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View, ScrollView,
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
    'MainHeader',
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
