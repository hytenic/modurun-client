import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyScheduleList from './ScheduleManager/MyScheduleList';
import modurunAPI from './API';

const ScheduleManager = () => {
  const navigation = useNavigation();
  const [mySchedules, setMyShedules] = React.useState([]);
  const [loadedSchedules, setLoadedSchedules] = React.useState(false);

  React.useEffect(() => {
    modurunAPI.schedules.getMySchdules()
      .then((res) => {
        if (res.status === 200 || res.status === 404) setLoadedSchedules(true);
        if (res.ok) res.json().then((json) => setMyShedules(json));
      });
  }, []);

  const alertLoadingData = () => (
    <View style={{width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}}>
      <Text style={{textAlignVertical: 'center', textAlign: 'center', fontSize: 30, margin: 20 }}>스케줄을 불러오고 있어요!</Text>
    </View>
  );

  const alertNoSchedule = () => (
    <View style={{width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, alignItems: 'center', justifyContent: 'center', backgroundColor: 'dodgerblue', elevation: 10 }}>
      <View style={{backgroundColor: 'white', width: Dimensions.get('screen').width - 20, marginHorizontal: 10, height: 250, borderRadius: 20, padding: 20 }}>
        <View style={{marginTop: 20}}>
          <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 30, fontWeight: 'bold', color: 'lightgrey'}}>ㅎㅎ</Text>
          <Text style={{fontSize: 20, color: 'grey', textAlign: 'center'}}>아직 등록하신 스케줄이 없으시네요</Text>
          <Text style={{fontSize: 20, textAlign: 'center'}}>근처에 있는 스케줄을 찾아볼까요?</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('MainDrawer', { screen: 'MainScreen' })}} style={{padding: 10, backgroundColor: 'dodgerblue', borderRadius: 20, paddingHorizontal: 20 }}>
            <Text style={{fontSize: 20, color: 'white'}}>함 볼게요!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderScheduleList = () => (
    <View>
      <MyScheduleList schedules={mySchedules} />
    </View>
  );

  if (!loadedSchedules) return alertLoadingData();
  if (loadedSchedules && !mySchedules.length) return alertNoSchedule();
  return renderScheduleList();
};

export default ScheduleManager;
