import React, { useState, useEffect } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import styles from './style';
import TrackMaster from '../TrackMaster/TrackMaster';
import customizingDateAndTime from '../utils';
import DateTimePickerCompoment from '../DateTimePicker';
import postSchedule from '../API/schedule';

const Scheduler = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [estimateTime, setEstimiateTime] = useState(0);
  const [estimateMin, setEstimateMin] = useState(0);
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [timePickerShow, setTimePickerShow] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');
  const [selectedTrack, setSelectedTrack] = useState(false);

  const PickerComponent = ({ value, mode, setAction }) => (
    <TouchableOpacity
      style={styles.picker}
      onPress={() => {
        setPickerMode(mode);
        setAction(true);
      }}
    >
      <Text style={styles.pickerText}>{value}</Text>
      {
        mode === 'date'
          ? (
            <Image
              source={require('../../../assets/calendar_icon.png')}
              style={styles.icon}
            />
          )
          : (
            <Image
              source={require('../../../assets/clock_icon.png')}
              style={styles.icon}
            />
          )
      }
    </TouchableOpacity>
  );

  const ButtonComponent = ({ value, pressEvent }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        pressEvent();
      }}
    >
      <Text style={{ color: 'white' }}>{value}</Text>
    </TouchableOpacity>
  );

  const sendInfo = async () => {
    const createdScheduleInfo = {
      title,
      date: moment(date).format('MM-DD'),
      startTime: moment(startTime).format('HH:mm'),
      estimateTime,
      estimateMin,
      selectedTrack,
    };
    // const scheduleInfo = {
    //   title,
    //   date: moment(date).format('MM-DD'),
    //   startTime: moment(startTime).format('HH:mm'),
    //   estimateTime,
    //   estimateMin,
    //   selectedTrack,
    // };
    // console.log(date);
    let scheduleInfo = null;
    try {
      scheduleInfo = await postSchedule(createdScheduleInfo);
    } catch (e) {
      console.log(e);
    }
    console.log(scheduleInfo);
    navigation.navigate('CreatedScheduleInfo', {
      scheduleInfo,
    });
  };

  const toMyTrackList = () => {
    navigation.navigate('MyTrackList', {
      setAction: setSelectedTrack,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TextInput
        placeholder="타이틀을 입력해주세요"
        style={styles.titleInputBox}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <View style={styles.pickerView}>
        <Text style={styles.pickerTitle}>시작 일시</Text>
        <PickerComponent value={customizingDateAndTime(date, 0)} mode="date" setAction={setDatePickerShow} />
        <PickerComponent value={customizingDateAndTime(0, startTime)} mode="time" setAction={setTimePickerShow} />
      </View>
      <View style={styles.pickerView}>
        <Text style={styles.pickerTitle}>소요 시간</Text>
        <TextInput style={styles.timeInput} placeholder="시간" keyboardType="numeric" onChangeText={(time) => setEstimiateTime(time)} />
        <Text style={{ alignSelf: 'center' }}>시간</Text>
        <TextInput style={styles.timeInput} placeholder="분" keyboardType="numeric" onChangeText={(time) => setEstimateMin(time)} />
        <Text style={{ alignSelf: 'center' }}>분</Text>
      </View>

      {
          selectedTrack
            ? (
              <View style={styles.selectedTrack}>
                <TrackMaster
                  mode="trackViewer"
                  tracks={[selectedTrack]}
                  initialCamera={selectedTrack.origin}
                />
              </View>
            )
            : (
              <View style={styles.unSelectedTrack}>
                <Image
                  source={require('../../../assets/unselectedTrack_image.png')}
                  style={{ height: 250, width: 260 }}
                />
              </View>
            )
        }

      <View style={styles.footer}>
        <ButtonComponent value="트랙 선택" pressEvent={toMyTrackList} />
        <ButtonComponent value="제작 완료" pressEvent={sendInfo} />
      </View>
      {
          datePickerShow
            ? (
              <DateTimePickerCompoment
                setAction={setDate}
                type={pickerMode}
                setShow={setDatePickerShow}
              />
            )
            : <></>
        }
      {
          timePickerShow
            ? (
              <DateTimePickerCompoment
                setAction={setStartTime}
                type={pickerMode}
                setShow={setTimePickerShow}
              />
            )
            : <></>
        }
    </View>
  );
};

export default Scheduler;
