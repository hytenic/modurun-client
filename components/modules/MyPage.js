import React, { useRef, useState, useContext } from 'react';
import { StyleSheet, Text, View, Animated, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaskedView from '@react-native-community/masked-view';
import { TouchableOpacity, TouchableHighlight, FlatList } from 'react-native-gesture-handler';
import TrackRecord from './MyPage/TrackRecord';
import modurunAPI from './API/index';

const styles = StyleSheet.create({
  compactTitleStyle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userInfoContainerStyle: {
    flex: 0.7,
    margin: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 20,
    backgroundColor: 'white',
  },
});

const MyPage = ({userInfo}) => {
  const navigation = useNavigation();
  const [completedTracks, setCompletedTracks] = useState([]);

  React.useEffect(() => {
    modurunAPI.schedules.getCompletedScheduleTracks()
      .then((res) => res.json())
      .then((json) => setCompletedTracks(json));
    return () => {};
  }, []);

  const checker = {};
  const tracksReducedDuplicate = completedTracks.reduce((acc, ele) => {
    const { trackId } = ele;
    if (checker[trackId]) return acc;
    checker[trackId] = true;
    return acc.concat(ele);
  }, []);

  const navigateToMyInfoManager = () => {
    navigation.navigate('MyInfoManager');
  };

  return (
    <ScrollView style={{ flex: 3, backgroundColor: '#1E90FF'}}>
      <View style={{ height: 20 }} />
      <View style={styles.userInfoContainerStyle}>
        <Text style={{ fontSize: 25, margin: 20, marginVertical: 10 }}>My 모두런</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)', justifyContent: 'space-between' }}>
          <View style={{flexDirection: 'row', alignItems: 'center' }}>
            <View style={{backgroundColor: 'lightgrey', borderRadius: 100, padding: 2, margin: 20 }}>
              <MaskedView style={{backgroundColor: 'transparent' }} maskElement={<View style={{backgroundColor: 'black', width: 40, height: 40, borderRadius: 100 }} />}>
                <Icon name="user" size={50} color="white" style={{backgroundColor: 'lightgrey', width: 40, height: 40, textAlignVertical: 'center', textAlign: 'center' }} />
              </MaskedView>
            </View>
            <Text style={{ fontSize: 17 }}>{`${userInfo.username}`}</Text>
          </View>
          <TouchableHighlight underlayColor="rgba(0,0,0,0.1)" onPress={navigateToMyInfoManager} style={{margin: 10, backgroundColor: '#03D6A7', padding: 5, paddingHorizontal: 10, borderRadius: 5 }}>
            <Text style={{fontSize: 12, color: 'white', fontWeight: 'bold'}}>내 정보 관리</Text>
          </TouchableHighlight>
        </View>
        {/* <View style={{padding: 20, flexDirection: 'row', borderBottomColor:'rgba(0,0,0,0.1)', borderBottomWidth: 1 }}>
          <Icon name="envelope" size={15} color="#1E90FF" style={{marginRight: 10}} />
          <Text>{`${dummyUser.email}`}</Text>
        </View> */}
        <TouchableHighlight onPressIn={()=>{}} underlayColor="rgba(0,0,0,0.1)" style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
          <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{flexDirection: 'row' }}>
              <Icon name="thumbs-up" size={15} color="#1E90FF" style={{marginRight: 10}} />
              <Text>나의 후기</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Icon name="chevron-right" />
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{ padding: 5 }}>
        <Text style={{ marginLeft: 20, fontSize: 25, fontWeight:'bold', color: 'white' }}>내가 뛰었던 코스</Text>
      </View>
      <View>
        {tracksReducedDuplicate.map((trackRecord) => (
          <TrackRecord key={trackRecord.trackId} data={trackRecord} />
        ))}
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
  };
};

export default connect(mapStateToProps, null)(MyPage);
