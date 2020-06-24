/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, NativeModules,
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
    justifyContent: 'center',
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  body: {
    flex: 0.8,
    justifyContent: 'center',
  },
  inputArea: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  buttonArea: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  footer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 15,
  },
});

const SignInManager = ({ dispatch }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    console.log('toString ', actions.toString());
    dispatch(actions(userInfo))
    console.log('logged in user info: ', userInfo);
    if (userInfo) {
      navigation.navigate({ name: 'Main', params: { test: 'test' } });
    }
  };

  const goToMain = () => {
    if (signedIn) navigation.navigate('Main');
  };

  const goToSignUpPage = () => {
    navigation.navigate('SignUpManager');
  };

  const signin = () => {
    if (!signedIn) {
      return (
        <View style={styles.body}>
          <View style={styles.inputArea}>
            <TextInputComponent type="email" placeholder="이메일" value={email} setAction={setEmail} />
            <TextInputComponent type="password" placeholder="비밀번호" value={password} setAction={setPassword} />
          </View>
          <View style={styles.buttonArea}>
            <ButtonComponent type="email" title="로그인" info={{ email, password }} onPressAction={emailSignIn} />
            <ButtonComponent type="google" title="구글 로그인" onPressAction={googleSignIn} />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>혹시 계정이 없으신가요? </Text>
            <Text style={[styles.footerText, { color: 'blue' }]} onPress={goToSignUpPage}>가입하기</Text>
          </View>
        </View>
      );
    }
    return (<></>);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24 }}>모두의 런 로그인</Text>
      </View>
      {goToMain()}
      {signin()}
    </View>
  );
};

export default connect(null, null)(SignInManager);
