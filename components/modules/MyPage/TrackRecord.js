import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import * as scheduleUtils from '../ScheduleUtils/utils';
import Rate from '../Rate';

const TrackRecord = ({ data }) => {
  const [curRate, setCurRate] = useState(5);
  const [reason, setReason] = useState('');
  const [rateVisible, setRateVisible] = useState(false);
  const trackTitleStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 20,
    marginBottom: 5,
  };

  const buttonContainerStyle = {
    flex: 1,
    borderWidth: 1,
    height: 50,
    marginRight: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.3)',
    color: 'dodgerblue',
  };

  const buttonStyle = {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  };

  const submitRate = () => {
    console.log('여기서 평점 제출하는 액션 이루어져야 함');
  };

  const {track, schedule} = data;
  const { trackTitle, origin, destination, route, trackLength } = track;
  const { scheduleTitle, from, to, participants } = schedule;
  return (
    <View style={{ backgroundColor: 'white', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.3)' }}>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={trackTitleStyle}>{trackTitle}</Text>
        </View>
        <View style={{marginBottom: 10}}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'rgba(0,0,0,0.6)', flexBasis: 70, fontSize: 12 }}>뛰었던 일정</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold' }}>{scheduleTitle}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'rgba(0,0,0,0.6)', flexBasis: 70, fontSize: 12 }}>뛰었던 날짜</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold' }}>{`${scheduleUtils.convertDate(from, 'compact')} ~ ${scheduleUtils.convertDate(to, 'compact')}`}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row' }}>
          <View style={buttonContainerStyle}>
            <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" style={buttonStyle} onPress={()=>{}}>
              <Icon name="map-marker" color="dodgerblue" size={25} />
            </TouchableHighlight>
          </View>
          <View style={buttonContainerStyle}>
            <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" style={buttonStyle} onPress={()=>{}}>
              <Icon name="calendar" color="dodgerblue" size={25} />
            </TouchableHighlight>
          </View>
          <View style={[buttonContainerStyle, {flexGrow: 2.5, borderWidth: 0, backgroundColor: 'dodgerblue'}]}>
            <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" style={buttonStyle} onPress={() => setRateVisible(!rateVisible)}>
              <Text style={{color: 'white'}}>후기 남기기</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={{display: rateVisible ? 'flex' : 'none', marginTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)', padding: 20 }}>
        <View>
          <View style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 }}>
              <Text style={{fontWeight: 'bold', marginRight: 10, fontSize: 18 }}>제 별점은요...!</Text>
              <Text style={{fontWeight: 'bold', fontSize: 20 }}>{`${curRate}점`}</Text>
              <Text>입니다!</Text>
            </View>
            <View style={{ marginBottom: 10, alignItems: 'center' }}>
              <Rate size={60} onRate={(rate) => { setCurRate(rate); }} />
            </View>
          </View>
          <View>
            <TextInput
              multiline
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 5,
                padding: 10,
                paddingLeft: 10,
              }}
              onChange={(e) => setReason(e.nativeEvent.text)}
              placeholder="이유를 적어주세요"
              value={reason}
            />
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <TouchableHighlight onPress={submitRate} underlayColor="rgba(0,0,0,0.1)" style={{padding: 10, backgroundColor: 'orange', borderRadius: 10, margin: 10}}>
            <Text style={{color: 'white'}}>제출하기</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default TrackRecord;
