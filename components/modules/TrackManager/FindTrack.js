import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
import TrackList from '../TrackList';
import modurunAPI from '../API/index';

const FindTrack = ({ tracks }) => {
  const [selectedFilter, setSelectedFilter] = useState('recent');

  return (
    <View style={{ marginVertical: 5 }}>
      <View style={{ borderBottomWidth: 0, padding: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput placeholder="1km이내" style={{ backgroundColor: 'white', height: 40, paddingLeft: 10, borderRadius: 5, elevation: 2, marginBottom: 10, flex: 1, marginRight: 30 }} />
          <TextInput placeholder="0km 이상" style={{ backgroundColor: 'white', height: 40, paddingLeft: 10, borderRadius: 5, elevation: 2, marginBottom: 10, flex: 1, marginRight: 10 }} />
          <TextInput placeholder="1km 이하" style={{ backgroundColor: 'white', height: 40, paddingLeft: 10, borderRadius: 5, elevation: 2, marginBottom: 10, flex: 1 }} />
        </View>
        <View style={{ backgroundColor: 'white', elevation: 2, borderRadius: 5 }}>
          <Picker
            style={{ height: 40 }}
            selectedValue={selectedFilter}
            onValueChange={(itemValue) => {
              setSelectedFilter(itemValue);
            }}
          >
            <Picker.Item label="별점순" value="rate" />
            <Picker.Item label="최신순" value="recent" />
          </Picker>
        </View>
      </View>
      <TrackList showAdd tracks={tracks} />
    </View>
  );
};

export default FindTrack;
