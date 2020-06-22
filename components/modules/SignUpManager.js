import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postSignUp, getEmailDupli } from './API/user';
// const axios = require('axios');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
  },
  body: {
    flex: 0.7,
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  footer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputArea: {
    flex: 0.55,
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  buttonArea: {
    flex: 0.45,
    // backgroundColor: 'blue',
    alignItems: 'flex-end',
  },
  textInput: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  signUpButton: {
    backgroundColor: '#FADAD8',
    width: 100,
    height: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

// eslint-disable-next-line react/prop-types
const SignUpManager = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [justAfterEmail, setJustAfterEmail] = useState(false);
  // let duplication = false;

  // eslint-disable-next-line func-names
  const emailDuplication = async function (emailCheck) {
    const res = await getEmailDupli(emailCheck);
    if (res) {
      console.log('이메일 중복 없음');
    } else {
      console.log('이메일 중복');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>모두의 런 회원가입</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.inputArea}>
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
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.signUpButton}
            title="회원가입"
            onPress={async () => {
              if (password === confirmPassword) {
                console.log('입력한 두 비밀번호가 같기 때문에 회원가입을 요청합니다.');
                const res = await postSignUp(email, password);
                if (res) {
                  navigation.navigate('SignInManager');
                } else {
                  console.log('이메일이나 비밀번호가 잘못되었습니다.');
                }
              } else {
                console.log('비밀번호가 다릅니다.');
              }
            }}
          >
            <Text>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>이미 계정이 있으신가요?</Text>
        <Text>    </Text>
        <Text style={{color: 'blue'}} onPress={() => navigation.navigate('SignInManager')}>로그인</Text>
      </View>
    </View>
  );
};

export default SignUpManager;