/* eslint-disable react/require-default-props */
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
// import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  textInput: {
    width: 250,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
});

const TextInputComponent = ({
  type, placeholder, value, setAction, onTouchStart, onSubmitEditing, style,
}) => {
  if (type === 'email') { // 로그인 : 값만 넘겨줌, 회원가입 : 변수로 여기를 지나간 적이 있는지를 알려줘야함(onTouchStart)
    return (
      <TextInput
        style={[styles.textInput, style]}
        placeholder={placeholder}
        defaultValue={value}
        onChangeText={(text) => {
          setAction(text);
        }}
        onTouchStart={onTouchStart}
        onSubmitEditing={onSubmitEditing}
      />
    );
  }
  if (type === 'password') { // 로그인 : 없음, 회원가입 : 이메일 중복 확인 post를 날려줘야 한다.
    return (
      <TextInput
        style={[styles.textInput, style]}
        placeholder={placeholder}
        defaultValue={value}
        secureTextEntry
        onChangeText={(text) => {
          setAction(text);
        }}
        onTouchStart={onTouchStart}
        onSubmitEditing={onSubmitEditing}
      />
    );
  }
  if (type === 'confirmPassword') { // 회원가입에서만 사용됨
    return (
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        defaultValue={value}
        secureTextEntry
        onChangeText={(confirm) => {
          setAction(confirm);
        }}
      />
    );
  }
};

export default TextInputComponent;
