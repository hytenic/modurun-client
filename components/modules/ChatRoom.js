import io from 'socket.io-client';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageList from './ChatRoom/MessageList';
import chatRoomActions from '../../redux/action/ChatRoom/creator';
import modurunAPI from '../modules/API/index';
import SendMessage from './ChatRoom/SendMessage';
import utils from './ChatRoom/utils';

const ChatRoom = ({ route, data, dispatch }) => {
  const { params } = route;
  const { scheduleId, userId, username } = params;
  const [socket, setSocket] = useState(null);
  const messageListRef = React.createRef();
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const newSocket = io('https://modurun.xyz', {
      transports: ['websocket'],
      upgrade: false,
      forceNew: true,
    });

    newSocket.on('connect', () => {
      setSocket(newSocket);
    });

    modurunAPI.messages.getMessages(scheduleId, 0)
      .then((res) => res.json())
      .then((json) => {
        const chatCheckedMine = utils.checkMyMessage(json);
        dispatch(chatRoomActions.updateChat(chatCheckedMine, scheduleId));
        newSocket.emit('joinRoom', scheduleId, username);
        newSocket.on('connect_error', (err) => console.log('소켓 연결 안 됨', JSON.stringify(err)));
        newSocket.on('chat message', (...args) => {
          const [msgScheduleId, msgUserId, username, message] = args;
          const msgObj = { username, message, createdAt: Date.now() };
          const isMine = userId === msgUserId;
          const msgCheckedMine = Object.assign(msgObj, { isMine });
          dispatch(chatRoomActions.addMessage(msgCheckedMine, msgScheduleId));
        });
      });
    return () => {
      newSocket.disconnect();
      newSocket.removeAllListeners();
    };
  }, [scheduleId]);

  const sendMessage = (message) => {
    if (!message) return;
    if (!socket.connected) return;
    socket.emit('chat message', scheduleId, userId, username, message);
    messageListRef.current.scrollToEnd();
  };

  return (
    <View style={{ flex: 1 }}>
      <MessageList
        ref={messageListRef}
        messages={data[scheduleId] || []}
        scrollOffset={scrollOffset}
        setScrollOffset={setScrollOffset}
      />
      <SendMessage onSend={sendMessage} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.chatRoom.data,
  };
};

export default connect(mapStateToProps, null)(ChatRoom);
