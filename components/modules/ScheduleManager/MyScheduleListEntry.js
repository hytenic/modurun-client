import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import * as utils from '../ScheduleUtils/utils';
import PrettyProp from '../PrettyProp/PrettyProp';

const MyScheduleListEntry = ({ data }) => {
  const { track, schedule } = data;
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const toggleShowMore = () => setShowMoreVisible(!showMoreVisible);

  const renderShowMore = () => {
    if (!showMoreVisible) return <></>;
    const ShowDetail = (
      <TouchableOpacity style={styles.showMore}>
        <Text style={{ color: 'white' }}>자세히 보기</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.descContainer}>
        <PrettyProp name="시작 일시" value={utils.convertDate(schedule.from)} color="rgba(30, 102, 179, 1)" />
        <PrettyProp name="소요 시간" value={utils.convertDuration(schedule.to - schedule.from)} color="rgba(179, 30, 114, 1)" />
        <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
          <PrettyProp name="트랙 이름" value={track.trackTitle} color="rgba(61, 173, 111, 1)" postComponent={ShowDetail} />
        </View>
        <View style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.3)', marginVertical: 10 }} />
        <TouchableOpacity onPress={utils.joinSchedule} style={styles.cancel}>
          <Text style={{ color: 'white', fontSize: 16 }}>참가 취소하기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 1 }}>
      <View style={{ flexDirection: 'row', backgroundColor: 'dodgerblue' }}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={toggleShowMore}>
            <Text style={{ color: 'white', fontSize: 18, padding: 10 }}>
              {schedule.scheduleTitle}
              <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20, padding: 10 }}>{` ${schedule.participants}`}</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleButtonContainer}>
          <TouchableOpacity>
            <Icon name="comments" color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleShowMore}>
            <Icon name={showMoreVisible ? 'chevron-up' : 'chevron-down'} color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {renderShowMore()}
    </View>
  );
};

export default MyScheduleListEntry;
