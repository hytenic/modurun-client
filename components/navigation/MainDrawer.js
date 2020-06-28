import React from 'react';
import { View, Text } from 'react-native';
import {
  createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Main from '../Main';
import MyPage from '../modules/MyPage';
import ScheduleManager from '../modules/ScheduleManager';
import TrackManagerTabs from './TrackManagerTabs';
import { signout } from '../modules/API/user';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      const res = await signout();
      if (res) navigation.navigate('SignInScreen');
      return;
    } catch (e) {
      console.log('로그아웃 ', e);
    }
  };

  return (
    <Drawer.Navigator
      initialRouteName="MainScreen"
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="나가기" icon={() => <Icon color="#EF3832" name="logout" size={20} />} onPress={logout} />
        </DrawerContentScrollView>
      )}
      drawerStyle={{ width: '60%' }}
    >
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
