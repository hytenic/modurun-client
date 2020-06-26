import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
import TrackList from '../TrackList';
import styles from './styles';

const FindTrack = ({ tracks, onFilterSet }) => {
  const [orderFilter, setOrderFilter] = useState('recent');
  const [input, setInput] = useState({
    maxLength: '',
    distance: '',
    rate: '',
    order: '',
  });
  const [trackfilter, setTrackFilter] = useState({
    maxLength: 3000,
    distance: 1000,
    rate: false,
    recent: true,
  });

  useEffect(() => {
    onFilterSet(trackfilter);
  }, []);

  const convertFilterInput = (filterName, filterInput) => {
    if (filterName === 'minLength') return Number(filterInput) * 1000;
    if (filterName === 'maxLength') return Number(filterInput) * 1000;
    if (filterName === 'distance') return Number(filterInput) * 1000;
  };

  const makeTrackFilterUpdater = (filterName, value) => {
    return () => {
      const newFilterValue = value || convertFilterInput(filterName, input[filterName]);
      const newFilter = {
        ...trackfilter,
        [filterName]: newFilterValue,
      };
      onFilterSet(newFilter);
      setTrackFilter(newFilter);
    };
  };

  const makeInputUpdater = (filterName, invalidExp) => {
    return (e) => {
      const textInput = e.nativeEvent.text;
      // eslint-disable-next-line valid-typeof
      const invalidInput = textInput.match(invalidExp);
      if (invalidInput) return;
      setInput({ ...input, [filterName]: textInput });
    };
  };

  return (
    <View style={{ marginVertical: 5 }}>
      <View style={{ borderBottomWidth: 0, padding: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            keyboardType="numeric"
            placeholder="1km이내"
            onChange={makeInputUpdater('distance', /\D/)}
            onEndEditing={makeTrackFilterUpdater('distance')}
            style={[styles.filterInput, { marginRight: 10 }]}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="길이 0km 이상"
            onChange={makeInputUpdater('minLength', /\D/)}
            onEndEditing={makeTrackFilterUpdater('minLength')}
            style={[styles.filterInput, { marginRight: 10 }]}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="길이 3km 이하"
            onChange={makeInputUpdater('maxLength', /\D/)}
            onEndEditing={makeTrackFilterUpdater('maxLength')}
            style={[styles.filterInput]}
          />
        </View>
        <View style={{ backgroundColor: 'white', elevation: 2, borderRadius: 5 }}>
          <Picker
            style={{ height: 40 }}
            selectedValue={orderFilter}
            onValueChange={(itemValue) => {
              setOrderFilter(itemValue);
              setTrackFilter({ ...trackfilter, recent: itemValue === 'recent' });
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
