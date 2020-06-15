import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Image, TextInput,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Scheduler from './modules/Scheduler';
import TrackManager from './modules/TrackManagerTab';
import MyPage from './modules/MyPage';
import TrackMasterContainer from './modules/TrackMasterContainer';
import FilterModal from './modules/FilterModal';
import getEnvVars from '../environment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  header: {
    flex: 1,
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
    backgroundColor: 'white',
    borderWidth: 0.5,
    padding: 5,
  }
});

const Main = ({navigation}) => {
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState([]);
  const { apiKey } = getEnvVars('prod');

  const toggleSideBar = ({navigation}) => {
    navigation.openDrawer();
  };

  const onChangeDestination = async (text) => {
    // call place api
    setDestination(text);
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&language=ko&input=${text}`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      setPredictions(json.predictions);
    } catch (e) {
      console.error(e);
    }
    
  }

  const predictionsList = predictions.map((prediction) => {
    console.log(prediction);
    return (
    <TouchableOpacity
      key={prediction.id}
      style={styles.suggestion}
      onPress={async () => {
        console.log('hello');
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${apiKey}`
        const result = await fetch(apiUrl);
        const json = await result.json();
        console.log(json.result.geometry.location);
      }}
    >
      <Text>{prediction.description}</Text>
    </TouchableOpacity>
    );
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
        toggleSideBar({navigation});
      }}
      >
        <Image
          source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
          style={{ width: 25, height: 25, marginLeft: 15 }}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.search}
        placeholder='검색'
        value={destination}
        onChangeText={(text) => {
          onChangeDestination(text);
        }}
      />
      </View>
      {predictionsList}
      <View style={styles.main}>
        <TrackMasterContainer mode='scheduleViewer' />
        
          <View style={styles.filterButton}>
            <FilterModal style={styles.main}/>
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

