import React, { useState, useRef } from 'react';
import { View, Text, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from './styles';
import * as actions from '../../../redux/action/SingleTrackViewer/creator';
import PrettyProp from '../PrettyProp/PrettyProp';
import * as utils from '../TrackUtils/utils';

const TrackListEntry = ({ data, showBookmark, setSingleTrack, showAdd }) => {
  // 아 북마크 처리는 api에 안 돼 있네.
  const {
    trackLength, trackTitle, origin, destination, bookmarked,
  } = data;
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

  const renderCompactDetail = () => {
    if (showMoreVisible) return <></>;
    return (
      <View>
        <Text>자 이제 시작이야</Text>
      </View>
    );
  };

  const renderShowMore = () => {
    if (!showMoreVisible) return <></>;
    return (
      <View style={styles.descContainer}>
        <PrettyProp name="출발지점" value="google api로 처리해야 됨" color="rgba(16, 179, 151, 1)" />
        <PrettyProp name="도착지점" value="google api로 처리해야 됨" color="rgba(39, 94, 176, 1)" />
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
