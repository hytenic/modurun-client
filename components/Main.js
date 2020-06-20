import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Scheduler from './modules/Scheduler/Scheduler';
import TrackManager from './modules/TrackManagerTab';
import MyPage from './modules/MyPage';
import TrackMasterContainer from './modules/TrackMasterContainer';
import FilterModal from './modules/Modal';
import getEnvVars from '../environment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f15c5c',
    alignItems: 'center',
    padding: 5,
  },
  main: {
    flex: 10,
    // backgroundColor: 'yellow',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 5,
  },
  search: {
    backgroundColor: 'white',
    marginLeft: 10,
    width: 320,
    padding: 5,
  },
  filterButton: {
    position: 'absolute',
    right: 60,
    top: 19,
  },
  suggestion: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 0.5,
    padding: 5,
  },
});

const Main = () => {
  const navigation = useNavigation();
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [searching, setSearching] = useState(false);
  const { apiKey } = getEnvVars('dev');

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

  const predictionsList = predictions.map((prediction) => {
    return (
      <TouchableOpacity
        key={prediction.id}
        style={styles.suggestion}
        onPress={async () => {
          const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${apiKey}`;
          const result = await fetch(apiUrl);
          const json = await result.json();
          // console.log(json.result.geometry.location);
          setSearching(false);
        // onChangeDestination(json.result.geometry.location);
        }}
      >
        <Text>{prediction.description}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          toggleSideBar({ navigation });
        }}
        >
          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
            style={{ width: 25, height: 25, marginLeft: 15 }}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.search}
          placeholder="검색"
          value={destination}
          onTouchStart={() => {
            setSearching(true);
          }}
          onChangeText={(text) => {
            onChangeDestination(text);
          }}
          onSubmitEditing={() => {
            setSearching(false);
          }}
        />
      </View>
      <View style={styles.main}>
        {
        searching === true
          ? (
            <View style={styles.main}>
              {predictionsList}
            </View>
          )
          : <TrackMasterContainer mode="scheduleViewer" />
      }


        <View style={styles.filterButton}>
          <FilterModal style={styles.main} />
        </View>
      </View>
    </View>
  );
};


const Drawer = createDrawerNavigator();

function SideBar() {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Scheduler" component={Scheduler} />
      <Drawer.Screen name="TrackManager" component={TrackManager} />
      <Drawer.Screen name="MyPage" component={MyPage} />
    </Drawer.Navigator>
  );
}

export default SideBar;
