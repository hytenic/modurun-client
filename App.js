import React from 'react';
import { Provider } from 'react-redux';

import { StyleSheet, Text, View, Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';

// import TrackMaster from './components/modules/TrackMaster/TrackMaster';
import TrackMasterContainer from './components/modules/TrackMasterContainer';
import Developer from './components/Developer';
import FilterModal from './components/modules/FilterModal';
import TrackList from './components/modules/TrackList';
import CreatedTrackInfo from './components/modules/CreatedTrackInfo';
import TrackManagerTab from './components/modules/TrackManagerTab';
import SignUpManager from './components/modules/SignUpManager';
import SignInManager from './components/modules/SignInManager';
import MainHeader from './components/modules/MainHeader';
import ChatRoom from './components/modules/ChatRoom';
import ScheduleList from './components/modules/ScheduleList';
import SideBar from './components/modules/SideBar';
import Scheduler from './components/modules/Scheduler';
import SelectedTrackInfo from './components/modules/SelectedTrackInfo';
import CreatedScheduleInfo from './components/modules/CreatedScheduleInfo';
import TrackCreator from './components/modules/TrackCreator';
import ScheduleManager from './components/modules/ScheduleManager';
import MyPage from './components/modules/MyPage';

import store from './redux/store';

navigator.geolocation = Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Developer" component={Developer} />
          <Stack.Screen name="TrackMaster" component={TrackMasterContainer} />
          <Stack.Screen name="FilterModal" component={FilterModal} />
          <Stack.Screen name="TrackList" component={TrackList} />
          <Stack.Screen name="CreatedTrackInfo" component={CreatedTrackInfo} />
          <Stack.Screen name="TrackManagerTab" component={TrackManagerTab} />
          <Stack.Screen name="SignUpManager" component={SignUpManager} />
          <Stack.Screen name="SignInManager" component={SignInManager} />
          <Stack.Screen name="MainHeader" component={MainHeader} />
          <Stack.Screen name="ScheduleList" component={ScheduleList} />
          <Stack.Screen name="SideBar" component={SideBar} />
          <Stack.Screen name="Scheduler" component={Scheduler} />
          <Stack.Screen name="SelectedTrackInfo" component={SelectedTrackInfo} />
          <Stack.Screen name="CreatedScheduleInfo" component={CreatedScheduleInfo} />
          <Stack.Screen name="TrackCreator" component={TrackCreator} />
          <Stack.Screen name="ScheduleManager" component={ScheduleManager} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          <Stack.Screen name="MyPage" component={MyPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
