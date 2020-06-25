import React, { useState, useRef } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
// import styles from './styles';
import * as actions from '../../../redux/action/SingleTrackViewer/creator';

const styles = StyleSheet.create({
  entryContainer: {
    margin: 10,
    elevation: 2,
    borderWidth: 0,
  },
  titleContainer: {
    padding: 10,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailContainer: {

  },
  title: {
    fontSize: 20,
    color: 'white',
    flex: 75,
  },
  titleButtonContainer: {
    flex: 25,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  propRowContainer: {
    flexDirection: 'row',
  },
  propRowKey: {
    padding: 5,
    borderRadius: 10,
    color: 'white',
    margin: 5,
  },
  propRowValue: {
    padding: 5,
    borderRadius: 10,
    margin: 5,
  },
  descContainer: {
    backgroundColor: 'rgba(250,250,250,1)',
    padding: 5,
  },
  chevron: {
    padding: 5,
    color: 'white',
    alignContent: 'center',
  },
  delete: {
    padding: 10,
    backgroundColor: 'firebrick',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  showDetail: {
    padding: 10,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 2,
  },
});

const MyTrackListEntry = ({
  data, setSingleTrack, setAction,
}) => {
  const {
    trackLength, trackTitle, origin, destination, bookmarked,
  } = data;
  if (!origin || !destination) return <></>;

  const navigation = useNavigation();

  const selectTrack = () => {
    setAction(data);
    navigation.goBack();
  };

  const viewTrackOnMap = () => {
    setSingleTrack(data);
    navigation.navigate('SingleTrackViewer');
  };

  return (
    <View style={styles.entryContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{trackTitle}</Text>
        <View style={styles.titleButtonContainer}>
          <TouchableOpacity onPress={selectTrack} style={styles.chevron}>
            <Text>체크</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={viewTrackOnMap} style={styles.chevron}>
            <Text>자세히 보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default connect(null, { ...actions })(MyTrackListEntry);
