import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Keyboard, Dimensions, Modal, TouchableHighlight, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postSignUp, getEmailDupli } from './API/user';
// const axios = require('axios');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
  },
  circle: {
    borderRadius: 300,
    width: 700,
    height: 600,
    marginLeft: -145,
    position: 'absolute',
    top: -200,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    position: 'absolute',
    top: 210,
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
  },
  body: {
    // flex: 6,
    // backgroundColor: 'black',
    // marginTop: 25,
  },
  inputArea: {
    // flex: 6,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // height: 100,
  },
  buttonArea: {
    // flex: 4,
    alignItems: 'center',
  },
  footer: {
    // flex: 1.5,
    borderTopWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 250,
    alignSelf: 'center',
    marginBottom: 30,
  },
  inputBox: {
    backgroundColor: 'white',
    width: 250,
    // margin: 13,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: '#1E90FF',
    elevation: 10,
  },
  btn: {
    backgroundColor: 'white',
    width: 200,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  signUpBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    // marginTop: 70,
    elevation: 8,
    marginBottom: 20,
  },
  signinPageBtn: {
    backgroundColor: '#03D6A7',
    marginTop: 20,
  },
  alertTextView: {
    height: 30,
    width: 230,
    justifyContent: 'flex-start',
  },
  alertText: {
    fontSize: 10,
    color: 'red',
    justifyContent: 'flex-start',
  },
});

// eslint-disable-next-line react/prop-types
const SignUpManager = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [justAfterEmail, setJustAfterEmail] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [pwValidation, setPWValidation] = useState(false);
  const [typing, setTyping] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const setTypingFalse = () => {
    setTyping(false);
  };

  const setTypingTrue = () => {
    setTyping(true);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', setTypingFalse);
    Keyboard.addListener('keyboardDidShow', setTypingTrue);
    return () => {
      Keyboard.removeListener('keyboardDidHide', setTypingFalse);
      Keyboard.removeListener('keyboardDidShow', setTypingTrue);
    };
  }, []);

  const emailDuplication = async function (emailCheck) {
    const res = await getEmailDupli(emailCheck);
    if (res) {
      console.log('이메일 중복 없음');
      setDuplicate(false);
    } else {
      console.log('이메일 중복');
      setDuplicate(true);
    }
  };

  const goToSignInPage = () => {
    navigation.navigate('SignInScreen');
  };

  const signinBtnRendering = () => {
    if (!typing) {
      return (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.btn, styles.signinPageBtn]}
            title="회원가입"
            onPress={goToSignInPage}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>로그인</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (<></>);
  };

  const headerRendering = () => {
    if (!typing) {
      return (
        <View style={styles.header}>
          <View style={styles.circle}>
            <View style={styles.logo}>
              <Image
                source={require('../../assets/zolaman_blue.png')}
                style={{ weight: 60, height: 60 }}
                resizeMode="contain"
              />
              <Text style={{
                fontSize: 40, color: '#1E90FF', fontWeight: 'bold', alignSelf: 'center',
              }}
              >
                모두런
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.header}>
        <View style={[styles.circle, { top: -270 }]} />
      </View>
    );
  };

  const alertDuplicate = (message) => {
    if (duplicate) {
      return (
        <Text style={styles.alertText}>{message}</Text>
      );
    }
    return (<></>);
  };

  const alertPasswordValidation = (message) => {
    if (pwValidation) {
      return (
        <Text style={styles.alertText}>{message}</Text>
      );
    }
    return (<></>);
  };

  const AlertSignupSubmit = () => {
    Alert.alert(
      '',
      '회원가입이 완료되었습니다',
      [
        { text: "OK", onPress: () => navigation.navigate('SignInScreen') }
      ],
      { cancelable: false }
    );
  };


  const bodyRendering = () => {
    if (!typing) {
      return (
        <>
          <View style={styles.inputArea}>
            <TextInput
              style={[styles.inputBox, duplicate ? { borderColor: 'red', borderWidth: 1 } : null]}
              placeholder="이메일"
              defaultValue={email}
              onTouchStart={() => {
                setJustAfterEmail(true);
                setTyping(true);
              }}
              onChangeText={(text) => {
                setEmail(text);
              }}
              onSubmitEditing={() => {
                setTyping(false);
              }}
            />
            <View style={styles.alertTextView}>
              {alertDuplicate('중복된 이메일입니다.')}
            </View>
            <TextInput
              style={[styles.inputBox, pwValidation ? { borderColor: 'red', borderWidth: 1 } : null]}
              placeholder="비밀번호"
              defaultValue={password}
              secureTextEntry
              onTouchStart={() => {
                if (justAfterEmail) {
                  emailDuplication(email);
                  setJustAfterEmail(false);
                  setTyping(true);
                }
              }}
              onChangeText={(pw) => {
                setPassword(pw);
                if (pw === confirmPassword) {
                  setPWValidation(false);
                } else {
                  setPWValidation(true);
                }
              }}
              onSubmitEditing={() => {
                setTyping(false);
              }}
            />
            <View style={styles.alertTextView}>
              {alertPasswordValidation('비밀번호가 서로 다릅니다.')}
            </View>
            <TextInput
              style={[styles.inputBox, pwValidation ? { borderColor: 'red', borderWidth: 1 } : null]}
              placeholder="비밀번호 확인"
              defaultValue={confirmPassword}
              secureTextEntry
              onTouchStart={() => {
                setTyping(true);
              }}
              onChangeText={(confirm) => {
                setConfirmPassword(confirm);
                if (password === confirm) {
                  setPWValidation(false);
                } else {
                  setPWValidation(true);
                }
              }}
              onSubmitEditing={() => {
                setTyping(false);
              }}
            />
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={[styles.btn, styles.signUpBtn]}
              title="회원가입"
              onPress={async () => {
                if (password === confirmPassword) {
                  setPWValidation(false);
                  console.log('입력한 두 비밀번호가 같기 때문에 회원가입을 요청합니다.');
                  const res = await postSignUp(email, password);
                  if (res) {
                    AlertSignupSubmit();
                    // navigation.navigate('SignInScreen');
                  } else {
                    console.log('이메일이나 비밀번호가 잘못되었습니다.');
                  }
                } else {
                  setPWValidation(true);
                  console.log('비밀번호가 다릅니다.');
                }
              }}
            >
              <Text style={{ color: '#1E90FF', fontSize: 15, fontWeight: 'bold' }}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
    return (
      <View style={[styles.inputArea, { justifyContent: 'center' }]}>
        {/* <AlertSignupSubmit /> */}
        <TextInput
          style={[styles.inputBox, duplicate ? { borderColor: 'red', borderWidth: 1 } : null]}
          placeholder="이메일"
          defaultValue={email}
          onTouchStart={() => {
            setJustAfterEmail(true);
            setTyping(true);
          }}
          onChangeText={(text) => {
            setEmail(text);
          }}
          onSubmitEditing={() => {
            setTyping(false);
          }}
        />
        <View style={styles.alertTextView}>
          {alertDuplicate('중복된 이메일입니다.')}
        </View>
        <TextInput
          style={[styles.inputBox, pwValidation ? { borderColor: 'red', borderWidth: 1 } : null]}
          placeholder="비밀번호"
          defaultValue={password}
          secureTextEntry
          onTouchStart={() => {
            if (justAfterEmail) {
              emailDuplication(email);
              setJustAfterEmail(false);
              setTyping(true);
            }
          }}
          onChangeText={(pw) => {
            setPassword(pw);
            if (pw === confirmPassword) {
              setPWValidation(false);
            } else {
              setPWValidation(true);
            }
          }}
          onSubmitEditing={() => {
            setTyping(false);
          }}
        />
        <View style={styles.alertTextView}>
          {alertPasswordValidation('비밀번호가 서로 다릅니다.')}
        </View>
        <TextInput
          style={[styles.inputBox, pwValidation ? { borderColor: 'red', borderWidth: 1 } : null]}
          placeholder="비밀번호 확인"
          defaultValue={confirmPassword}
          secureTextEntry
          onTouchStart={() => {
            setTyping(true);
          }}
          onChangeText={(confirm) => {
            setConfirmPassword(confirm);
            console.log(confirm);
            if (password === confirm) {
              setPWValidation(false);
            } else {
              setPWValidation(true);
            }
          }}
          onSubmitEditing={() => {
            setTyping(false);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {headerRendering()}
      <View style={styles.body}>
        {bodyRendering()}
      </View>
      {signinBtnRendering()}
    </View>
  );
};

export default SignUpManager;
