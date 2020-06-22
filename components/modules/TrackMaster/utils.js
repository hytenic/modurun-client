import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './style';
import mapBoxApi from '../mapboxapis/direction';

// graphhopperApi
// const getRoutes = (markers) => {
//   const baseUrl = 'https://graphhopper.com/api/1/route?';
//   const params = {
//     vehicle: 'foot',
//     key: '75cd8574-6fe0-414c-959b-a86532627a7f',
//     points_encoded: 'false',
//   };
//   markers.forEach((mark, i) => {
//     params[`point${i}`] = [mark.latitude, mark.longitude];
//   });
//   const compUrl = baseUrl + Object.keys(params).map((key) => {
//     const mappedKey = key.match(/point\d/) ? 'point' : key;
//     const value = Array.isArray(params[key]) ? params[key].join(',') : params[key];
//     return `${mappedKey}=${value}`;
//   }).join('&');

//   // eslint-disable-next-line no-undef
//   return fetch(compUrl)
//     .then((res) => res.json())
//     .then((json) => {
//       console.log(json);
//       const { coordinates } = json.paths[0].points;
//       const mappedCoords = coordinates.reduce((acc, latLongArr) => {
//         const [longitude, latitude] = latLongArr;
//         return acc.concat({
//           latitude,
//           longitude,
//         });
//       }, []);
//       return {
//         routes: mappedCoords,
//         whole: json,
//       };
//     });
// };

const getRoutes = (markers) => {
  return mapBoxApi.findRoute(markers)
    .then((res) => res.json())
    .then((json) => {
      const coords = json.routes[0].geometry.coordinates;
      const mappedCoords = coords.reduce((acc, latLongArr) => {
        const [longitude, latitude] = latLongArr;
        return acc.concat({
          latitude,
          longitude,
        });
      }, []);
      return {
        routes: mappedCoords,
        whole: json,
      };
    });
  // eslint-disable-next-line no-undef
};


const toggleContainer = (name, state, toggleAction) => (
  <TouchableOpacity
    onPress={toggleAction}
    style={styles.toggleContainer(state)}
  >
    <Text style={styles.toggleButton(state)}>
      {`${name} ${state ? '활성화됨' : '비활성화됨'}`}
    </Text>
  </TouchableOpacity>
);

const buttonContainer = (text, callback) => (
  <TouchableOpacity
    onPress={callback}
    style={styles.toggleContainer(false)}
  >
    <Text style={styles.toggleButton(false)}>
      {text}
    </Text>
  </TouchableOpacity>
);

const paleColor = (rgbaColor) => {
  const colorString = rgbaColor.match(/\((.+)\)/)[1];
  const [r, g, b, a] = colorString.split(/,\s?/);
  const reconstructedColor = `rgba(${r},${g},${b},${Number(a) * 0.1})`;
  return reconstructedColor;
};

const logStringified = (data) => console.log(JSON.stringify(data));

const makeCamera = (location) => ({
  altitude: 50.19999694824219,
  center: location,
  zoom: 15,
  pitch: 0,
  heading: 0,
});

export default {
  getRoutes,
  toggleContainer,
  buttonContainer,
  logStringified,
  paleColor,
  makeCamera,
};
