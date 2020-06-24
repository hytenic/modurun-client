import React, { useRef, useState, useContext } from 'react';
import { StyleSheet, Text, View, Animated, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, TouchableHighlight, FlatList } from 'react-native-gesture-handler';
import * as actions from '../../redux/action/myPage';
import TrackRecord from './MyPage/TrackRecord';
import dummySchedules from './TrackMaster/dummyData/dummySchedules.json';
import MaskedView from '@react-native-community/masked-view';

const styles = StyleSheet.create({
  compactTitleStyle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userInfoContainerStyle: {
    flex: 0.7,
    margin: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 50,
    backgroundColor: 'white',
  },
});

const MyPage = (props) => {
  const dummyUser = {
    name: '바보똥개',
    email: 'dummyEmail@gmail.com',
  };

  const dummyTrackRecord = dummySchedules.map((track) => {
    const mappedTrackRecord = {
      ...track,
    };
    return mappedTrackRecord;
  });

  return (
    <ScrollView style={{ flex: 3, backgroundColor: '#1E90FF'}}>
      <View style={styles.userInfoContainerStyle}>
        <Text style={{ fontSize: 25, margin: 20, marginVertical: 10 }}>My 모두런</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)', justifyContent: 'space-between' }}>
          <View style={{flexDirection: 'row', alignItems: 'center' }}>
            <View style={{backgroundColor: 'lightgrey', borderRadius: 100, padding: 2, margin: 20 }}>
              <MaskedView style={{backgroundColor: 'transparent' }} maskElement={<View style={{backgroundColor: 'black', width: 40, height: 40, borderRadius: 100 }} />}>
                <Icon name="user" size={50} color="white" style={{backgroundColor: 'lightgrey', width: 40, height: 40, textAlignVertical: 'center', textAlign: 'center' }} />
              </MaskedView>
            </View>
            <Text style={{ fontSize: 17 }}>{`${dummyUser.name}`}</Text>
          </View>
          <TouchableHighlight underlayColor="rgba(0,0,0,0.1)" onPressIn={()=>{}} style={{margin: 10, backgroundColor: '#03D6A7', padding: 5, paddingHorizontal: 10, borderRadius: 5 }}>
            <Text style={{fontSize: 12, color: 'white', fontWeight: 'bold'}}>내 정보 관리</Text>
          </TouchableHighlight>
        </View>
        <View style={{padding: 20, flexDirection: 'row', borderBottomColor:'rgba(0,0,0,0.1)', borderBottomWidth: 1 }}>
          <Icon name="envelope" size={15} color="#1E90FF" style={{marginRight: 10}} />
          <Text>{`${dummyUser.email}`}</Text>
        </View>
        <TouchableHighlight onPressIn={()=>{}} underlayColor="rgba(0,0,0,0.1)" style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
          <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{flexDirection: 'row' }}>
              <Icon name="thumbs-up" size={15} color="#1E90FF" style={{marginRight: 10}} />
              <Text>나의 후기</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Icon name="chevron-right" />
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{ padding: 5}}>
        <Text style={{marginLeft: 20, fontSize: 25, fontWeight:'bold', color: 'white'}}>내가 뛰었던 코스</Text>
      </View>
      <View>
        {dummyTrackRecord.map((trackRecord) => (
          <TrackRecord key={trackRecord.trackId} data={trackRecord} />
        ))}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    exmapleState: state.myPage.exampleKey.exampleKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchProp: (num) => {
      dispatch(actions.exAction1(num));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);