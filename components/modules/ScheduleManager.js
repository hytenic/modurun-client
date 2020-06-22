import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import MyScheduleList from './ScheduleManager/MyScheduleList';
import dummySchedules from './TrackMaster/dummyData/dummySchedules.json';

const ScheduleManager = () => (
  <View>
    <MyScheduleList schedules={dummySchedules} />
  </View>
);

export default ScheduleManager;
