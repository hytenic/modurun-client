import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from '../Main';
import MyPage from '../modules/MyPage';
import ScheduleManager from '../modules/ScheduleManager';
import TrackManagerTabs from './TrackManagerTabs';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="MainScreen">
      <Drawer.Screen
        name="MainScreen"
        options={{ title: '홈' }}
        component={Main}
      />
      <Drawer.Screen
        name="TrackManagerTabs"
        options={{ title: '코스 관리' }}
        component={TrackManagerTabs}
      />
      <Drawer.Screen
        name="ScheduleManagerScreen"
        options={{ title: '스케줄 관리' }}
        component={ScheduleManager}
      />
      <Drawer.Screen
        name="MyPageScreen"
        options={{ title: 'MY모두런' }}
        component={MyPage}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
