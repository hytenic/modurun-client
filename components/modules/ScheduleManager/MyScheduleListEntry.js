import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Animated } from 'react-native';
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
import store from '../../../redux/store';

const titleShorter = (title, n) => {
  let shortTitle = '';
  if (title.length > 10) {
    shortTitle = `${title.slice(0, n)} ...`;
    return shortTitle;
  }
  return title;
};

const MyScheduleListEntry = ({ data, onLayout, dispatch }) => {
  const navigation = useNavigation();
  const { track, schedule } = data;
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(-50));

  const toggleShowMore = () => {
    setShowMoreVisible(!showMoreVisible);
  };

  const viewDetailTrack = () => {
    dispatch(actions.setSingleTrack(data.track));
    navigation.navigate('SingleTrackViewerScreen');
  };

  const enterChatRoom = () => {
    navigation.navigate('ChatRoomScreen', {
      scheduleTitle: schedule.scheduleTitle,
      scheduleId: schedule.scheduleId,
      userId: 2 || undefined, // 리덕스로 가져와야 함
      username: '하하하하하하' || undefined, // 리덕스로 가져와야 함
    });
  };

  const label = (
    <Text style={{ fontSize: 15 }}>
      <Text style={{ fontWeight: 'bold' }}>{titleShorter(schedule.scheduleTitle, 15)}</Text>
      <Text style={{ color: '#1E90FF', fontSize: 15, padding: 15, alignContent: 'flex-end'}}>
        [
        <IconIonicons name="md-person" size={20} />
        {`${schedule.participants}`}
        ]
      </Text>
    </Text>
  );

  const value = (
    <>
      <Icon name="comments" color="#03D6A7" size={20} onPress={enterChatRoom} />
    </>
  );

  return (
    <View style={{ marginBottom: 3, padding: 2 }} onLayout={onLayout}>
      <ToggleBox label={label} value={value} style={styles.entryContainer} arrowSize={35} arrowColor="#2196f3">
        <View style={styles.descContainer}>
          <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
            <PrettyProp name="시작 일시" value={utils.convertDate(schedule.from)} color="dodgerblue" />
            <PrettyProp name="소요 시간" value={utils.convertDuration(schedule.to - schedule.from)} color="dodgerblue" />
            <PrettyProp name="트랙 이름" value={track.trackTitle} color="dodgerblue" />
          </View>
        </View>
        <View style={styles.moreButtonContainer}>
          <TouchableOpacity onPress={utils.joinSchedule} style={styles.cancel}>
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

export default connect(null, null)(MyScheduleListEntry);
