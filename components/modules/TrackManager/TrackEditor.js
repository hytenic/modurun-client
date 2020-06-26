import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as createdTrackInfoActions from '../../../redux/action/CreatedTrackInfo/creator';
import TrackMaster from '../TrackMaster/TrackMaster';
import googlePlaceApi from '../googleapis/place';
import QueryCandidate from './QueryCandidate';
import modurunAPI from '../API';
import { color } from 'react-native-reanimated';

const TrackEditor = ({updateCreatedTrack, getMyTracks}) => {
  const navigation = useNavigation();
  const [typing, setTypingStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [queryCandidates, setQueryCandidates] = useState([]);
  const [mapLocation, setMapLocation] = useState(null);

  const setTypingFalse = () => {
    setTypingStatus(false);
  };
  const setTypingTrue = () => {
    setTypingStatus(true);
  };

  const updateSearchQuery = (e) => {
    setSearchQuery(e.nativeEvent.text);
    googlePlaceApi.autoComplete({
      input: searchQuery,
      language: 'ko',
      offset: 3,
      components: 'country:kr',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') return setQueryCandidates([]);
        setQueryCandidates(json.predictions);
      });
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', setTypingFalse);
    return () => {
      Keyboard.removeListener('keyboardDidHide', setTypingFalse);
    };
  }, []);

  const renderEditor = () => {
    if (typing) return <></>;
    return (
      <TrackMaster
        mode="trackEditor"
        initialCamera={mapLocation || undefined}
        onCompleteEdit={(track) => {
          modurunAPI.tracks.createTrack(track)
            .then((res) => {
              updateCreatedTrack(track);
              if (res.ok) {
                navigation.navigate('CreatedTrackInfo');
                getMyTracks();
              }
            });
        }}
      />
    );
  };
  const renderRecommendation = () => {
    if (!typing) return <></>;
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        {queryCandidates.map((candidate) => <QueryCandidate data={candidate} onPress={(location) => setMapLocation(location)} />)}
        <View style={{ height: 100 }} />
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 1,
          borderWidth: 0,
          backgroundColor: 'white',
        }}
      >
        <TextInput
          onTouchStart={setTypingTrue}
          value={searchQuery}
          onChange={updateSearchQuery}
          placeholder="위치를 검색해주세요"
          style={{ flex: 90, height: 60, paddingLeft: 10 }}
        />
        <TouchableOpacity
          style={{
            flex: 20,
            height: '100%',
            backgroundColor: 'dodgerblue',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {renderRecommendation()}
      {renderEditor()}
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCreatedTrack: (track) => dispatch(createdTrackInfoActions.setCreatedTrack(track)),
  };
};

export default connect(null, mapDispatchToProps)(TrackEditor);
