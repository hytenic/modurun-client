import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Keyboard, Alert, Dimensions,
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
import { getUserLocation, getFilterCondition } from './modules/utils';
import { getSchedules } from './modules/API/schedule';
import dummySchedules from './modules/TrackMaster/dummyData/dummySchedules.json';
import ScheduleList from './modules/ScheduleList';
import reduxStore from '../redux/store';
// import schedules from './modules/API/SG/schedules';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 5,
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#1E90FF',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 20,
    marginHorizontal: 10,
    top: 10,
    borderRadius: 3,
    position: 'absolute',
    zIndex: 1,
  },
  main: {
    zIndex: 0,
    flex: 10,
  },
  search: {
    backgroundColor: 'white',
    marginLeft: 10,
    flex: 1,
    padding: 5,
    borderRadius: 2,
  },
  plusButton: {
    backgroundColor: '#03D6A7',
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: 'center',
  },
  filterButton: {
    flex: 25,
    zIndex: 5,
  },
  addButton: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    top: Dimensions.get('screen').height - 170,
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
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [clickedTrack, setClickedTrack] = useState(false);
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [tabStartPosition, setTabStartPosition] = useState({
    x: 0,
    y: 0,
  });
  const [tabFinishedPosition, setTabFinishedPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    async function initializeLocation() {
      try {
        const { latitude, longitude } = await getUserLocation();
        setLocation({
          ...location,
          latitude,
          longitude,
        });
      } catch (e) {
        console.log(e);
      }
    }
    initializeLocation();
  }, []);

  const setTypingFalse = () => {
    setSearching(false);
  };

  const setTypingTrue = () => {
    setSearching(true);
  };

  const filter = getFilterCondition();
  const [filterCondition, setFilterCondition] = useState(filter);
  const { apiKey } = getEnvVars('dev');

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', setTypingFalse);
    Keyboard.addListener('keyboardDidShow', setTypingTrue);
    return () => {
      Keyboard.removeListener('keyboardDidHide', setTypingFalse);
      Keyboard.removeListener('keyboardDidShow', setTypingTrue);
    };
  }, []);

  useEffect(() => {
    const getSchedulesAPI = async () => {
      const scheduleData = await getSchedules(filterCondition, location);
      if (!scheduleData && scheduleData === false) {
        setSchedules([]);
      } else {
        setSchedules(scheduleData);
      }
    };
    getSchedulesAPI();
  }, [location, filterCondition]);

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

  const scheduleSelecting = (selectedSchedule) => {
    setClickedTrack(true);
    console.log('selected Schedule ', selectedSchedule);
    setSelectedSchedules(selectedSchedule);
  };

  const addSchedule = () => {
    navigation.navigate('Scheduler');
  };

  const renderScheduleList = () => {
    if (clickedTrack) {
      return (
        <View style={{ flex: 4 }}>
          <ScheduleList schedules={selectedSchedules} />
        </View>
      );
    }
    return (
      <View style={styles.addButton}>
        <TouchableOpacity onPress={addSchedule} style={styles.plusButton}>
          <Icon style={{ textAlign: 'center', textAlignVertical: 'center' }} name="plus" color="white" size={50} />
        </TouchableOpacity>
      </View>
    );
  };

  const startingTab = (e) => {
    setTabStartPosition({
      ...tabStartPosition,
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY,
    });
  };

  const finishedTab = (e) => {
    const newFinishedLocation = {
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY,
    };
    setTabFinishedPosition({ ...tabFinishedPosition, ...newFinishedLocation });
    const distance = Math.sqrt(Math.pow((tabStartPosition.x - newFinishedLocation.x), 2) + Math.pow((tabStartPosition.y - newFinishedLocation.y), 2));
    if (distance < 40) {
      setClickedTrack(false);
    } else {
      setClickedTrack(clickedTrack);
    }
  };

  const renderMainView = () => {
    if (!searching) {
      return (
        <View style={{ flex: 1 }} onTouchStart={startingTab} onTouchEnd={finishedTab}>
          <TrackMaster
            mode="scheduleViewer"
            schedules={schedules}
            initialCamera={location}
            moveOnMarkerPress
            onTrackSelected={scheduleSelecting}
          />
        </View>
      );
    }
    return (<></>);
  };

  const usernameInput = () => {
    const { isFirstLogin } = reduxStore.getState().userInfo.user;
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
      <View style={[styles.main, clickedTrack ? { flex: 6 } : null]}>
        <View style={styles.header}>
          {usernameInput()}
          <View style={{
            flex: 75, flexDirection: 'row', padding: 5, backgroundColor: 'white', borderRadius: 10, elevation: 3,
          }}
          >
            <TouchableOpacity
              onPress={() => toggleSideBar({ navigation })}
              style={{ alignItems: 'center', justifyContent: 'center' }}
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
            <FilterModal style={styles.main} setAction={setFilterCondition} />
          </View>
        </View>
        {renderRecommendation()}
        {renderMainView()}
      </View>
      {renderScheduleList()}
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
