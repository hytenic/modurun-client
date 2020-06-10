/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'green',
  },
});

const ButtonComponent = ({ type, title, info, onPressAction }) => {
  if (type === 'email') {
    const { email, password } = info;
    return (
      <TouchableOpacity
        style={styles.button}
        title={title}
        onPress={() => {
          console.log(`${email} ${password}`);
          onPressAction(email, password);
        }}
      >
        <Text>로그인</Text>
      </TouchableOpacity>
    );
  }

  if (type === 'google') {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red' }]}
        title={title}
        onPress={() => {
          onPressAction();
        }}
      >
        <Text>구글 로그인</Text>
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
};

export default ButtonComponent;
