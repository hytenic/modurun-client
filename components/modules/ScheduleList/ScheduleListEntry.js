import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/FontAwesome';
import * as utils from './utils';
import styles from './styles';
import PrettyProp from '../PrettyProp/PrettyProp';

const ScheduleListEntry = ({ data }) => {
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const toggleShowMore = () => setShowMoreVisible(!showMoreVisible);

  const renderShowMore = () => {
    if (!showMoreVisible) return <></>;
    return (
      <View style={styles.descContainer}>
        <PrettyProp name="시작일시" value={utils.convertDate(data.from)} color="rgba(30, 102, 179, 1)" />
        <PrettyProp name="종료일시" value={utils.convertDate(data.to)} color="rgba(112, 30, 179, 1)" />
        <PrettyProp name="소요시간" value={utils.convertDuration(data.to - data.from)} color="rgba(179, 30, 114, 1)" />
        <View style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.3)', marginVertical: 10 }} />
        <TouchableOpacity onPress={utils.joinSchedule} style={styles.joinSchedule}>
          <Text style={{ color: 'white', fontSize: 16 }}>일정 참가하기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.entryContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`${data.scheduleTitle} (${data.participants}명)`}</Text>
        <View style={styles.titleButtonContainer}>
          <TouchableOpacity onPress={toggleShowMore}>
            <Icons style={styles.chevron} name={showMoreVisible ? 'chevron-up' : 'chevron-down'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {renderShowMore()}
    </View>
  );
};

export default ScheduleListEntry;
