import React, { useEffect } from 'react';
import { View, Text, Alert, Modal, Dimensions, StatusBar, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import MaskedView from '@react-native-community/masked-view';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import modurunAPI from '../API';
import userActions from '../../../redux/action/User/creator';

const MyInfoManger = ({userInfo, dispatch}) => {
  const navigation = useNavigation();
  const { username } = userInfo;
  const [input, setInput] = React.useState('');
  const [editing, setEditing] = React.useState(false);
  const [modalVisible, setModalVisibility] = React.useState(false);
  const [keyboardVisible, setKeyboardVisibility] = React.useState(false);
  const [pass, setPassInput] = React.useState('');

  const setKeyboardVisible = () => setKeyboardVisibility(true);
  const setKeyboardInvisible = () => setKeyboardVisibility(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', setKeyboardVisible);
    Keyboard.addListener('keyboardDidHide', setKeyboardInvisible);
    return () => {
      Keyboard.removeListener('keyboardDidShow', setKeyboardVisible);
      Keyboard.removeListener('keyboardDidHide', setKeyboardInvisible);
    };
  });

  const askIfChange = () => {
    const okButton = {
      text: '네',
      onPress: () => {
        modurunAPI.users.changeMyName(input)
          .then((res) => {
            if (res.ok) dispatch(userActions.changeUserName(input));
          });
        setEditing(false);
      },
    };
    const cancelButton = {
      text: '아니오',
      onPress: () => setEditing(false),
    };
    Alert.alert('이름 바꾸기', '이름을 바꾸시겠습니까?', [okButton, cancelButton]);
  };

  const toggleEdit = () => {
    if (!editing) {
      setEditing(true);
      setInput('');
    } else {
      const okButton = {
        text: '예',
        onPress: () => {
          setEditing(false);
          setInput('');
        },
      };
      const cancelButton = {
        text: '아니오',
      };
      Alert.alert('취소', '이름 변경을 취소하시겠습니까?', [okButton, cancelButton]);
    }
  };

  const setModalVisible = () => setModalVisibility(true);
  const setModalInvisible = () => setModalVisibility(false);

  const userHateModurun = () => {
    setModalInvisible();
    modurunAPI.users.userHateModurun(pass)
      .then((res) => {
        if (res.ok) {
          const okButton = {
            text: '안녕!',
            onPress: () => navigation.navigate('SignInScreen'),
          };
          Alert.alert('잘 가요 내 사랑...', '좋은 모습으로 다시 봐요 우리', [okButton]);
        } else if (res.status === 400) {
          Alert.alert('어라', '일치하는 회원정보가 없습니다');
        } else if (res.status === 500) {
          Alert.alert('', '탈퇴 처리가 이미 완료되었습니다');
        }
        setPassInput('');
      });
  };

  const cancelHate = () => {
    setModalInvisible();
    setPassInput('');
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
    <View style={{ backgroundColor: 'dodgerblue', flex: 1, alignContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor={modalVisible ? 'rgb(120, 120, 120)' : 'white'} />
      <View
        style={{
          display: modalVisible ? 'flex' : 'none',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          position: 'absolute',
          elevation: 10,
        }}
      >
        <View style={{ display: modalVisible ? 'flex' : 'none', backgroundColor: 'rgba(0,0,0,0.5)', height: Dimensions.get('window').height, width: Dimensions.get('window').width, justifyContent: 'center' }}>
          <View style={{ width: Dimensions.get('window').width - 35, height: 200, backgroundColor: 'white', alignSelf: 'center', elevation: 3, borderRadius: 10, marginBottom: keyboardVisible ? 300 : 100 }}>
            <View style={{ flex: 60, justifyContent: 'center', marginTop: 20 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>오...?</Text>
              </View>
              <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                <Text style={{ textAlign: 'center'}}>정말로 진짜로 탈퇴하시려면 비밀번호를 입력해주세요</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextInput onChangeText={(text) => setPassInput(text)} secureTextEntry value={pass} style={{ textAlign: 'center', borderWidth: 1, borderRadius: 20, borderColor: 'grey', paddingHorizontal: 20, width: 200 }} placeholder="비밀번호" />
              </View>
            </View>
            <View style={{ flex: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <TouchableOpacity onPress={userHateModurun} style={{ backgroundColor: 'dodgerblue', padding: 10, borderRadius: 10, width: 100, alignItems: 'center' }}>
                <Text style={{color: 'white'}}>네</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelHate} style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 10, width: 100, alignItems: 'center' }}>
                <Text>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View pointerEvents={modalVisible ? 'none' : 'auto'} style={{ backgroundColor: 'white', margin: 20, elevation: 3, borderRadius: 10, paddingVertical: 20 }}>
        <View style={{ margin: 20, marginVertical: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 25 }}>내 정보</Text>
          {/* <TouchableOpacity style={{padding: 10}}>
            <Icon name="gear" color="grey" size={20} />
          </TouchableOpacity> */}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'lightgrey', borderRadius: 100, padding: 2, marginRight: 10 }}>
              <MaskedView style={{ backgroundColor: 'transparent' }} maskElement={<View style={{backgroundColor: 'black', width: 40, height: 40, borderRadius: 100 }} />}>
                <Icon name="user" size={50} color="white" style={{backgroundColor: 'lightgrey', width: 40, height: 40, textAlignVertical: 'center', textAlign: 'center' }} />
              </MaskedView>
            </View>
            {renderName()}
            <TouchableOpacity onPress={toggleEdit}>
              <Icon name="pencil" color="grey" size={18} style={{ padding: 5, backgroundColor: 'transparent' }} />
            </TouchableOpacity>
          </View>
          {renderCompleteButton()}
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity onPress={setModalVisible} style={{ padding: 10, backgroundColor: 'grey', borderRadius: 10, width: 100, height: 40, alignItems: 'center', elevation: 2 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  userInfo: state.userInfo.user,
});

export default connect(mapStateToProps, null)(MyInfoManger);
