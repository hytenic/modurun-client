import * as Location from 'expo-location';
import trackManagerActions from '../../../redux/action/TrackManager/creator';
import store from '../../../redux/store';
import modurunAPI from '../API/index';

async function getUserPos() {
  const { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
  }
  const location = await Location.getCurrentPositionAsync({ accuracy: 3 });
  return location.coords;
}

function getBigArea(location) {
  const { latitude, longitude } = location;
  return {
    latitude: Number(latitude) - 20,
    longitude: Number(longitude) - 20,
    latitudeDelta: 40,
    longitudeDelta: 40,
  };
}

function getTracksForFilter(filter) {
  getUserPos()
    .then((userPos) => {
      const bigArea = getBigArea(userPos);
      return modurunAPI.tracks.getTracks(filter, userPos, bigArea);
    })
    .then((res) => res.text())
    .then((json) => {
      // console.log('PARSED\n', JSON.parse(json));
      store.dispatch(trackManagerActions.setFoundTracks(JSON.parse(json)));
    });
}

export default {
  getUserPos,
  getBigArea,
  getTracksForFilter,
};
