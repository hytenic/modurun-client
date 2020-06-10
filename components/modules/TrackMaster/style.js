import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  mapStyle: {
    height: '100%',
  },
  toggleContainer(toggled) {
    return {
      backgroundColor: toggled ? 'black' : 'lightgrey',
      paddingVertical: 9,
      alignItems: 'center',
      borderBottomWidth: 1,
    };
  },
  toggleButton(toggled) {
    return {
      color: toggled ? 'white' : 'black',
    };
  },
  toolBar: {
    position: 'absolute',
    zIndex: 100,
    left: 0,
    flexDirection: 'row',
  },
  simplePadding: {
    color: 'white',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
  },
  markerOrder: {
    paddingBottom: 0,
    backgroundColor: '#545454',
    textAlign: 'center',
    color: 'white',
    borderRadius: 5,
  },
  markerShadow: {
    width: 10,
    height: 7,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    zIndex: -10,
  },
  toolBarIcon(color = 'rgba(255,255,255,0.9)') {
    return {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      padding: 5,
      backgroundColor: color,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    };
  },
  addMarker(touchPos, correctHiding) {
    return {
      position: 'absolute',
      left: touchPos.x + correctHiding.x - 17 / 2 || 0,
      top: touchPos.y + correctHiding.y - 30.5 || 0,
    };
  },
});

export default styles;
