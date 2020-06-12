/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, Text } from 'react-native';
import { Polyline } from 'react-native-maps';

const Route = ({coordinates}) => {
  const polyLineProps = {
    coordinates,
    strokeColor: 'rgba(45,38,255,0.5)',
    strokeWidth: 8,
  };

  return (
    <Polyline {...polyLineProps} />
  );
};

export default Route;
