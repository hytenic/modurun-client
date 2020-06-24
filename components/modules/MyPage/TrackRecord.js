import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import * as scheduleUtils from '../ScheduleUtils/utils';
import Rate from '../Rate';

const styles = StyleSheet.create({
  trackContainer: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    marginLeft: '5%',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 50,
    width: '90%',
  },
  trackTitles: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  buttonContainerStyle: {
    flex: 1,
    borderWidth: 1,
    height: 30,
    marginRight: 10,
    marginTop: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.3)',
    color: 'dodgerblue',
  },

  buttonStyle: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  scheduleInfoStyle: {
    color: '#03D6A7',
    fontWeight: 'bold',
    flexBasis: 70,
    fontSize: 12,
    paddingBottom: 5,
  },
  submitButtonStyle: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#03D6A7',
    borderRadius: 10,
    margin: 10,
  },
});

const TrackRecord = ({ data }) => {
  const [curRate, setCurRate] = useState(5);
  const [reason, setReason] = useState('');
  const [rateVisible, setRateVisible] = useState(false);

  const submitRate = () => {
    console.log('여기서 평점 제출하는 액션 이루어져야 함');
  };

  const {track, schedule} = data;
  const { trackTitle, origin, destination, route, trackLength } = track;
  const { scheduleTitle, from, to, participants } = schedule;

  return (
    <View style={styles.trackContainer}>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.trackTitles}>{trackTitle}</Text>
        </View>
        <View s={{marginBottom: 10}}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.scheduleInfoStyle}>스케줄 이름</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold' }}>{scheduleTitle}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.scheduleInfoStyle}>스케줄 기간</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold' }}>{`${scheduleUtils.convertDate(from, 'compact')} ~ ${scheduleUtils.convertDate(to, 'compact')}`}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row' }}>
          <View style={styles.buttonContainerStyle}>
            <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" style={styles.buttonStyle} onPress={()=>{}}>
              <Icon name="map-marker" color="#ef3832" size={16} />
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainerStyle}>
            <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" style={styles.buttonStyle} onPress={()=>{}}>
              <Icon name="calendar" color="dodgerblue" size={16} />
            </TouchableHighlight>
          </View>
          <View style={[styles.buttonContainerStyle, {flexGrow: 2.5, borderWidth: 0, backgroundColor: '#03D6A7'}]}>
            <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" style={styles.buttonStyle} onPress={() => setRateVisible(!rateVisible)}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>후기 남기기</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={{display: rateVisible ? 'flex' : 'none', marginTop: 5, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)', padding: 20 }}>
        <View>
          <View style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 }}>
              <Text style={{fontWeight: 'bold', marginRight: 10, fontSize: 18 }}>제 별점은요...!</Text>
              <Text style={{fontWeight: 'bold', fontSize: 20 }}>{`${curRate}점`}</Text>
              <Text>입니다!</Text>
            </View>
            <View style={{ marginBottom: 5, alignItems: 'center' }}>
              <Rate size={60} onRate={(rate) => { setCurRate(rate); }} />
            </View>
          </View>
          <View>
            <TextInput
              multiline
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 5,
                padding: 5,
                paddingLeft: 20,
              }}
              onChange={(e) => setReason(e.nativeEvent.text)}
              placeholder="이유를 적어주세요"
              value={reason}
            />
          </View>
        </View>
        <View style={{alignSelf: 'center' }}>
          <TouchableHighlight onPress={submitRate} underlayColor="rgba(0,0,0,0.1)" style={styles.submitButtonStyle}>
            <Text style={{color: 'white', fontWeight: 'bold' }}>제출하기</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default TrackRecord;
