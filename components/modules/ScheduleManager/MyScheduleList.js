import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import MyScheduleListEntry from './MyScheduleListEntry';

const MyScheduleList = ({schedules}) => {
  return (
    <ScrollView>
      {schedules.map((schedule, i) => (
        <MyScheduleListEntry key={i} data={schedule} />
      ))}
    </ScrollView>
  );
};

export default MyScheduleList;
