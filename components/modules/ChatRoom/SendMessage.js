import React, { useState } from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SendMessage = ({ onSend }) => {
  const [input, setInput] = useState('');
  const setCurInput = (e) => setInput(e.nativeEvent.text);

  const sendMessage = () => {
    onSend(input);
    setInput('');
  };

  return (
    <View style={{ height: 50, flexDirection: 'row', borderTopWidth: 1 ,backgroundColor: 'rgb(220,220,220)', borderTopColor: 'rgba(0,0,0,0.2)', padding:5 }}>
      <TextInput value={input} onChange={setCurInput} style={{ paddingLeft: 10, flex: 1,backgroundColor: 'white', borderRadius: 10 }} placeholderTextColor="rgba(0,0,0,0.5)" placeholder="채팅해라" />
      <TouchableHighlight underlayColor="skyblue" onPress={sendMessage} style={{borderRadius: 10, marginLeft: 5, width: 60, alignItems: 'center', height: '100%', justifyContent: 'center', backgroundColor: 'dodgerblue' }}>
        <Icon name="send" color="white" size={20} />
      </TouchableHighlight>
    </View>
  );
};

export default SendMessage;
