import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import ScheduleListEntry from './ScheduleList/ScheduleListEntry';

const ScheduleList = ({schedules}) => {

  if (!schedules.length) return <></>;

  return (
    <ScrollView style={{borderTopWidth:1}}>
      {schedules.map((schedule) => <ScheduleListEntry data={schedule} />)}
    </ScrollView>
  );
};

ScheduleList.defaultProps = {
  schedules: [],
};

export default ScheduleList;

const styles = StyleSheet.create({});
