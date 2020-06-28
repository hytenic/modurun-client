import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import MyScheduleListEntry from './MyScheduleListEntry';

const MyScheduleList = ({ schedules }) => (
  <View>
    <ScrollView style={{ backgroundColor: '#2196f3' }}>
      {schedules.map((schedule, i) => (
        <MyScheduleListEntry key={i} data={schedule} />
      ))}
      <View style={{ height: 150 }} />
    </ScrollView>
  </View>
);

export default MyScheduleList;
