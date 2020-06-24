/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  btn: {
    width: 200,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    elevation: 8,
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  emailbtn: {
    flexDirection: 'row',
    backgroundColor: '#03D6A7',
    // backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: '#03D6A7',
  },
  googleBtn: {
    backgroundColor: '#EF3832',
    flexDirection: 'row',
  },
  signupPageBtn: {
    // width: '63%',
    elevation: 5,
    borderColor: '#1E90FF',
    borderWidth: 2,
    backgroundColor: 'white',
    shadowOpacity: 10,
  },
});

const ButtonComponent = ({ type, title, info, onPressAction }) => {
  if (type === 'email') {
    const { email, password } = info;
    return (
      <TouchableOpacity
        style={[styles.emailbtn, styles.btn]}
        title={title}
        onPress={() => {
          console.log(`${email} ${password}`);
          onPressAction(email, password);
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>로그인</Text>
      </TouchableOpacity>
    );
  }

  if (type === 'google') {
    return (
      <TouchableOpacity
        style={[styles.googleBtn, styles.btn]}
        title={title}
        onPress={() => {
          onPressAction();
        }}
      >
        <Icon name="google" size={20} color="white" />
        <Text style={{ color: 'white', fontSize: 16, marginLeft: 20 }}>구글 로그인</Text>
      </TouchableOpacity>
    );
  }

  if (type === 'signup') {
    return (
      <Button
        style={styles.button}
        title={title}
        onPress={() => {
          onPressAction();
        }}
      />
    );
  }

  if (type === 'signupPage') {
    return (
      <TouchableOpacity
        style={[styles.btn, styles.signupPageBtn]}
        title={title}
        onPress={() => {
          onPressAction();
        }}
      >
        <Text style={{ color: '#1E90FF', fontSize: 16 }}>회원가입</Text>
      </TouchableOpacity>
    );
  }
};

export default ButtonComponent;
