import React, { useState } from 'react';
import {
  Alert, StyleSheet, Modal, Text, View, TouchableHighlight, TouchableOpacity, Image, TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { patchUserName } from './API/user';
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
    borderRadius: 100,
    paddingLeft: 15,
    width: 55,
    height: 55,
    elevation: 2,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    marginTop: 30,
    width: 100,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterButton: {
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    width: 55,
    height: 55,
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
  pressedButton: {
    marginRight: 5,
    backgroundColor: '#FFFFFF',
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
    // backgroundColor: '#FFFFF3',
    fontSize: 15,
    borderRadius: 5,
    padding: 5,
    marginRight: 15,
  },
});

const FilterModal = ({ modal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
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
      onPress={() => {
        setDistance(dis);
      }}
    >
      <Text>{`${dis}m`}</Text>
    </TouchableOpacity>
  );

  const DatePickerComponent = ({
    show, mode, fromTo, value,
  }) => (
    <TouchableOpacity
      style={{ marginRight: 15, flexDirection: 'row' }}
      onPress={() => {
        setDatePickerShow(!show);
        setPickerMode(mode);
        setFromTo(fromTo);
      }}
    >
      <Text style={{alignSelf: 'center'}}>{value}</Text>
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
      <Text style={{alignSelf: 'center'}}>{value}</Text>
    </TouchableOpacity>
  );

  const onChangeDatePicker = (event, selectedTime) => {
    setDatePickerShow(false);
    if (selectedTime) {
      if (fromTo === 'from') {
        setDateFrom(selectedTime);
      } else {
        setDateTo(selectedTime);
      }
    }
  };

  const onChangeTimePicker = (event, selectedTime) => {
    setTimePickerShow(false);
    if (selectedTime) {
      if (fromTo === 'from') {
        setTimeFrom(selectedTime);
      } else {
        setTimeTo(selectedTime);
      }
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
              {/* <Text>{customizingDateAndTime(dateFrom, 0)}</Text> */}
              <DatePickerComponent show={datePickerShow} mode="date" fromTo="from" value={customizingDateAndTime(dateFrom, 0)} />
              {/* <Text>{customizingDateAndTime(dateTo, 0)}</Text> */}
              <DatePickerComponent show={datePickerShow} mode="date" fromTo="to" value={customizingDateAndTime(dateTo, 0)} />
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
              <TimePickerComponent show={timePickerShow} mode="time" fromTo="from" value={customizingDateAndTime(0, timeFrom)} />
              <TimePickerComponent show={timePickerShow} mode="time" fromTo="to" value={customizingDateAndTime(0, timeTo)} />
            </View>

            <View style={styles.row}>
              <Text style={styles.filterTitle}>길이</Text>
              <TextInput style={{ width: 100, height: 40, backgroundColor: '#F4F4F4' }} placeholder="길이" keyboardType="numeric" onChangeText={(text) => setTotalLength(text)} />
              <Text>km 이내</Text>
            </View>

            <TouchableHighlight
              style={styles.searchButton}
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
        underlayColor="#ffffff00"
        style={styles.openButton}
        // onPress={() => {
        //   setModalVisible(true);
        // }}
      >
        <Icon.Button style={styles.filterButton} name="filter" color="white" size={30} backgroundColor="rgba(52, 52, 52, 0.0)" onPress={() => { setModalVisible(true); }} />
      </TouchableHighlight>
    </View>
  );
};

export const InputUsernameModal = ({}) => {
  // 첫 로그인일 때만 보이는 유저 이름 입력 모달
  const [modalVisible, setModalVisible] = useState(true);
  const [username, setUsername] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const postUsername = async () => {
    setModalVisible(false);
    try {
      await patchUserName(username);
    } catch (e) {
      console.log('username input modal ', e);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={closeModal}
        >
          <View style={styles.modalView}>
            <TextInput placeholder="유저 이름을 입력해 주세요" style={{ borderWidth: 0.5, width: 200, height: 40, marginBottom: 10 }} onChangeText={setUsername} />
            <TouchableHighlight
              style={styles.openButton}
              onPress={postUsername}
            >
              <Text style={styles.textStyle}>확인</Text>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FilterModal;
