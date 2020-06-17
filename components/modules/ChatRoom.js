import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageList from './ChatRoom/MessageList';
import dummyChat from './ChatRoom/dummyChat.json';

const ChatRoom = () => {
  const [dummyCount, setDummyCount] = useState(0);
  const addDummyCount = () => setDummyCount(dummyCount + 1);

  const sendMessage = () => {
    addDummyCount();
    console.log(`여기서 채팅 보내는 거 해야됨 ${dummyCount}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <MessageList messages={dummyChat} />
      <View style={{ height: 50, flexDirection: 'row', borderTopWidth: 1 }}>
        <TextInput style={{ paddingLeft: 10, flex: 1 }} placeholderTextColor="rgba(0,0,0,0.5)" placeholder="채팅해라" />
        <TouchableHighlight underlayColor="skyblue" onPress={sendMessage} style={{ width: 50, alignItems: 'center', height: '100%', justifyContent: 'center', backgroundColor: 'dodgerblue' }}>
          <Icon name="send" color="white" size={30} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
