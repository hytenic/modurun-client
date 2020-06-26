import React, { useState } from 'react'
import { View, Text, StatusBar } from 'react-native'
import TrackMaster from './TrackMaster/TrackMaster';
import dummySchedules from './TrackMaster/dummyData/dummySchedules.json';
import ScheduleList from './ScheduleList';

const Main_ScheduleList_Test = () => {
  const [selectedSchedules, setSelectedSchedules] = useState([])
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="grey"/>
      <View style={{ flex: 1 }}>
        <TrackMaster
          mode="scheduleViewer"
          onRegionChange={(region) => {}} // 화면이 이동할 때마다 "현재 영역에 존재하는 스케줄을 가져오는 액션"이 일어나야 합니다.
          onTrackSelected={(schedules) => setSelectedSchedules(schedules)}
          schedules={dummySchedules}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScheduleList schedules={selectedSchedules} />
      </View>
    </View>
  );
};

export default Main_ScheduleList_Test
