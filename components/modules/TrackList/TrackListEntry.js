import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from './styles';
import * as actions from '../../../redux/action/SingleTrackViewer/creator';
import PrettyProp from '../PrettyProp/PrettyProp';
import * as utils from '../TrackUtils/utils';
import googlePlaceApi from '../googleapis/place';

const TrackListEntry = ({ data, showBookmark, setSingleTrack, showAdd }) => {
  // 아 북마크 처리는 api에 안 돼 있네.
  const {
    trackLength, trackTitle, route, bookmarked,
  } = data;

  const origin = route[0];
  const destination = route[route.length - 1];

  const [originInfo, setOriginInfo] = useState('');
  const [destinationInfo, setDestinationInfo] = useState('');
  useEffect(() => {
    googlePlaceApi.nearestPlace(origin)
      .then((nearestPlace) => {
        setOriginInfo(nearestPlace.vicinity);
      });
    googlePlaceApi.nearestPlace(destination)
      .then((nearestPlace) => {
        setDestinationInfo(nearestPlace.vicinity);
      });
  }, [data]);

  const navigation = useNavigation();
  const [showMoreVisible, setShowMoreVisible] = useState(false);

  const toggleShowMore = () => setShowMoreVisible(!showMoreVisible);

  const viewTrackOnMap = () => {
    setSingleTrack(data);
    navigation.navigate('SingleTrackViewer');
  };

  const askIfDelete = () => {
    Alert.alert('코스 삭제', '코스를 삭제하시겠습니까?', [
      {
        text: '삭제',
        onPress: () => { console.log('여기서 삭제하는 동작 수행해야 됨'); },
      },
      {
        text: '취소',
      },
    ]);
  };

  const askIfAdd = () => {
    Alert.alert(
      '코스 추가',
      '코스를 추가하시겠습니까?', [
        {
          text: '예',
          onPress: () => { console.log('여기서 추가하는 동작 수행해야 됨'); },
        },
        {
          text: '아니오',
        },
      ],
    );
  };

  const renderAdd = () => {
    if (!showAdd) return <></>;
    return (
      <TouchableOpacity onPress={askIfAdd} style={{ alignContent: 'center', padding: 5 }}>
        <Icon name="plus" color="white" style={{backgroundColor: 'rgba(255,255,255,0.5)', width: 30, height: 30, borderRadius: 100, textAlign: 'center', textAlignVertical: 'center' }} size={20} />
      </TouchableOpacity>
    );
  };

  const renderBookMark = () => {
    if (!showBookmark) return <></>;
    return (
      <TouchableOpacity onPress={() => { /* 여기에서 북마크 처리해야됨 */ }} style={{ alignContent: 'center', padding: 5 }}>
        <Icon name="star" size={20} color={bookmarked ? 'yellow' : 'lightgrey'} />
      </TouchableOpacity>
    );
  };

  const compactPropStyle = {
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
  };

  const compactProp = (name, value, color) => (
    <View style={[compactPropStyle, { backgroundColor: color }]}>
      <Text style={{fontSize: 12, fontWeight: 'bold', marginRight: 5}}>{name}</Text>
      <Text style={{fontSize: 11}}>{value}</Text>
    </View>
  );

  const renderCompactDetail = () => {
    if (showMoreVisible) return <></>;
    return (
      <View style={{ margin: 10, marginTop: 0, flexDirection: 'row', flexWrap: 'wrap' }}>
        {compactProp('길이', utils.prettyLength(trackLength))}
        {compactProp('출발', originInfo)}
        {compactProp('도착', destinationInfo)}
      </View>
    );
  };

  const renderShowMore = () => {
    if (!showMoreVisible) return <></>;
    return (
      <View style={styles.descContainer}>
        <PrettyProp name="출발지점" value={originInfo} color="rgba(16, 179, 151, 1)" />
        <PrettyProp name="도착지점" value={destinationInfo} color="rgba(39, 94, 176, 1)" />
        <PrettyProp name="길이" value={utils.prettyLength(trackLength)} color="rgba(94, 39, 176, 1)" />
        <PrettyProp name="시간(남)" value={utils.predictDuration(trackLength, 'm')} color="rgba(196, 82, 179, 1)" />
        <PrettyProp name="시간(여)" value={utils.predictDuration(trackLength, 'f')} color="rgba(196, 175, 82, 1)" />
        <View style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginVertical: 10 }} />
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', width: '55%', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={viewTrackOnMap} style={styles.showDetail}>
              <Text style={{ color: 'white', fontSize: 16 }}>자세히 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={askIfDelete} style={styles.delete}>
              <Text style={{ color: 'white', fontSize: 16 }}>삭제하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderDetail = () => {
    if (showMoreVisible) return renderShowMore();
    return renderCompactDetail();
  };

  return (
    <View style={styles.entryContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{trackTitle}</Text>
        <View style={styles.titleButtonContainer}>
          {renderAdd()}
          {renderBookMark()}
          <TouchableOpacity onPress={toggleShowMore} style={styles.chevron}>
            <Icon name={showMoreVisible ? 'chevron-up' : 'chevron-down'} color="grey" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {renderDetail()}
      <Modal visible={false}>
        <Text>Alert를 모달로 바꾸기</Text>
      </Modal>
    </View>
  );
};

export default connect(null, { ...actions })(TrackListEntry);
