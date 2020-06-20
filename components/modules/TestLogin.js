import React from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import testUtils from './TestUtils/index';

const TestLogin = () => {
  const login = () => {
    testUtils.testUserLogin()
      .then((res) => {
        console.log(JSON.stringify(res));
        console.log('logged In');
        Alert.alert('Login', 'TestUser Logged In');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={login} style={{ height: 200, backgroundColor: 'red', justifyContent: 'center' }}>
        <Text style={{fontSize: 30, textAlign: 'center', textAlignVertical: 'center'}}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestLogin;
