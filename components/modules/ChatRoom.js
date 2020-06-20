import io from 'socket.io-client';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageList from './ChatRoom/MessageList';
import dummyChat from './ChatRoom/dummyChat.json';

const ChatRoom = () => {
  const [curChat, setCurChat] = useState(dummyChat);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    console.log('채팅 보내는 액션');
    addChat(input);
  };

  const setCurInput = (e) => setInput(e.nativeEvent.text);

  return (
    <View style={{ flex: 1 }}>
      <MessageList messages={curChat} />
      <View style={{ height: 50, flexDirection: 'row', borderTopWidth: 1 }}>
        <TextInput value={input} onChange={setCurInput} style={{ paddingLeft: 10, flex: 1 }} placeholderTextColor="rgba(0,0,0,0.5)" placeholder="채팅해라" />
        <TouchableHighlight underlayColor="skyblue" onPress={sendMessage} style={{ width: 50, alignItems: 'center', height: '100%', justifyContent: 'center', backgroundColor: 'dodgerblue' }}>
          <Icon name="send" color="white" size={30} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
