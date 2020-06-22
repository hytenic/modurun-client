import React, { useState, useEffect } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import TrackMaster from '../TrackMaster/TrackMaster';
import { customizingDateAndTime, getScheduleData } from '../utils';
import DateTimePickerCompoment from '../DateTimePicker';
import { getUserTracks } from '../API/trask';
import { postSchedule } from '../API/schedule';

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

  const sendScheduleInfo = async () => {
    const createdScheduleInfo = {
      title,
      date,
      startTime,
      estimateTime,
      estimateMin,
      selectedTrack,
    };
    const postData = getScheduleData(createdScheduleInfo);
    try {
      const completeData = await postSchedule(postData);
      console.log('completeData ', completeData);
      if (completeData) {
        navigation.navigate('CreatedScheduleInfo', {
          completeData,
        });
      }
    } catch (e) {
      console.log('Scheduler ', e);
    }
  };

  const toMyTrackList = async () => {
    const tracks = await getUserTracks();
    navigation.navigate('MyTrackList', {
      setAction: setSelectedTrack,
      tracks,
    });
  };

  const selected = () => {
    if (selectedTrack) {
      console.log(selectedTrack.trackId);
      return (
        <View style={styles.selectedTrack}>
          <TrackMaster
            mode="trackViewer"
            tracks={[selectedTrack]}
            initialCamera={selectedTrack.origin}
          />
        </View>
      );
    }
  };

  const unSelected = () => {
    if (!selectedTrack) {
      return (
        <View style={styles.unSelectedTrack}>
          <Image
            source={require('../../../assets/unselectedTrack_image.png')}
            style={{ height: 250, width: 260 }}
          />
        </View>
      );
    }
  };

  const datePicker = () => {
    if (datePickerShow && !timePickerShow) {
      return (
        <DateTimePickerCompoment
          setAction={setDate}
          type={pickerMode}
          setShow={setDatePickerShow}
        />
      );
    } if (!datePickerShow && timePickerShow) {
      return (
        <DateTimePickerCompoment
          setAction={setStartTime}
          type={pickerMode}
          setShow={setTimePickerShow}
        />
      );
    }
    return (<></>);
  };

  const onChangeTitle = (text) => {
    setTitle(text);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TextInput
        placeholder="타이틀을 입력해주세요"
        style={styles.titleInputBox}
        onChangeText={onChangeTitle}
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
      {selected()}
      {unSelected()}
      <View style={styles.footer}>
        <ButtonComponent value="트랙 선택" pressEvent={toMyTrackList} />
        <ButtonComponent value="제작 완료" pressEvent={sendScheduleInfo} />
      </View>
      {datePicker()}
    </View>
  );
};

export default Scheduler;
