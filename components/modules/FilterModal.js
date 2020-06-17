import React, { useState } from 'react';
import {
  Alert, StyleSheet, Modal, Text, View, TouchableHighlight, TouchableOpacity, TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalView: {
    width: '80%',
    height: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalStyle: {
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 10,
  },
  distanceButton: {
    marginRight: 5,
    backgroundColor: 'gray',
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    width: 250,
    height: 40,
    padding: 2,
    margin: 10,
  },
});

const FilterModal = ({modal}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState(0);
  const [pickerMode, setPickerMode] = useState('date');
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [timePickerShow, setTimePickerShow] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [fromTo, setFromTo] = useState('from');
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [timeTo, setTimeTo] = useState(new Date());
  const [totalLength, setTotalLength] = useState(0);

  const show = () => {
    setModalVisible(modal);
  }

  const onChangeDatePicker = (event, selectedDate) => {
    setDatePickerShow(!datePickerShow);
    if (fromTo === 'from') {
      setDateFrom(selectedDate);
    } else {
      setDateTo(selectedDate);
    }
    console.log(dateFrom);
    console.log(dateTo);
  };

  const onChangeTimePicker = (event, selectedTime) => {
    setTimePickerShow(!timePickerShow);
    if (fromTo === 'from') {
      setTimeFrom(selectedTime);
    } else {
      setTimeTo(selectedTime);
    }
    console.log(timeFrom);
    console.log(timeTo);
  };

  const DistanceButtonComponent = ({ dis }) => (
    <TouchableOpacity
      style={styles.distanceButton}
      onPress={() => setDistance(dis)}
    >
      <Text>{`${dis}m`}</Text>
    </TouchableOpacity>
  );

  const DatePickerComponent = ({show, mode, fromTo, value}) => (
    <TouchableOpacity
      style={{ marginRight: 5 }}
      onPress={() => {
        setDatePickerShow(!show);
        setPickerMode(mode);
        setFromTo(fromTo);
      }}
    >
      <Text style={{ color: 'green' }}>{value}</Text>
    </TouchableOpacity>
  );

  const TimePickerComponent = ({show, mode, fromTo, value}) => (
    <TouchableOpacity
      style={{ marginRight: 5 }}
      onPress={() => {
        setTimePickerShow(!show);
        setPickerMode(mode);
        setFromTo(fromTo);
      }}
    >
      <Text style={{ color: 'green' }}>{value}</Text>
    </TouchableOpacity>
  );

  const initialize = () => {
    setDistance(0);
    setDateFrom(new Date());
    setDateTo(new Date());
    setTimeFrom(new Date());
    setTimeTo(new Date());
    setTotalLength(0);
  };

  const customizingDateAndTime = (date, time) => {
    let arr;
    let result;
    if (date || !time) {
      arr = date.split('-');
      result = `${arr[0]}월 ${arr[1]}일`;
    } else {
      arr = time.split(':');
      result = `${arr[0]}시 ${arr[1]}분`;
    }
    return result;
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View stlye={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.row}>
              <Text style={{ marginRight: 5 }}>거리</Text>
              <DistanceButtonComponent dis={1000} />
              <DistanceButtonComponent dis={500} />
              <DistanceButtonComponent dis={300} />
              <DistanceButtonComponent dis={100} />
            </View>
            <View style={styles.row}>
              <Text style={{ marginRight: 5 }}>날짜</Text>
              {
                datePickerShow
                  ? (
                    <DateTimePicker
                      value={new Date()}
                      onChange={onChangeDatePicker}
                      mode={pickerMode}
                    />
                  )
                  : <></>
              }
              <Text>{customizingDateAndTime(moment(dateFrom).format('M-D'), 0)}</Text>
              <DatePickerComponent show={datePickerShow} mode="date" fromTo="from" value="부터" />
              <Text>{customizingDateAndTime(moment(dateTo).format('M-D'), 0)}</Text>
              <DatePickerComponent show={datePickerShow} mode="date" fromTo="to" value="까지" />
            </View>

            <View style={styles.row}>
              <Text style={{ marginRight: 5 }}>시간</Text>
              {
                timePickerShow
                  ? (
                    <DateTimePicker
                      value={new Date()}
                      onChange={onChangeTimePicker}
                      mode={pickerMode}
                    />
                  )
                  : <></>
              }
              <Text>{customizingDateAndTime(0, moment(timeFrom).format('HH:mm:ss'))}</Text>
              <TimePickerComponent show={timePickerShow} mode="time" fromTo="from" value="부터" />
              <Text>{customizingDateAndTime(0, moment(timeTo).format('HH:mm:ss'))}</Text>
              <TimePickerComponent show={timePickerShow} mode="time" fromTo="to" value="까지" />
            </View>
            <View style={styles.row}>
              <Text style={{ marginRight: 5 }}>길이</Text>
              <TextInput style={{ width: 100, height: 40 }} placeholder="길이" keyboardType="numeric" onChangeText={(text) => setTotalLength(text)} />
              <Text>km 이내</Text>
            </View>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                const obj = {
                  distance,
                  dateFrom: moment(dateTo).format('YYYY-MM-DD'),
                  dateTo: moment(dateTo).format('YYYY-MM-DD'),
                  timeFrom: moment(timeFrom).format('HH:mm:ss'),
                  timeTo: moment(timeTo).format('HH:mm:ss'),
                  totalLength,
                };
                setModalVisible(false);
                console.log(`거리 ${obj.distance} 날짜 ${obj.dateFrom} ~ ${obj.dateTo} 시간 ${obj.timeFrom} ~ ${obj.timeTo} 길이 ${obj.totalLength}`);
                initialize();
              }}
            >
              <Text style={{ color: 'white' }}>검색</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={{ color: 'white' }}>모달 창</Text>
      </TouchableHighlight>
    </View>
  );
};

export default FilterModal;
