/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Polyline } from 'react-native-maps';
import MapMarker from './MapMarker';

const Track = ({ isPreview, data, tag, visibleMarker = true }) => {
  const [visibleRoute, setVisibleRoute] = useState(false);

  const polyLineProps = () => ({
    coordinates: data,
    strokeColor: 'rgba(45,38,255,0.5)',
    strokeWidth: 8,
  });

  const onMarkerPress = () => {
    setVisibleRoute(!visibleRoute);
  };

  const renderMarker = () => {
    if (!visibleMarker) return <></>;
    return (
      <MapMarker
        position={data[0]}
        onPress={onMarkerPress}
        tag={tag}
      />
    );
  };

  const renderRoute = () => {
    if (!isPreview && !visibleRoute) return <></>;
    return <Polyline {...polyLineProps()} />;
  };

  return (
    <>
      {renderMarker()}
      {renderRoute()}
    </>
  );
};

export default Track;
