import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Keyboard, Dimensions, ScrollView, StatusBar, TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TrackManager from './modules/TrackManager';
import MyPage from './modules/MyPage';
import TrackMaster from './modules/TrackMaster/TrackMaster';
import FilterModal, { InputUsernameModal, articipateModal, ParticipateModal } from './modules/Modal';
import getEnvVars from '../environment';
import ScheduleManager from './modules/ScheduleManager';
import { getUserLocation, getFilterCondition } from './modules/utils';
import { getSchedules } from './modules/API/schedule';
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
  },
  userLocationBtnView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    position: 'absolute',
    bottom: 40,
    right: 40,
    elevation: 5,
  },
});

const Main = () => {
  const navigation = useNavigation();
  const [typing, setTyping] = useState(false);
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [clickedTrack, setClickedTrack] = useState(false);
  const [ParticipateClicked, setParticipateClicked] = useState(false);
  const [scheduleId, setscheduleId] = useState(1);
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

  const filter = getFilterCondition();
  const [filterCondition, setFilterCondition] = useState(filter);
  const { apiKey } = getEnvVars('dev');

  const goUserLocation = async () => {
    try {
      const loca = await getUserLocation();
      setLocation({
        ...location,
        latitude: loca.latitude,
        longitude: loca.longitude,
      });
      return loca;
    } catch (e) {
      console.log('go user location btn ', e);
    }
  };

  const getNearSchedules = async (loca) => {
    const scheduleData = await getSchedules(filterCondition, loca);
    if (!scheduleData && scheduleData === false) {
      setSchedules([]);
    } else {
      setSchedules(scheduleData);
    }
  };

  useEffect(() => { // 처음으로 랜더링 될 때
    goUserLocation()
      .then((intialLocation) => {
        getNearSchedules(intialLocation);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const setTypingFalse = () => {
    setTyping(false);
  };

  const setTypingTrue = () => {
    setTyping(true);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', setTypingFalse);
    Keyboard.addListener('keyboardDidShow', setTypingTrue);
    return () => {
      Keyboard.removeListener('keyboardDidHide', setTypingFalse);
      Keyboard.removeListener('keyboardDidShow', setTypingTrue);
    };
  }, []);

  useEffect(() => { // 일정을 추가하고 메인 화면으로 왔을 때 작동
    const unsubscribe = navigation.addListener('focus', () => {
      getNearSchedules(location);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => { // 필터로 검색하거나 위치 검색을 통해 위치가 변경 됐을 때 일정 요청
    getNearSchedules(location);
  }, [filterCondition, location]);

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
      <Text>{prediction.structured_formatting.main_text}</Text>
      <Text style={{ color: 'grey' }}>{prediction.description.replace('대한민국 ', '')}</Text>
    </TouchableOpacity>
  ));

  const renderRecommendation = () => {
    if (searching) {
      return (
        <ScrollView keyboardShouldPersistTaps="always" style={{ marginTop: 80, flex: 1 }}>
          {predictionsList}
        </ScrollView>
      );
    }
    return (<></>);
  };

  const scheduleSelecting = (selectedSchedule) => {
    setClickedTrack(true);
    setSelectedSchedules(selectedSchedule);
  };

  const addSchedule = () => {
    navigation.navigate('SchedulerScreen');
  };

  const renderScheduleList = (onClickedParticpate) => {
    if (clickedTrack) {
      return (
        <View style={{ flex: 4 }}>
          <ScheduleList schedules={selectedSchedules} onClickedParticpate={onClickedParticpate} />
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
            moveOnMarkerPress
            onTrackSelected={scheduleSelecting}
            camera={location}
          />
          <TouchableHighlight style={styles.userLocationBtnView} onPress={goUserLocation} activeOpacity={0.5} underlayColor="#03D6A7">
            <FontAwesomeIcon style={{ marginRight: 2 }} name="location-arrow" color="rgba(30, 124, 255, 0.8)" size={33} />
          </TouchableHighlight>
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

  // 일정 참가가 눌렸을 때
  const onClickedParticpate = (schId) => {
    setParticipateClicked(true);
    setscheduleId(schId);
  };

  return (

    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="dodgerblue" />
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

          <View style={searching ? { display: 'none' } : styles.filterButton}>
            <FilterModal style={styles.main} setAction={setFilterCondition} />
          </View>
          <View>
            <ParticipateModal style={styles.main} visible={ParticipateClicked} setVisible={setParticipateClicked} scheduleId={scheduleId} />
          </View>
        </View>
        {renderRecommendation()}
        {renderMainView()}
      </View>
      {renderScheduleList(onClickedParticpate)}
    </View>
  );
};

export default Main;
