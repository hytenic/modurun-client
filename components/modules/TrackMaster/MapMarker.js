/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';


export default function MapMarker({ position, tag, onDragEnd, onPress, draggable }) {
  const markerProps = (marker) => ({
    draggable,
    onDragEnd,
    onPress,
    tracksViewChanges: false,
    tracksInfoWindowChanges: false,
    key: marker.id,
    coordinate: marker,
    style: {
      zIndex: 100,
    },
  });

  return (
    <Marker {...markerProps(position)}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.markerOrder}>{tag}</Text>
        <Icon name="map-marker" style={{ position: 'absolute', bottom: 0, left: 11 }} size={30} color="#rgba(0,0,0,0.6)" />
        <Icon name="map-marker" size={30} color="#cf0029" />
        <View style={styles.markerShadow} />
      </View>
    </Marker>
  );
}
