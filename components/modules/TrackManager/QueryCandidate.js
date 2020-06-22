import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import googlePlaceApi from '../googleapis/place';

const QueryCandidate = ({data, onPress}) => {
  // console.log(Object.keys(data));
  const mainText = data.structured_formatting.main_text;
  const { description, place_id } = data;

  const searchPlace = () => {
    googlePlaceApi.details({
      place_id,
      language: 'ko',
      fields: 'photo,geometry',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') return;
        const latLng = json.result.geometry.location;
        const mappedLatLng = {
          latitude: latLng.lat,
          longitude: latLng.lng,
        };
        if (!onPress) return;
        onPress(mappedLatLng);
      });
  };

  return (
    <TouchableOpacity style={{padding: 10, borderBottomColor: 'rgb(230,230,230)', borderBottomWidth: 1}} onPress={searchPlace}>
      <Text>{mainText}</Text>
      <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>{description}</Text>
    </TouchableOpacity>
  );
};

export default QueryCandidate;
