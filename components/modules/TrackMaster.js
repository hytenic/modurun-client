import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';


const TrackMaster = () => {
  const [location, setLocation] = useState(null);
  const [mapWidth, setMapWidth] = useState('99%');
  const [errorMsg, setErrorMsg] = useState(null);
  const [followUser, setFollowUser] = useState(false);

  const updateMapStyle = () => setMapWidth('100%');

  const requestGeoLocationPermission = async () => {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    const curPosition = await Location.getCurrentPositionAsync({});
    setLocation(curPosition);
  };

  let text = 'Waiting...';
  let userPosition = null;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    userPosition = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0014,
      longitudeDelta: 0.0014,
    };
  }

  return (
    <View style={styles.container}>
      <View style={{ height: 90 }}>
        <Text>{text}</Text>
      </View>
      <View>
        <View style={{ position: 'absolute', zIndex: 100, left: 0, backgroundColor: 'white', flexDirection: 'row'}}>
          <TouchableOpacity onPress={} style={{ padding: 10, backgroundColor: 'red' }}>
            <Text>마커통</Text>
          </TouchableOpacity>
        </View>
        <MapView
          region={followUser ? userPosition || undefined : undefined}
          // onRegionChange={(region) => console.log(region)}
          showsUserLocation
          style={[styles.mapStyle, { width: mapWidth }]}
          onMapReady={() => {
            requestGeoLocationPermission();
            updateMapStyle();
          }}
        >
          <Marker coordinate={userPosition || { latitude: 0, longitude: 0 }}>
            {/* <View style={{ backgroundColor: 'black', borderRadius: 10, padding: 10}}>
              <Text style={{ color: 'white' }}>나</Text>
            </View> */}
          </Marker>
        </MapView>


        <TouchableOpacity onPress={() => setFollowUser(!followUser)} style={styles.followContainer(followUser)}>
          <Text style={styles.followButton(followUser)}>
            {`FollowUser ${followUser ? '활성화됨' : '비활성화됨'}`}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    // width: '100%',
    height: 300,
  },
  followContainer(followUser) {
    return {
      backgroundColor: followUser ? 'black' : 'lightgrey',
      paddingVertical: 9,
      alignItems: 'center',
    };
  },
  followButton(followUser) {
    return {
      color: followUser ? 'white' : 'black',
    };
  },
});


export default TrackMaster;
