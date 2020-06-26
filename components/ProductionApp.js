import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainDrawer from './navigation/MainDrawer';
import SignInManager from './modules/SignInManager';
import SignUpManager from './modules/SignUpManager';
import Scheduler from './modules/Scheduler/Scheduler';
import CreatedTrackInfo from './modules/CreatedTrackInfo';
import ChatRoom from './modules/ChatRoom';
import SingleTrackViewerInDetail from './modules/SingleTrackViewerInDetail';
import CreatedScheduleInfo from './modules/Scheduler/CreatedScheduleInfo';
import MyTrackList from './modules/Scheduler/MyTrackList';

const Stack = createStackNavigator();

const ProductionApp = () => {
  return (
    <Stack.Navigator initialRouteName="SignInScreen">
      <Stack.Screen name="SignInScreen" component={SignInManager} />
      <Stack.Screen name="SignUpScreen" component={SignUpManager} />
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
      <Stack.Screen name="SchedulerScreen" component={Scheduler} />
      <Stack.Screen name="CreatedTrackInfoScreen" component={CreatedTrackInfo} />
      <Stack.Screen name="ChatRoomScreen" component={ChatRoom} />
      <Stack.Screen name="SingleTrackViewerScreen" component={SingleTrackViewerInDetail} />
      <Stack.Screen name="CreatedScheduleInfoScreen" component={CreatedScheduleInfo} />
      <Stack.Screen name="MyTrackListScreen" component={MyTrackList} />
    </Stack.Navigator>
  );
};

export default ProductionApp;
