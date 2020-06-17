import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrackMaster from '../TrackMaster/TrackMaster';

const TrackEditor = () => {
  const [typing, setTypingStatus] = useState(false);

  const setTypingFalse = () => setTypingStatus(false);
  const setTypingTrue = () => setTypingStatus(true);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', setTypingTrue);
    Keyboard.addListener('keyboardDidHide', setTypingFalse);
    return () => {
      Keyboard.removeListener('keyboardDidShow', setTypingTrue);
      Keyboard.removeListener('keyboardDidHide', setTypingFalse);
    };
  }, []);

  const renderEditor = () => {
    if (typing) return <></>;
    return (
      <TrackMaster
        mode="trackEditor"
      />
    );
  };
  const renderRecommendation = () => {
    if (!typing) return <></>;
    return (
      <View>
        <Text>여기다가 추천 검색어 렌더링해야 됨</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', elevation: 1, borderWidth: 0 }}>
        <TextInput placeholder="위치를 검색해주세요" style={{ flex: 80, height: 60, paddingLeft: 10 }} />
        <TouchableOpacity style={{ flex: 20, height: '100%', backgroundColor: 'dodgerblue', justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {renderRecommendation()}
      {renderEditor()}
    </View>
  );
};

export default TrackEditor;
