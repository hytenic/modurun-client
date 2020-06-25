import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Keyboard, Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import Scheduler from './modules/Scheduler/Scheduler';
import TrackManager from './modules/TrackManager';
import MyPage from './modules/MyPage';
import TrackMaster from './modules/TrackMaster/TrackMaster';
import FilterModal, { InputUsernameModal } from './modules/Modal';
import getEnvVars from '../environment';
import ScheduleManager from './modules/ScheduleManager';
import { getUserLocation } from './modules/utils';
import { getUserSchedules } from './modules/API/schedule';
import dummySchedules from './modules/TrackMaster/dummyData/dummySchedules.json';
import reduxStore from '../redux/store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 5,
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#1E90FF',
    backgroundColor: 'white',
    alignItems: 'center',
    width: 340,
    padding: 5,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 5,
    zIndex: 1,
    elevation: 3,
  },
  main: {
    zIndex: 0,
    flex: 10,
  },
  search: {
    backgroundColor: 'white',
    marginLeft: 10,
    width: 250,
    padding: 5,
    borderRadius: 2,
  },
  plusButton: {
    // borderRadius: 100,
    // width: 70,
    // justifyContent: 'center',
  },
  filterButton: {
    position: 'absolute',
    zIndex: 5,
    right: 5,
    top: 5,
  },
  addButton: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#03D6A7',
    borderRadius: 100,
    position: 'absolute',
    top: 510,
    width: 66,
    height: 66,
  },
  suggestion: {
    flex: 1,
    // position: 'absolute',
    // top: 100,
    backgroundColor: 'white',
    borderWidth: 0.5,
    padding: 5,
  },
});

export const Main = () => {
  const navigation = useNavigation();
  const [typing, setTyping] = useState(false);
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [userSchedules, setUserSchedules] = useState([]);
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const { apiKey } = getEnvVars('dev');
  useEffect(() => {
    console.log('main ', reduxStore.getState().userInfo.user);
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setTyping(false));
    Keyboard.addListener('keyboardDidShow', () => setTyping(true));
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setTyping(false));
      Keyboard.removeListener('keyboardDidShow', () => setTyping(true));
    };
  }, [typing]);

  useEffect(() => {
    async function initializeLocation() {
      const { latitude, longitude } = await getUserLocation();
      setLocation({
        ...location,
        latitude,
        longitude,
      });
    }
    initializeLocation();
  }, []);

  // useEffect(() => {
  // 위치가 바뀌면 스케줄도 바뀌어야 한다.
  // }, [location]);

  const searched = () => {
    Keyboard.dismiss();
    setSearching(false);
    setDestination('');
  };

  const onSearch = () => {
    setSearching(true);
  };

  const pickedSearchedLocation = ({ lat, lng }) => {
    Keyboard.dismiss();
    setLocation({
      ...location,
      latitude: lat,
      longitude: lng,
    });
  };

  const toggleSideBar = () => {
    navigation.openDrawer();
  };

  const onChangeDestination = async (text) => {
    setDestination(text);
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&language=ko&input=${text}`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      setPredictions(json.predictions);
    } catch (e) {
      console.error(e);
    }
  };

  const predictionsList = predictions.map((prediction) => (
    <TouchableOpacity
      key={prediction.id}
      style={styles.suggestion}
      onPress={async () => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${apiKey}`;
        const result = await fetch(apiUrl);
        const json = await result.json();
        pickedSearchedLocation(json.result.geometry.location);
        searched();
      }}
    >
      <Text>{prediction.description}</Text>
    </TouchableOpacity>
  ));

  const renderRecommendation = () => {
    if (searching) {
      return (
        <View style={styles.main}>
          {predictionsList}
        </View>
      );
    }
    return (<></>);
  };

  const renderMainView = () => {
    if (!searching) {
      return (
        <TrackMaster mode="scheduleViewer" schedules={dummySchedules} initialCamera={location} moveOnMarkerPress />
      );
    }
    return (<></>);
  };

  const addSchedule = () => {
    navigation.navigate('Scheduler');
  };

  const usernameInput = () => {
    const { isFirstLogin } = reduxStore.getState().userInfo.user;
    console.log(isFirstLogin);
    if (!isFirstLogin) {
      return (
        <></>
      );
    }
    return (
      <InputUsernameModal />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {
            toggleSideBar({ navigation });
          }}
          >
            <Image
              source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
              style={{ width: 25, height: 25, marginLeft: 10 }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.search}
            placeholder="검색"
            value={destination}
            onTouchStart={onSearch}
            onChangeText={onChangeDestination}
            onSubmitEditing={searched}
          />
        </View>
        <View style={styles.filterButton}>
          <FilterModal style={styles.main} />
        </View>
        {renderRecommendation()}
        {renderMainView()}
        {/* <View style={styles.filterButton}>
          <FilterModal style={styles.main} />
        </View> */}
        <View style={styles.addButton}>
          <Icon.Button style={styles.plusButton} name="plus" color="white" size={50} backgroundColor="rgba(52, 52, 52, 0.0)" onPress={addSchedule} />
        </View>
      </View>
    </View>
  );
};

const Drawer = createDrawerNavigator();

function SideBar() {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="mainBar" component={Main} />
      <Drawer.Screen name="트랙 관리" component={TrackManager} />
      <Drawer.Screen name="스케줄 관리" component={ScheduleManager} />
      <Drawer.Screen name="마이페이지" component={MyPage} />
    </Drawer.Navigator>
  );
}

export default SideBar;
