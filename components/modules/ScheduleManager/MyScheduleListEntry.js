import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from './styles';
import * as utils from '../ScheduleUtils/utils';
import PrettyProp from '../PrettyProp/PrettyProp';
import ToggleBox from './toggleBox/index';
import * as actions from '../../../redux/action/SingleTrackViewer/creator';
import modurunAPI from '../API';
import productionAppNavActions from '../../../redux/action/ProductionNav/creator';

const titleShorter = (title, n) => {
  let shortTitle = '';
  if (title.length > 10) {
    shortTitle = `${title.slice(0, n)} ...`;
    return shortTitle;
  }
  return title;
};

const MyScheduleListEntry = ({ data, onLayout, dispatch, userInfo, loadSchedules }) => {
  const {
    destination,
    id,
    origin,
    participants,
    route,
    scheduleFrom,
    scheduleTo,
    title,
    trackId,
    trackLength,
    trackTitle,
  } = data;
  const navigation = useNavigation();
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(-50));
  const [deleted, setDeleted] = useState(false);

  const toggleShowMore = () => {
    setShowMoreVisible(!showMoreVisible);
  };

  const askIfExit = () => {
    const okButton = {
      text: '예',
      onPress: () => modurunAPI.schedules.exitFromSchedule(id)
        .then((res) => {
          if (res.ok) loadSchedules();
        }),
    };
    const cancelButton = {
      text: '아니오',
    };
    Alert.alert('참가 취소', '일정 참가를 취소하시겠습니까?', [okButton, cancelButton]);
  };

  const viewDetailTrack = () => {
    modurunAPI.tracks.getTrack(trackId)
      .then((res) => res.json())
      .then((json) => {
        dispatch(actions.setSingleTrack(json));
        navigation.navigate('SingleTrackViewerScreen');
      });
  };

  const enterChatRoom = () => {
    dispatch(productionAppNavActions.setChatRoomTitle(title));
    navigation.navigate('ChatRoomScreen', {
      scheduleTitle: title,
      scheduleId: id,
      username: userInfo.username,
    });
  };

  const label = (
    <Text style={{ fontSize: 15, padding: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{titleShorter(title, 15)}</Text>
      <Text style={{ color: '#1E90FF', fontSize: 15, padding: 15, alignContent: 'flex-end'}}>
        [
        <IconIonicons name="md-person" size={20} />
        {`${participants}`}
        ]
      </Text>
    </Text>
  );

  const value = (
    <>
      <Icon name="comments" color="#03D6A7" size={20} onPress={enterChatRoom} />
    </>
  );

  if (deleted) return <></>;

  return (
    <View style={{ marginBottom: 3, padding: 2 }} onLayout={onLayout}>
      <ToggleBox label={label} value={value} style={styles.entryContainer} arrowSize={35} arrowColor="#2196f3">
        <View style={styles.descContainer}>
          <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
            <PrettyProp name="시작 일시" value={utils.convertDate(scheduleFrom)} color="dodgerblue" />
            <PrettyProp name="소요 시간" value={utils.convertDuration(Date.parse(scheduleTo) - Date.parse(scheduleFrom))} color="dodgerblue" />
            <PrettyProp name="트랙 이름" value={trackTitle} color="dodgerblue" />
          </View>
        </View>
        <View style={styles.moreButtonContainer}>
          <TouchableOpacity onPress={askIfExit} style={styles.cancel}>
            <Text style={{ color: 'white', fontSize: 16 }}>참가 취소하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.showMore} onPress={viewDetailTrack}>
            <Text style={{ color: 'white', fontSize: 16 }}>자세히 보기</Text>
          </TouchableOpacity>
        </View>
      </ToggleBox>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo.user,
});

export default connect(mapStateToProps, null)(MyScheduleListEntry);
