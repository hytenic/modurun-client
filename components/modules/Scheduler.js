import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image,
} from 'react-native';
import moment from 'moment';
import { customizingDateAndTime } from './utils';
import { DateTimePickerCompoment } from './DateTimePicker';

const ButtonComponent = ({ value }) => (
  <TouchableOpacity style={styles.button}>
    <Text style={{ color: 'white' }}>{value}</Text>
  </TouchableOpacity>
);

const Scheduler = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [estimateTime, setEstimiateTime] = useState(0);
  const [estimateMin, setEstimateMin] = useState(0);
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [timePickerShow, setTimePickerShow] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');
  const [courseSelected, setCourseSelected] = useState(false);

  const DatePickerCompoment = ({ style, value }) => (
    <TouchableOpacity
      style={style}
      onPress={() => {
        console.log('DatePickerCompoment');
        setPickerMode('date');
        setDatePickerShow(true);
      }}
    >
      <Text style={styles.pickerText}>{value}</Text>
      <Image
        source={require('../../assets/calendar_icon.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );

  const TimePickerComponent = ({ value }) => (
    <TouchableOpacity
      style={styles.picker}
      onPress={() => {
        console.log('TimePickerCompoment');
        setPickerMode('time');
        setTimePickerShow(true);
      }}
    >
      <Text style={styles.pickerText}>{value}</Text>
      <Image
        source={require('../../assets/clock_icon.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );


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
        <DatePickerCompoment value={customizingDateAndTime(moment(date).format('M-D'), 0)} style={styles.picker} />
        <TimePickerComponent value={customizingDateAndTime(0, moment(startTime).format('HH:mm:ss'))} />
      </View>
      <View style={styles.pickerView}>
        <Text style={styles.pickerTitle}>소요 시간</Text>
        <TextInput style={styles.timeInput} placeholder="시간" keyboardType="numeric" onChangeText={(time) => setEstimiateTime(time)} />
        <Text style={{ alignSelf: 'center' }}>시간</Text>
        <TextInput style={styles.timeInput} placeholder="분" keyboardType="numeric" onChangeText={(time) => setEstimateMin(time)} />
        <Text style={{ alignSelf: 'center' }}>분</Text>
      </View>
      <View style={styles.selectedCourse}>
        <Text>선택된 코스가 없습니다.</Text>
      </View>
      <View style={styles.footer}>
        <ButtonComponent value="코스 선택" />
        <ButtonComponent
          value="완료"
          onPress={() => {
            const obj = {
              title,
              date,
              startTime,
              estimateTime,
              estimateMin,
              courseSelected,
            };
            console.log(obj);
          }}
        />
      </View>
      {
          datePickerShow
            ? (
              <DateTimePickerCompoment setAction={setDate} type={pickerMode} setShow={setDatePickerShow} />
            )
            : <></>
        }
      {
          timePickerShow
            ? (
              <DateTimePickerCompoment setAction={setStartTime} type={pickerMode} setShow={setTimePickerShow} />
            )
            : <></>
        }
    </View>
  );
};

export default Scheduler;

const styles = StyleSheet.create({
  titleInputBox: {
    borderWidth: 0.5,
    backgroundColor: '#e3dede',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30,
    height: 50,
  },
  pickerView: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    // alignContent: 'center',
  },
  pickerTitle: {
    backgroundColor: '#e3dede',
    padding: 5,
    alignItems: 'center',
    fontSize: 15,
    borderRadius: 8,
  },
  picker: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 8,
    width: 120,
    marginLeft: 20,
  },
  pickerText: {
    // backgroundColor: 'green',
    padding: 5,
    marginLeft: 10,
    width: 80,
  },
  icon: {
    // backgroundColor: 'blue',
    width: 25,
    height: 25,
    marginTop: 2,
    // marginLeft: 3,
  },
  selectedCourse: {
    backgroundColor: '#e3dede',
    margin: 30,
    width: 300,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: '#4FB0C6',
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    width: 80,
    alignItems: 'center',
  },
  timeInput: {
    marginLeft: 10,
    width: 100,
    height: 40,
    alignSelf: 'center',
  },
});
