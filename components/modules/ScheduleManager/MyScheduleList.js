import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import MyScheduleListEntry from './MyScheduleListEntry';

const MyScheduleList = ({ schedules }) => (
  <View style={{height: Dimensions.get('window').height}}>
    <ScrollView style={{ backgroundColor: '#2196f3' }}>
      {schedules.map((schedule) => (
        <MyScheduleListEntry key={schedule.id} data={schedule} />
      ))}
      <View style={{ height: 150 }} />
    </ScrollView>
  </View>
);

export default MyScheduleList;
