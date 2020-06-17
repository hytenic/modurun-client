import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainHeader from './MainHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  header: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  main: {
    flex: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Drawer = createDrawerNavigator();

const SideMenu = ({ navigation }) => {
  const toggleSideBar = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {
        toggleSideBar();
      }}
      >
        <Image
          source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
          style={{ width: 25, height: 25, marginLeft: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SideMenu navigation={navigation} />
      <View style={styles.main}>
        <Text style={{ color: 'white' }}>Main</Text>
      </View>
    </View>
  );
};

const Scheduler = ({ navigation }) => (
  <View style={styles.container}>
    <SideMenu navigation={navigation} />
    <View style={styles.main}>
      <Text style={{ color: 'white' }}>Scheduler</Text>
    </View>
  </View>
);

const TrackManager = ({ navigation }) => (
  <View style={styles.container}>
    <SideMenu navigation={navigation} />
    <View style={styles.main}>
      <Text style={{ color: 'white' }}>TrackManager</Text>
    </View>
  </View>
);

const Mypage = ({ navigation }) => (
  <View style={styles.container}>
    <SideMenu navigation={navigation} />
    <View style={styles.main}>
      <Text style={{ color: 'white' }}>Mypage</Text>
    </View>
  </View>
);

function SideBar({ navition }) {
  return (
    <Drawer.Navigator initialRouteName="MainHeader">
      <Drawer.Screen name="MainHeader" component={MainHeader} />
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Scheduler" component={Scheduler} />
      <Drawer.Screen name="TrackManager" component={TrackManager} />
      <Drawer.Screen name="Mypage" component={Mypage} />
    </Drawer.Navigator>
  );
}

export default SideBar;
