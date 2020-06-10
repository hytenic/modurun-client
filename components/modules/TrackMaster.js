/* eslint-disable react/jsx-props-no-spreading */
import { connect } from 'react-redux';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { View } from 'react-native';
import styles from './TrackMaster/style';
import utils from './TrackMaster/utils';
import TrackEditor from './TrackMaster/TrackEditor';
import TrackViewer from './TrackMaster/TrackViewer';
import * as actions from '../../redux/action/TrackMaster/creators';

const TrackMaster = ({ setUserLocation }) => {
  const [editable, setEditable] = useState(false);
  const [followUser, setFollowUser] = useState(false);
  const [tracks, setTracks] = useState([]);
  const toggleFollowUser = () => setFollowUser(!followUser);
  const toggleEditMode = () => setEditable(!editable);
  const addTrack = (track) => setTracks([...tracks, track]);

  const requestGeoLocationPermission = async () => {
    const {
      status,
      // permissions,
    } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // setErrorMsg('Permission to access location was denied');
    }
    const curPosition = await Location.getCurrentPositionAsync({});
    const { coords } = curPosition;
    const curPosCamera = undefined || {
      center: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      altitude: coords.altitude,
      pitch: 0,
      heading: 0,
      zoom: 15,
    };
    setUserLocation({ curPosition, curPosCamera });
  };

  const renderMapView = () => {
    if (editable) return <TrackEditor />;
    return <TrackViewer />;
  };

  return (
    <View onLayout={requestGeoLocationPermission} style={styles.container}>
      <View>
        {utils.toggleContainer('FollowUser', followUser, toggleFollowUser)}
        {utils.toggleContainer('EditMode', editable, toggleEditMode)}
        {utils.buttonContainer('Add Track', addTrack)}
      </View>
      <View style={{ flex: 1 }}>
        {renderMapView()}
      </View>
    </View>
  );
};

TrackMaster.propTypes = {
  setUserLocation: PropTypes.func.isRequired,
};

export default connect(null, { ...actions })(TrackMaster);
