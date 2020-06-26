/* eslint-disable react/jsx-props-no-spreading */
import { connect } from 'react-redux';
import React, { useState, useRef } from 'react';
import * as Location from 'expo-location';
import MapView, { Polyline, Marker, Callout } from 'react-native-maps';
import { Text, View, Platform } from 'react-native';
import styles from './style';
import Track from './Track';
import utils from './utils';

const { paleColor } = utils;

const ScheduledTrackViewer = ({
  curPosCamera,
  onRegionChange,
  onTrackSelected,
  schedules,
  initialCamera,
  moveOnMarkerPress,
}) => {
  const [mapWidth, setMapWidth] = useState('99%');
  const [selectedTrack, setSelectedTrack] = useState(null);

  const mapView = useRef();

  const reducedSchedules = schedules.reduce((acc, cur) => {
    const { track } = cur;
    const schedule = {
      scheduleTitle: cur.title,
      from: cur.scheduleFrom,
      to: cur.schedulTo,
      participants: cur.participants,
      userjoined: cur.userjoined,
      scheduleId: cur.id,
    };
    const { trackTitle } = track;
    if (!acc[trackTitle]) {
      acc[trackTitle] = {
        track,
        schedules: [],
      };
    }
    acc[trackTitle].schedules.push(schedule);
    return acc;
  }, {});

  const mappedSchedules = Object.values(reducedSchedules);

  const updateMapStyle = () => {
    setMapWidth('100%');
  };

  const syntheticInitialCamera = utils.makeCamera(initialCamera);

  // if (mapView.current && initialCamera) {
  //   mapView.current.setCamera(syntheticInitialCamera);
  // }

  const mapViewProps = {
    rotateEnabled: false,
    style: [styles.mapStyle, {
      width: mapWidth,
    }],
    showsUserLocation: true,
    onMapReady: () => {
      updateMapStyle();
    },
    moveOnMarkerPress: moveOnMarkerPress || false,
    onRegionChange: (region) => {
      // onTouchEnd로 콜백 위치 변경됨.
    },
    onTouchEnd: () => {
      // eslint-disable-next-line no-underscore-dangle
      const lastRegion = mapView.current.__lastRegion;
      onRegionChange(lastRegion);
    },
    initialCamera: initialCamera ? syntheticInitialCamera : curPosCamera,
  };

  const onMarkerPress = ({ schedules: relatedSchedules, track }) => {
    setSelectedTrack(track);
    onTrackSelected(relatedSchedules);
  };

  if (!curPosCamera) return <></>; // spinner should be here;

  const renderCalloutProps = (calloutProps) => {
    const decideMarginBottom = (index) => (index < calloutProps.length - 1 ? 10 : 0);
    return calloutProps.map((prop, i) => {
      const [key, value, keyBackgroundColor, keyColor, valueBackgroundColor, valueColor] = prop;
      return (
        <View key={key} style={[styles.callloutPropRow, { marginBottom: decideMarginBottom(i) }]}>
          <Text style={[styles.callloutPropKey(keyBackgroundColor, keyColor), { fontSize: 12 }]}>{key}</Text>
          <Text style={[styles.calloutPropValue(valueBackgroundColor, valueColor), { fontSize: 12 }]}>{value}</Text>
        </View>
      );
    });
  };

  const colors = {
    from: 'rgba(148, 87, 255, 1)',
    span: 'rgba(74, 167, 255, 1)',
    trackTitle: 'rgba(42, 176, 82, 1)',
    trackLength: 'rgba(255, 255, 255, 0)',
    participants: 'rgba(247, 149, 57, 1)',
    maleSpan: 'rgba(255, 255, 255, 0)',
    femaleSpan: 'rgba(255, 255, 255, 0)',
  };

  const callOut = (track) => {
    const {
      trackTitle,
      trackLength,
      origin,
      destination,
    } = track;

    const calloutProps = [
      ['길이', `${trackLength}m`, colors.trackLength, 'whrgba(0, 214, 167, 1)ite', paleColor(colors.trackLength)],
      ['시간(남)', utils.predictDuration(trackLength, 'm'), colors.maleSpan, 'rgba(0, 214, 167, 1)', paleColor(colors.maleSpan)],
      ['시간(여)', utils.predictDuration(trackLength, 'f'), colors.femaleSpan, 'rgba(0, 214, 167, 1)', paleColor(colors.femaleSpan)],
    ];

    return (
      <Callout tooltip>
        <View style={styles.calloutView}>
          <Text style={styles.calloutTitle}>{trackTitle}</Text>
          <View style={{ alignContent: 'space-between' }}>
            {renderCalloutProps(calloutProps)}
          </View>
        </View>
      </Callout>
    );
  };

  return (
    <MapView ref={mapView} {...mapViewProps}>
      {mappedSchedules.map((trackSchedules) => {
        const { track } = trackSchedules;
        return (
          <Track
            key={track.trackTitle}
            visible={track === selectedTrack}
            callOut={callOut(track)}
            onMarkerPress={onMarkerPress}
            track={track}
            data={trackSchedules}
          />
        );
      })}
    </MapView>
  );
};

const mapStateToProps = (state) => ({
  curPosCamera: state.trackMaster.userLocation.curPosCamera,
});

export default connect(mapStateToProps, null)(ScheduledTrackViewer);