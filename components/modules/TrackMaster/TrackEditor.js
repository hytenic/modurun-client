/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Track from './Track';
import styles from './style';
import utils from './utils';
import MapMarker from './MapMarker';


const Icon = {
  FontAwesome,
  MaterialCommunity,
};

const TrackMaster = ({ curPosCamera }) => {
  const [mapWidth, setMapWidth] = useState(99);
  // const [errorMsg, setErrorMsg] = useState(null);
  const [markable, setMarkable] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [markerId, setMarkerId] = useState(0);
  const [touchPos, setTouchPos] = useState({ x: -1000, y: 0 });
  const [routes, setRoutes] = useState([]);
  const [routeHistory, setRouteHistory] = useState([]);
  const [markerHistory, setMarkerHistory] = useState([]);

  const [layoutInfo, setLayoutInfo] = useState(null);
  const [regionInfo, setRegionInfo] = useState({ start: {} });

  // Init mapView(For activating follow user button)
  const updateMapStyle = () => {
    setMapWidth('100%');
  };


  const pushRouteHistory = (newRoutes) => {
    setRouteHistory([...routeHistory, newRoutes]);
  };

  const pushMarkerHistory = (newMarkers) => {
    setMarkerHistory([...markerHistory, newMarkers]);
  };

  const mapViewInfo = {
    layout: layoutInfo,
    region: {
      ...regionInfo,
      start: {
        latitude: regionInfo.latitude - regionInfo.latitudeDelta / 2,
        longitude: regionInfo.longitude - regionInfo.longitudeDelta / 2,
      },
    },
  };

  const correctHiding = {
    x: 0,
    y: -32,
  };

  // eslint-disable-next-line no-shadow
  const processMarkers = (markers) => markers.map((marker) => {
    if (marker.chain) return markers[0];
    return marker;
  });

  const putMarker = (markerPos) => {
    if (markers.length && markers[markers.length - 1].chain) return;
    const updatedMarkers = [...markers, {
      ...markerPos,
      id: markerId,
    }];
    pushMarkerHistory(updatedMarkers);
    setMarkers(updatedMarkers);
    setMarkerId(markerId + 1);
    if (markers.length === 0) return;
    const allMarkes = markers.concat(markerPos);
    utils.getRoutes(allMarkes)
      .then((newRoutes) => {
        pushRouteHistory(newRoutes);
        setRoutes(newRoutes);
      });
  };

  const modifyMarker = (id, update) => {
    const updatedMarkers = markers.map((marker) => {
      if (marker.id !== id) return marker;
      const newMark = {
        id: marker.id,
        latitude: update.latitude,
        longitude: update.longitude,
      };
      return newMark;
    });
    const processed = processMarkers(updatedMarkers);
    utils.getRoutes(processed)
      .then((newRoutes) => {
        setMarkers(updatedMarkers);
        pushMarkerHistory(updatedMarkers);
        pushRouteHistory(newRoutes);
        setRoutes(newRoutes);
      });
  };

  const clearMarker = () => {
    pushRouteHistory([]);
    pushMarkerHistory([]);
    setMarkers([]);
    setRoutes([]);
  };

  const deletePrevMarker = () => {
    const truncatedMarkers = markers.slice(0, markers.length - 1);
    if (truncatedMarkers.length < 2) {
      setRoutes([]);
      setMarkers(truncatedMarkers);
      return;
    }
    utils.getRoutes(truncatedMarkers)
      .then((newRoutes) => {
        setMarkers(truncatedMarkers);
        pushMarkerHistory(truncatedMarkers);
        pushRouteHistory(newRoutes);
        setRoutes(newRoutes);
      });
  };

  const completeTrack = () => {
    const updatedMarkers = [...markers, { chain: true }];
    const processed = processMarkers(updatedMarkers);
    utils.getRoutes(processed)
      .then((newRoutes) => {
        setMarkers(updatedMarkers);
        pushMarkerHistory(updatedMarkers);
        pushRouteHistory(newRoutes);
        setRoutes(newRoutes);
      });
  };

  const onMarkTouchEnd = (e) => {
    if (!markable) return;
    const { region } = mapViewInfo;
    const relativeX = (e.nativeEvent.locationX + correctHiding.x) / mapViewInfo.layout.width;
    const relativeY = (e.nativeEvent.locationY + correctHiding.y) / mapViewInfo.layout.height;
    const syntheticLatitude = region.start.latitude + (1 - relativeY) * region.latitudeDelta;
    const syntheticLongitude = region.start.longitude + relativeX * region.longitudeDelta;
    const syntheticLocation = {
      latitude: syntheticLatitude,
      longitude: syntheticLongitude,
    };
    putMarker(syntheticLocation);
    setMarkable(false);
  };

  const initTouchPos = (e) => {
    const { width, height } = e.nativeEvent;
    setTouchPos({
      x: width / 2,
      y: height / 2,
    });
  };

  const startMark = () => {
    setMarkable(true);
  };

  const trackTouch = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    setTouchPos({
      x: locationX,
      y: locationY,
    });
  };

  const renderMarkers = () => {
    const indexedMarkers = markers.map((marker, i) => ({ ...marker, index: i }));
    const visibleMarkers = indexedMarkers.filter((marker) => {
      const { start, longitudeDelta, latitudeDelta } = mapViewInfo.region;
      if (marker.latitude < start.latitude) return false;
      if (marker.longitude < start.longitude) return false;
      if (marker.latitude > start.latitude + latitudeDelta) return false;
      if (marker.longitude > start.longitude + longitudeDelta) return false;
      if (marker.chain) return false;
      return true;
    });

    return visibleMarkers.map((marker) => (
      <MapMarker
        draggable
        key={marker.id}
        position={marker}
        tag={marker.index}
        onDragEnd={(e) => modifyMarker(marker.id, e.nativeEvent.coordinate)}
      />
    ));
  };

  const mapViewProps = {
    rotateEnabled: false,
    onRegionChangeComplete: (region) => setRegionInfo(region),
    onLayout: (e) => setLayoutInfo(e.nativeEvent.layout),
    style: [styles.mapStyle, { width: mapWidth }],
    showsUserLocation: true,
    onMapReady: () => {
      updateMapStyle();
    },
  };

  return (
    <View style={styles.container}>
      <View onTouchMove={trackTouch} onTouchEnd={onMarkTouchEnd} style={styles.toolBar}>
        <TouchableOpacity
          onLayout={initTouchPos}
          onPressIn={startMark}
          style={styles.toolBarIcon()}
        >
          <Icon.FontAwesome name="map-marker" size={30} color="crimson" />
        </TouchableOpacity>
        <TouchableOpacity onPress={clearMarker} style={styles.toolBarIcon()}>
          <Icon.FontAwesome name="trash" size={30} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity onPress={completeTrack} style={styles.toolBarIcon()}>
          <Icon.FontAwesome name="magic" size={30} color="dodgerblue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={deletePrevMarker} style={styles.toolBarIcon()}>
          <Icon.FontAwesome name="undo" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.addMarker(touchPos, correctHiding)}>
          <Icon.FontAwesome name="map-marker" style={{ display: markable ? 'flex' : 'none' }} size={30} color="#ff385f" />
        </View>
      </View>
      <MapView camera={curPosCamera || undefined} {...mapViewProps}>
        {renderMarkers()}
        <Track data={routes} isPreview visibleMarker={false} />
      </MapView>
    </View>
  );
};


const mapStateToProps = (state) => ({
  curPosCamera: state.trackMaster.userLocation.curPosCamera,
});

export default connect(mapStateToProps, null)(TrackMaster);
