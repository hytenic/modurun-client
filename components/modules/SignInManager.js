/* eslint-disable no-console */
import React, { useState, useContext, createContext } from 'react';
import {
  StyleSheet, Text, View, NativeModules,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from './Login/TextInputComponents';
import ButtonComponent from './Login/ButtonComponent';
import { postEmailLogin } from './API/user';
import getEnvVars from '../../environment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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

const SignInManager = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const navigation = useNavigation();

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

  const goToMain = () => (
    navigation.navigate('Main')
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24 }}>모두의 런 로그인</Text>
      </View>
      {
        signedIn ? (
          // <SignedIn token={accessToken} />
          goToMain()
        ) : (
          <SignIn googleSignIn={googleSignIn} setAction={setUserInfo} value={userInfo} setContext={setUser} />
        )
      }
    </View>
  );
};

const SignedIn = ({ token }) =>
  // 로그인이 되었다면 메인페이지로 넘어가야 한다.
  (
    <View style={styles.body}>
      <Text>로그인 됨 메인 페이지로 넘어가야 함</Text>
      {
        console.log(token)
      }
    </View>
  );
const SignIn = ({ googleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const emailSignIn = async (inputEmail, inputPassword) => {
    // console.log(`${inputEmail} ${inputPassword}`);
    const user = await postEmailLogin(inputEmail, inputPassword);
    console.log('logged in user info: ', user);
    if (user) {
      navigation.navigate({ name: 'Main', params: { test: 'test' } });
    }
  };

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
        <Text style={[styles.footerText, { color: 'blue' }]} onPress={() => navigation.navigate('SignUpManager')}>가입하기</Text>
      </View>
    </View>
  );
};

export default SignInManager;
