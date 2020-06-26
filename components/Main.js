import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Keyboard, Alert, Dimensions, KeyboardAvoidingView, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import TrackManager from './modules/TrackManager';
import MyPage from './modules/MyPage';
import TrackMaster from './modules/TrackMaster/TrackMaster';
import FilterModal, { InputUsernameModal } from './modules/Modal';
import getEnvVars from '../environment';
import ScheduleManager from './modules/ScheduleManager';
import { getUserLocation, getFilterCondition } from './modules/utils';
import { getSchedules } from './modules/API/schedule';
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
    zIndex: 1,
    height: '100%',
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
    bottom: 30,
  },
  suggestion: {
    height: '15%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderBottomColor: 'lightgray',
    paddingBottom: 20,
    paddingTop: 10,
    paddingLeft: 15,
    zIndex: 10,
  },
});

const Main = () => {
  const navigation = useNavigation();
  const [typing, setTyping] = useState(false);
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

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
        pickedSearchedLocation(json.rtiesult.geometry.locaon);
        searched();
      }}
    >
      <Text>{prediction.structured_formatting.main_text}</Text>
      <Text style={{ color: 'grey' }}>{prediction.description.replace('대한민국 ', '')}</Text>
    </TouchableOpacity>
  ));

  const renderRecommendation = () => {
    if (searching) {
      // {/* <View style={styles.main}>
      // </View> */}
      return (
        <ScrollView style={{ marginTop: 80, flex: 1, zIndex: 10}}>
          {predictionsList}
        </ScrollView>
      );
    }
    return (<></>);
  };

  const renderMainView = () => {
    if (!searching) {
      return (
        <TrackMaster mode="scheduleViewer" schedules={schedules} initialCamera={location} moveOnMarkerPress />
      );
    }
    return (<></>);
  };

  const addSchedule = () => {
    navigation.navigate('SchedulerScreen');
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
    <View style={searching ? { height: '100%' } : styles.container}>
      <View style={searching ? { zIndex: 0, flex: 1 } : styles.main}>
        <View style={styles.header}>
          <View style={{ flex: 75, flexDirection: 'row', padding: 5, backgroundColor: 'white', borderRadius: 10, elevation: 3 }}>
            <TouchableOpacity
              onPress={() => toggleSideBar({ navigation })}
              style={{alignItems: 'center', justifyContent: 'center'}}
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
          <View style={searching ? { display: 'none' } : styles.filterButton}>
            <FilterModal style={styles.main} />
          </View>
        </View>
        {renderRecommendation()}
        {renderMainView()}
        {/* <View style={styles.filterButton}>
          <FilterModal style={styles.main} />
        </View> */}
        <View style={styles.addButton}>
          <TouchableOpacity onPress={addSchedule} style={styles.plusButton}>
            <Icon style={{textAlign: 'center', textAlignVertical: 'center'}} name="plus" color="white" size={50} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Main;
