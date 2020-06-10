/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import axios from 'axios';
import TextInputComponent from './TextInputComponents';
import ButtonComponent from './ButtonComponent';
import { installed } from '../../../client_id.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SignInManager = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const googleSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: installed.client_id,
      });
      if (result.type === 'success') {
        setSignedIn(true);
        setAccessToken(result.accessToken);
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <View style={styles.container}>
      <Text>로그인 페이지</Text>
      {
        signedIn ? (
          <SignedIn token={accessToken} />
        ) : (
          <SignIn googleSignIn={googleSignIn} />
        )
      }
    </View>
  );
};

const SignedIn = ({ token }) => {
  // 로그인이 되었다면 메인페이지로 넘어가야 한다.
  return (
    <View>
      <Text>로그인 됨 메인 페이지로 넘어가야 함</Text>
      {
        console.log(token)
      }
    </View>
  );
};

const SignIn = ({ googleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailSignIn = (inputEmail, inputPassword) => {
    // console.log(`${inputEmail} ${inputPassword}`);
    axios.post('http://localhost:5000/user/signin', {
      inputEmail,
      inputPassword,
    })
      .then(() => {
        console.log('로그인 post 요청');
      });
  };

  return (
    <View style={styles.container}>
      <TextInputComponent type="email" placeholder="이메일" value={email} setAction={setEmail} />
      <TextInputComponent type="password" placeholder="비밀번호" value={password} setAction={setPassword} />
      <ButtonComponent type="email" title="로그인" info={{ email, password }} onPressAction={emailSignIn} />
      <ButtonComponent type="google" title="구글 로그인" onPressAction={googleSignIn} />
    </View>
  );
};

export default SignInManager;
