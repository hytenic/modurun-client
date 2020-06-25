import React, { useState, useEffect } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Image, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { ScheduleValidationModal } from '../Modal';
import styles from './style';
import TrackMaster from '../TrackMaster/TrackMaster';
import { customizingDateAndTime, getScheduleData } from '../utils';
import DateTimePickerCompoment from '../DateTimePicker';
import { getUserTracks } from '../API/tracks';
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
  const [modal, setModal] = useState(false);

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
      style={value === '코스 선택' ? styles.trackButton : styles.submitButton}
      onPress={() => {
        pressEvent();
      }}
    >
      <Text style={{ color: 'white', fontSize: 16, lineHeight: 50 }}>{value}</Text>
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
    if (title === '') {
      setModal(true);
      return;
    } if (estimateTime === 0 || estimateMin === 0) {
      setModal(true);
      return;
    } if (!selectedTrack) {
      setModal(true);
      return;
    }
    const postData = getScheduleData(createdScheduleInfo);
    try {
      const completeData = await postSchedule(postData);
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

  const scheduleValidation = () => {
    if (title === '') {
      return (
        <ScheduleValidationModal visible={modal} setVisible={setModal} value="일정 제목" />
      );
    } if (estimateTime === 0 || estimateMin === 0) {
      return (
        <ScheduleValidationModal visible={modal} setVisible={setModal} value="소요 시간" />
      );
    } if (!selectedTrack) {
      return (
        <ScheduleValidationModal visible={modal} setVisible={setModal} value="달리고 싶은 트랙" />
      );
    }
  };

  const selected = () => {
    if (selectedTrack) {
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
      <View style={styles.roof} />
      <View style={styles.infoWrapper}>
        <View style={styles.header}>
          <Icon name="pencil" style={styles.titleIcon} size={40} />
          <TextInput
            placeholder="제목을 입력해주세요"
            placeholderTextColor="black"
            style={styles.titleInputBox}
            onChangeText={onChangeTitle}
          />
        </View>
        <View style={styles.pickerView}>
          <Text style={styles.pickerTitle}>시작 일시</Text>
          <PickerComponent value={customizingDateAndTime(date, 0)} mode="date" setAction={setDatePickerShow} />
          <PickerComponent value={customizingDateAndTime(0, startTime)} mode="time" setAction={setTimePickerShow} />
        </View>
        <View style={styles.pickerView}>
          <Text style={styles.pickerTitle}>소요 시간</Text>
          <TextInput style={styles.timeInput} placeholder="시간" placeholderTextColor="black" keyboardType="numeric" onChangeText={(time) => setEstimiateTime(time)} />
          <Text style={{ alignSelf: 'center' }}>시간</Text>
          <TextInput style={styles.timeInput} placeholder="분" placeholderTextColor="black" keyboardType="numeric" onChangeText={(time) => setEstimateMin(time)} />
          <Text style={{ alignSelf: 'center' }}>분</Text>
        </View>
        {selected()}
        {unSelected()}
      </View>
      <View style={styles.footer}>
        <ButtonComponent value="코스 선택" pressEvent={toMyTrackList} />
        <ButtonComponent value="제작 완료" pressEvent={sendScheduleInfo} />
      </View>
      {datePicker()}
      {scheduleValidation()}
    </View>
  );
};

export default Scheduler;
