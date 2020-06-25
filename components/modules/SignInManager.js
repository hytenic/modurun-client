/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, Animated, Easing,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import actions from '../../redux/action/User/creator';
import TextInputComponent from './Login/TextInputComponents';
import ButtonComponent from './Login/ButtonComponent';
import { postEmailLogin } from './API/user';
import getEnvVars from '../../environment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    marginBottom: 50,
  },
  circle: {
    borderRadius: 300,
    width: 700,
    height: 600,
    marginLeft: -145,
    position: 'absolute',
    top: -220,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  body: {
    flex: 7,
    marginTop: 25,
  },
  inputArea: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    backgroundColor: 'white',
    borderWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonArea: {
    alignItems: 'center',
  },
  footer: {
    flex: 1.2,
    borderTopWidth: 0.5,
    width: 250,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 15,
    elevation: 8,
  },
});

const SignInManager = ({ dispatch }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typing, setTyping] = useState(false);

  const googleSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: getEnvVars('dev').clientId,
      });
      if (result.type === 'success') {
        console.log(result);
        setSignedIn(true);
        setAccessToken(result.accessToken);
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };

  const emailSignIn = async (inputEmail, inputPassword) => {
    const userInfo = await postEmailLogin(inputEmail, inputPassword);
    dispatch(actions(userInfo));
    if (userInfo) {
      navigation.navigate('Main');
    }
  };

  const goToMain = () => {
    if (signedIn) navigation.navigate('Main');
  };

  const goToSignUpPage = () => {
    navigation.navigate('SignUpManager');
  };

  const setTypingFalse = () => {
    setTyping(false);
  };

  const setTypingTrue = () => {
    setTyping(true);
  };

  const btnRendering = () => {
    if (!typing) {
      return (
        <View style={styles.buttonArea}>
          <ButtonComponent type="email" title="로그인" info={{ email, password }} onPressAction={emailSignIn} />
          <ButtonComponent type="google" title="구글 로그인" onPressAction={googleSignIn} />
        </View>
      );
    }
    return (<></>);
  };

  const footerRendering = () => {
    if (!typing) {
      return (
        <View style={styles.footer}>
          <ButtonComponent type="signupPage" title="회원가입" onPressAction={goToSignUpPage} />
        </View>
      );
    }
    return (<></>);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circle}>
          <Image
            source={require('../../assets/zolaman.png')}
            style={{ weight: 60, height: 60 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>모두런</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Animated.View style={[styles.inputArea]}>
          <TextInputComponent style={styles.inputBox} type="email" placeholder="이메일" value={email} setAction={setEmail} onTouchStart={setTypingTrue} onSubmitEditing={setTypingFalse} />
          <TextInputComponent style={styles.inputBox} type="password" placeholder="비밀번호" value={password} setAction={setPassword} onTouchStart={setTypingTrue} onSubmitEditing={setTypingFalse} />
        </Animated.View>
        {btnRendering()}
      </View>
      {footerRendering()}
    </View>
  );
};

export default connect(null, null)(SignInManager);
