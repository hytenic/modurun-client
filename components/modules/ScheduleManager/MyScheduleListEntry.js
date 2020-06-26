import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import * as utils from '../ScheduleUtils/utils';
import PrettyProp from '../PrettyProp/PrettyProp';
import ToggleBox from './toggleBox/index';

const titleShorter = (title) => {
  let shortTitle = '';
  if (title.length > 10) {
    shortTitle = `${title.slice(0, 13)} ...`;
    return shortTitle;
  }
  return title;
};

const MyScheduleListEntry = ({ data, onLayout }) => {
  const navigation = useNavigation();
  const { track, schedule } = data;
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(-50));

  const toggleShowMore = () => {
    setShowMoreVisible(!showMoreVisible);
  };

  const enterChatRoom = () => {
    navigation.navigate('ChatRoomScreen', {
      scheduleId: schedule.scheduleId,
      userId: 2 || undefined, // 리덕스로 가져와야 함
      username: '하하하하하하' || undefined, // 리덕스로 가져와야 함
    });
  };

  const renderShowMore = () => {
    if (!showMoreVisible) return <></>;
    const ShowDetail = (
      <TouchableOpacity style={styles.showMore}>
        <Text style={{ color: 'white', fontSize: 16 }}>자세히 보기</Text>
      </TouchableOpacity>
    );

    const transFromStyle = {
      transform: [{
        translateY: animation,
      }],
    };

    return (
      <Animated.View style={[styles.descContainer, transFromStyle]}>
        <PrettyProp name="시작 일시" value={utils.convertDate(schedule.from)} color="dodgerblue" />
        <PrettyProp name="소요 시간" value={utils.convertDuration(schedule.to - schedule.from)} color="dodgerblue" />
        <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
          <PrettyProp name="트랙 이름" value={track.trackTitle} color="dodgerblue" />
        </View>
        <View style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.3)', marginVertical: 10 }} />
        <View style={styles.moreButtonContainer}>
          <TouchableOpacity onPress={utils.joinSchedule} style={styles.cancel}>
            <Text style={{ color: 'white', fontSize: 16 }}>참가 취소하기</Text>
          </TouchableOpacity>
          {ShowDetail}
        </View>
      </Animated.View>
    );
  };

  const label = (
    <Text style={{ color: 'dodgerblue', fontSize: 18, padding: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{titleShorter(schedule.scheduleTitle)}</Text>
      <Text style={{ color: 'rgba(33, 150, 243, 0.6)', fontSize: 20, padding: 15 }}>
        {' '}
        (
        {`${schedule.participants}`}
        명)
      </Text>
    </Text>
  );

  const value = (
    <>
      <Icon name="comments" color="dodgerblue" size={20} onPress={enterChatRoom} />
    </>
  );

  return (
    <View style={{ marginBottom: 3, padding: 2 }} onLayout={onLayout}>
      <ToggleBox label={label} value={value} style={{ backgroundColor: 'white', margin: 5, borderRadius: 10 }} arrowSize={35} arrowColor="#2196f3">
        <View style={styles.descContainer}>
          <PrettyProp name="시작 일시" value={utils.convertDate(schedule.from)} color="dodgerblue" />
          <PrettyProp name="소요 시간" value={utils.convertDuration(schedule.to - schedule.from)} color="dodgerblue" />
          <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
            <PrettyProp name="트랙 이름" value={track.trackTitle} color="dodgerblue" />
          </View>
          <View style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.3)', marginVertical: 10 }} />
          <View style={styles.moreButtonContainer}>
            <TouchableOpacity onPress={utils.joinSchedule} style={styles.cancel}>
              <Text style={{ color: 'white', fontSize: 16 }}>참가 취소하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.showMore}>
              <Text style={{ color: 'white', fontSize: 16 }}>자세히 보기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ToggleBox>
    </View>
  );
};

export default MyScheduleListEntry;
