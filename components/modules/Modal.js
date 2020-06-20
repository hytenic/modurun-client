import React, { useState } from 'react';
import {
  Alert, StyleSheet, Modal, Text, View, TouchableHighlight, TouchableOpacity, Image, TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { customizingDateAndTime } from './utils';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080aa',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  distanceButton: {
    marginRight: 5,
    backgroundColor: '#E0E3DA',
    borderRadius: 5,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    width: 250,
    height: 40,
    padding: 2,
    margin: 10,
  },
  icon: {
    // backgroundColor: 'blue',
    width: 25,
    height: 25,
    marginTop: 2,
    marginRight: 10,
  },
  filterTitle: {
    backgroundColor: '#FFFFF3',
    borderRadius: 5,
    padding: 5,
    marginRight: 15,
  },
});

const FilterModal = ({ modal }) => {
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

  const DistanceButtonComponent = ({ dis }) => (
    <TouchableOpacity
      style={styles.distanceButton}
      onPress={() => setDistance(dis)}
    >
      <Text>{`${dis}m`}</Text>
    </TouchableOpacity>
  );

  const DatePickerComponent = ({
    show, mode, fromTo, value,
  }) => (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => {
        setDatePickerShow(!show);
        setPickerMode(mode);
        setFromTo(fromTo);
      }}
    >
      <Image
        source={require('../../assets/calendar_icon.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );

  const TimePickerComponent = ({
    show, mode, fromTo, value,
  }) => (
    <TouchableOpacity
      style={{ marginRight: 5 }}
      onPress={() => {
        setTimePickerShow(!show);
        setPickerMode(mode);
        setFromTo(fromTo);
      }}
    >
      <Image
        source={require('../../assets/clock_icon.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );

  const onChangeDatePicker = (event, selectedTime) => {
    setDatePickerShow(!datePickerShow);
    if (fromTo === 'from') {
      setDateFrom(selectedTime);
    } else {
      setDateTo(selectedTime);
    }
  };

  const onChangeTimePicker = (event, selectedTime) => {
    setTimePickerShow(!timePickerShow);
    if (fromTo === 'from') {
      setTimeFrom(selectedTime);
    } else {
      setTimeTo(selectedTime);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.row}>
              <Text style={styles.filterTitle}>거리</Text>
              <DistanceButtonComponent dis={1000} />
              <DistanceButtonComponent dis={500} />
              <DistanceButtonComponent dis={300} />
              <DistanceButtonComponent dis={100} />
            </View>
            <View style={styles.row}>
              <Text style={styles.filterTitle}>날짜</Text>
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
              <Text>{customizingDateAndTime(dateFrom, 0)}</Text>
              <DatePickerComponent show={datePickerShow} mode="date" fromTo="from" />
              <Text>{customizingDateAndTime(dateTo, 0)}</Text>
              <DatePickerComponent show={datePickerShow} mode="date" fromTo="to" />
            </View>

            <View style={styles.row}>
              <Text style={styles.filterTitle}>시간</Text>
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
              <Text>{customizingDateAndTime(0, timeFrom)}</Text>
              <TimePickerComponent show={timePickerShow} mode="time" fromTo="from" value="부터" />
              <Text>{customizingDateAndTime(0, timeTo)}</Text>
              <TimePickerComponent show={timePickerShow} mode="time" fromTo="to" value="까지" />
            </View>

            <View style={styles.row}>
              <Text style={styles.filterTitle}>길이</Text>
              <TextInput style={{ width: 100, height: 40 }} placeholder="길이" keyboardType="numeric" onChangeText={(text) => setTotalLength(text)} />
              <Text>km 이내</Text>
            </View>

            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>검색</Text>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>필터</Text>
      </TouchableHighlight>
    </View>
  );
};

export default FilterModal;
