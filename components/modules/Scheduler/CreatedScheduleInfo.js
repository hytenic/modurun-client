import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackMaster from '../TrackMaster/TrackMaster';
import { customizingDateAndTime, meterToKilo, createdScheduleInfo } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    padding: 15,
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 24,
  },
  trackTitle: {
    paddingLeft: 15,
    paddingTop: 15,
  },
  scheduleInfo: {
    flex: 2.5,
  },
  infoTitle: {
    fontSize: 18,
  },
  infoDetail: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapView: {
    flex: 5.5,
    backgroundColor: 'green',
  },
  footer: {
    marginTop: 10,
    flex: 0.5,
    alignItems: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'gray',
  },
});

const CreatedScheduleInfo = ({ route }) => {
  const { schedule, track } = createdScheduleInfo(route.params.completeData);

  const date = customizingDateAndTime(schedule.scheduleFrom, 0);
  const timeFrom = customizingDateAndTime(0, schedule.scheduleFrom);
  const timeTo = customizingDateAndTime(0, schedule.scheduleTo);
  const distance = meterToKilo(track.trackLength);
  const navigation = useNavigation();

  const goToMainPage = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.scheduleTitle}>{schedule.title}</Text>
        <Text style={styles.trackTitle}>{track.trackTitle}</Text>
      </View>
      <View style={styles.scheduleInfo}>
        <View style={styles.infoDetail}>
          <Text style={styles.infoTitle}>일시</Text>
          <Text>{`${date} ${timeFrom} ~ ${timeTo}`}</Text>
        </View>
        <View style={styles.infoDetail}>
          <Text style={styles.infoTitle}>거리</Text>
          <Text>{distance}km</Text>
        </View>
      </View>
      <View style={styles.mapView}>
        <TrackMaster
          mode="trackViewer"
          tracks={[track]}
          initialCamera={track.origin}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={goToMainPage}>
          <Text>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatedScheduleInfo;
