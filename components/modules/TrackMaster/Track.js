/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Polyline } from 'react-native-maps';
import PropTypes from 'prop-types';
import MapMarker from './MapMarker';
import propShapes from './propShapes';
import exampleProps from './exampleProps';
import Route from './Route';

const Track = ({ data, track, visible, onMarkerPress, callOut }) => {
  const {trackTitle, route, origin, destination, trackLength} = track;

  const renderRoute = () => {
    if (!visible) return <></>;
    return <Route coordinates={route} />;
  };

  const onPress = () => {
    onMarkerPress(data);
  };

  return (
    <>
      <MapMarker title={trackTitle} callOut={callOut} description={"여기에 트랙 정보 넣어야 됨"} onPress={onPress} position={origin} />
      {renderRoute()}
    </>
  );
};

export default Track;
