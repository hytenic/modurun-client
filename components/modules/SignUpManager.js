import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,
} from 'react-native';
const axios = require('axios');

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
const SignUpManager = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [justAfterEmail, setJustAfterEmail] = useState(false);
  const bareURL = 'http://localhost:4000';
  // let duplication = false;

  // eslint-disable-next-line func-names
  const emailDuplication = function (emailCheck) {
    Alert.alert("이메일 체크");
    axios.post(`${bareURL}/users/exist`, {
      emailCheck,
    }).then((res) => {
      if (res.statusCode === 201) {
        Alert.alert('중복된 이메일 입니다.');
      }
    });
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
            onPress={() => {
              if (password === confirmPassword) {
                Alert.alert('입력한 두 비밀번호가 같기 때문에 회원가입을 요청합니다.');
                axios.post(`${bareURL}/users/signup`, {
                  email,
                  password,
                }).then((res) => console.log(res));
              } else {
                Alert.alert('비밀번호가 다릅니다.');
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
