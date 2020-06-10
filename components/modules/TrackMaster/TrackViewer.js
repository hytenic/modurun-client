/* eslint-disable react/jsx-props-no-spreading */
import { connect } from 'react-redux';
import React, { useState } from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import styles from './style';

const TrackViewer = ({ curPosCamera }) => {
  const [mapWidth, setMapWidth] = useState('99%');
  const updateMapStyle = () => {
    setMapWidth('100%');
  };

  const mapViewProps = {
    rotateEnabled: false,
    style: [styles.mapStyle, {
      width: mapWidth,
    }],
    showsUserLocation: true,
    onMapReady: () => {
      updateMapStyle();
    },
  };

  const renderIfHasLocation = () => {
    if (!curPosCamera) return <></>; // spinner should be here;
    return <MapView initialCamera={curPosCamera} {...mapViewProps} />;
  };

  return (
    renderIfHasLocation()
  );
};

const mapStateToProps = (state) => ({
  curPosCamera: state.trackMaster.userLocation.curPosCamera,
});

export default connect(mapStateToProps, null)(TrackViewer);
