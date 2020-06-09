import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, Button,
} from 'react-native';
const axios = require('axios');

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  signUpButton: {
    margin: 20,
  },
});

const EmailInputComponet = ({ email }) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder="이메일을 입력해 주세요."
      defaultValue={email}
      onTouchStart={() => {
        setJustAfterEmail(true);
      }}
      onChangeText={(text) => {
        setEmail(text);
      }}
    />
  );
};

// eslint-disable-next-line react/prop-types
const SignUpManager = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [justAfterEmail, setJustAfterEmail] = useState(false);
  const bareURL = 'http://localhost:4000';
  // let duplication = false;

  // eslint-disable-next-line func-names
  const emailDuplication = function (emailCheck) {
    axios.post(`${bareURL}/users/exist`, {
      emailCheck,
    }).then((res) => {
      if (res.statusCode === 201) {
        alert('중복된 이메일 입니다.');
      }
    });
  };

  return (
    <View>
      <Text style={{ alignItems: 'center' }}>회원가입</Text>
      <EmailInputComponet email={email} />
      <TextInput
        style={styles.textInput}
        placeholder="비밀번호를 입력해 주세요."
        defaultValue={password}
        secureTextEntry
        onTouchStart={() => {
          if (justAfterEmail) {
            emailDuplication(email);
            setJustAfterEmail(false);
          }
        }}
        onChangeText={(pw) => {
          setPassword(pw);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="비밀번호를 다시 입력해 주세요."
        defaultValue={confirmPassword}
        secureTextEntry
        onChangeText={(confirm) => {
          setConfirmPassword(confirm);
        }}
      />
      <Button
        style={styles.signUpButton}
        title="회원가입"
        onPress={() => {
          if (password === confirmPassword) {
            alert('입력한 두 비밀번호가 같기 때문에 회원가입을 요청합니다.');
            axios.post(`${bareURL}/users/signup`, {
              email,
              password,
            }).then((res) => console.log(res));
          } else {
            alert('비밀번호가 다릅니다.');
          }
        }}
      />
      <Text>이미 계정이 있으신가요?</Text>
      {/* eslint-disable-next-line react/prop-types */}
      <Text onPress={() => navigation.navigate('SignInManager')}>로그인</Text>
    </View>
  );
};

export default SignUpManager;
