import React from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import MaskedView from '@react-native-community/masked-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import modurunAPI from './API/'
import user from './API/user';

const dummyUser = {
  username: '바보똥개',
};

const MyInfoManger = ({userInfo}) => {
  const { username } = dummyUser;
  const [input, setInput] = React.useState('');
  const [editing, setEditing] = React.useState(false);

  const askIfChange = () => {
    const okButton = {
      text: '네',
      onPress: () => {
        modurunAPI.users.changeMyName(input);
        setEditing(false);
      },
    };
    const cancelButton = {
      text: '아니오',
      onPress: () => setEditing(false),
    };
    Alert.alert('이름 바꾸기', '이름을 바꾸시겠습니까?', [okButton, cancelButton]);
  };

  const startEdit = () => {
    setEditing(true);
    setInput('');
  };

  const renderName = () => {
    if (!editing) return <Text style={{ fontSize: 17 }}>{`${username}`}</Text>;
    return <TextInput style={{padding: 5, maxWidth: 100, fontSize: 16}} placeholder={username} value={input} onChangeText={(text) => setInput(text)} />;
  };

  const renderCompleteButton = () => {
    if (!editing) return <></>;
    return (
      <TouchableOpacity onPress={askIfChange} style={{ padding: 5, paddingHorizontal: 10, backgroundColor: 'dodgerblue', borderRadius: 10 }}>
        <Text style={{ fontSize: 12, color: 'white' }}>수정 완료</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: 'white', margin: 20, elevation: 3, borderRadius: 10, paddingVertical: 20 }}>
      <View style={{ margin: 20, marginVertical: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 25 }}>내 정보</Text>
        <TouchableOpacity style={{padding: 10}}>
          <Icon name="gear" color="grey" size={20} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'lightgrey', borderRadius: 100, padding: 2, marginRight: 10 }}>
            <MaskedView style={{ backgroundColor: 'transparent' }} maskElement={<View style={{backgroundColor: 'black', width: 40, height: 40, borderRadius: 100 }} />}>
              <Icon name="user" size={50} color="white" style={{backgroundColor: 'lightgrey', width: 40, height: 40, textAlignVertical: 'center', textAlign: 'center' }} />
            </MaskedView>
          </View>
          {renderName()}
          <TouchableOpacity onPress={startEdit}>
            <Icon name="pencil" color="grey" size={18} style={{ padding: 5, backgroundColor: 'transparent' }} />
          </TouchableOpacity>
        </View>
        {renderCompleteButton()}
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TouchableOpacity style={{ padding: 10, backgroundColor: 'grey', borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  userInfo: state.userInfo.user,
});

export default connect(mapStateToProps, null)(MyInfoManger);
