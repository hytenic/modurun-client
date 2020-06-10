import React, { useState } from 'react';
import {
  Alert, StyleSheet, Modal, Text, View, TouchableHighlight, TouchableOpacity, TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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

const FilterModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState(0);
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [timePickerShow, setTimePickerShow] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [fromTo, setFromTo] = useState('from');
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [timeTo, setTimeTo] = useState(new Date());
  const [totalLength, setTotalLength] = useState(0);

  const onChangeDatePicker = (event, selectedDate) => {
    setDatePickerShow(!datePickerShow);
    if (fromTo === 'from') {
      setDateFrom(selectedDate);
    } else {
      setDateTo(selectedDate);
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

  const DistanceButtonComponent = ({ dis }) => (
    <TouchableOpacity
      style={styles.distanceButton}
      onPress={() => setDistance(dis)}
    >
      <Text>{`${dis}m`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible} transparent={false}>
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
                      value={dateFrom}
                      onChange={onChangeDatePicker}
                      mode={datePickerMode}
                    />
                  )
                  : <></>
              }
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => {
                  setDatePickerShow(!datePickerShow);
                  setDatePickerMode('date');
                  setFromTo('from');
                }}
              >
                <Text style={{ color: 'green' }}>부터</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => {
                  setDatePickerShow(!datePickerShow);
                  setDatePickerMode('date');
                  setFromTo('to');
                }}
              >
                <Text style={{ color: 'green' }}>까지</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={{ marginRight: 5 }}>시간</Text>
              {
                timePickerShow ? <DateTimePicker value={timeFrom} onChange={onChangeTimePicker} mode={datePickerMode} /> : <></>
              }
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => {
                  setTimePickerShow(!timePickerShow);
                  setFromTo('from');
                  setDatePickerMode('time');
                }}
              >
                <Text style={{ color: 'green' }}>부터</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => {
                  setTimePickerShow(!timePickerShow);
                  setFromTo('to');
                  setDatePickerMode('time');
                }}
              >
                <Text style={{ color: 'green' }}>까지</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={{ marginRight: 5 }}>길이</Text>
              <TextInput style={{ width: 100, height: 40 }} placeholder="길이" onChangeText={(text) => setTotalLength(text)} />
              <Text>km 이내</Text>
            </View>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                const obj = {
                  distance,
                  dateFrom,
                  dateTo,
                  timeFrom,
                  timeTo,
                  totalLength,
                };
                setModalVisible(false);
                console.log(`거리 ${obj.distance} 날짜 ${obj.dateFrom} ~ ${obj.dateTo} 시간 ${obj.timeFrom} ~ ${obj.timeTo} 길이 ${obj.totalLength}`);
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
          // Alert.alert(`${modalVisible}`);
        }}
      >
        <Text style={{ color: 'white' }}>모달 창</Text>
      </TouchableHighlight>
    </View>
  );
};

export default FilterModal;
