import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert } from 'react-native';
import moduRunApi from './API/index';
import APITestButton from './APITester/APITestButton';
import dummyTracks from './TrackMaster/dummyData/dummyTracks.json';
import dummySchedules from './TrackMaster/dummyData/dummySchedules.json';

const testFilter = {
  maxLength: 30000,
  distance: 100000000,
  date: {
    from: '1990-01-01',
    to: '2030-12-01',
  },
  rate: false,
  recent: true,
};

const testUserPosition = {
  latitude: 35.9,
  longitude: 127.7669,
};

const testArea = {
  latitude: 50,
  longitude: 120,
  latitudeDelta: -100,
  longitudeDelta: 50,
};

const testCreateTrack = () => moduRunApi.tracks.createTrack(dummyTracks[0]);
const testGetMyTracks = () => moduRunApi.tracks.getMyTracks();
const testAddToMyTrack = () => moduRunApi.tracks.addToMyTrack(1);
const testAddToMyBookMark = () => moduRunApi.tracks.addToBookMark(1);
const testDeleteFromMyTrack = () => moduRunApi.tracks.deleteFromMyTrack(1);
const testGetSingleTrack = () => moduRunApi.tracks.getTrack(1);
const testDeleteTrack = () => moduRunApi.tracks.deleteTrack(5);
const testGetTracks = () => moduRunApi.tracks.getTracks(testFilter, testUserPosition, testArea);
const testRateTrack = () => moduRunApi.tracks.rateTrack(3, 5);

const testGetSchdules = () => moduRunApi.schedules.getSchedules(testFilter, testUserPosition, testArea);
const testCreateSchedule = () => moduRunApi.schedules.createSchedule(dummyTracks[0], dummySchedules[0].schedule);
const testJoinSchedule = () => moduRunApi.schedules.joinToSchedule(2);
const testExitFromSchedule = () => moduRunApi.schedules.exitFromSchedule(0);
const testGetMessages = () => moduRunApi.messages.getMessages(1, 0);

const testSignUp = () => moduRunApi.users.signUp('anotherTest@gmail.com', '1234');
const testSignIn = () => moduRunApi.users.signIn('anotherTest@gmail.com', '1234');
const testChangeName = () => moduRunApi.users.changeMyName('이게 이름이냐');
const testDuplicateEmail = () => moduRunApi.users.isDuplicateEmail('anotherTest@gmail.com');

const APITester = () => {
  return (
    <ScrollView>
      <View>
        <Text style={{ padding: 10, margin: 10, elevation: 2, backgroundColor: 'white' }}>트랙 관련 API</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <APITestButton text="CREATE Track" test={testCreateTrack} />
          <APITestButton text="GET Tracks" test={testGetTracks} />
          <APITestButton text="ADD TO myTrack" test={testAddToMyTrack} />
          <APITestButton text="ADD TO Bookmark" test={testAddToMyBookMark} />
          <APITestButton text="GET myTracks" test={testGetMyTracks} />
          <APITestButton text="GET single track" test={testGetSingleTrack} />
          <APITestButton text="RATE track" test={testRateTrack} />
          <APITestButton text="DELETE FROM myTrack" test={testDeleteFromMyTrack} />
          <APITestButton text="DELETE track" test={testDeleteTrack} />
        </View>
      </View>
      <View>
        <Text style={{padding: 10, margin:10, elevation: 2, backgroundColor: 'white'}}>스케줄 관련 API</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <APITestButton text="GET schedules" test={testGetSchdules} />
          <APITestButton text="CREATE schedule" test={testCreateSchedule} />
          <APITestButton text="JOIN schedule" test={testJoinSchedule} />
          <APITestButton text="GET messages" test={testGetMessages} />
          <APITestButton text="EXIT FROM schedule" test={testExitFromSchedule} />
        </View>
      </View>
      <View>
        <Text style={{padding: 10, margin:10, elevation: 2, backgroundColor: 'white'}}>유저 관련 API</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <APITestButton text="SIGN UP test" test={testSignUp} />
          <APITestButton text="SIGN IN test" test={testSignIn} />
          <APITestButton text="CHANGE username" test={testChangeName} />
          <APITestButton text="CHECK duplicate email" test={testDuplicateEmail} />
        </View>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default APITester;
