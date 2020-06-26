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

const ChatRoom = ({ route, data, offset, dispatch }) => {
  const { params } = route;
  const { scheduleId, userId, username, scheduleTitle } = params;
  const [socket, setSocket] = useState(null);
  const [messageListRef, setMessageListRef] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    modurunAPI.messages.getMessages(scheduleId, offset[scheduleId] || 0)
      .then((res) => res.json())
      .then((json) => {
        setRefreshing(false);
        dispatch(chatRoomActions.addMessagesToHead(json, scheduleId));
      });
  }, [refreshing, offset]);

  const sendMessage = (...args) => {
    const [msgScheduleId, msgUserId, username, message] = args;
    const msgObj = { username, message, createdAt: Date.now() };
    const isMine = userId === msgUserId;
    const msgCheckedMine = Object.assign(msgObj, { isMine });
    dispatch(chatRoomActions.addMessage(msgCheckedMine, msgScheduleId));
    setTimeout(() => messageListRef.current.scrollToEnd(), 100);
  };

  const appendEventToSocket = (socket) => {
    socket.emit('joinRoom', scheduleId, username);
    socket.on('connect_error', (err) => console.log('소켓 연결 안 됨', JSON.stringify(err)));
    socket.on('chat message', sendMessage);
  };

  useEffect(() => {
    const newSocket = io('https://modurun.xyz', {
      transports: ['websocket'],
      upgrade: false,
      forceNew: true,
    });

    newSocket.on('connect', () => {
      setSocket(newSocket);
    });

    if (data[scheduleId]) {
      appendEventToSocket(newSocket);
    } else {
      modurunAPI.messages.getMessages(scheduleId, 0)
        .then((res) => res.json())
        .then((json) => {
          const chatCheckedMine = utils.checkMyMessage(json);
          dispatch(chatRoomActions.updateChat(chatCheckedMine, scheduleId));
          appendEventToSocket(newSocket);
        });
    }

    return () => {
      newSocket.disconnect();
      newSocket.removeAllListeners();
    };
  }, [scheduleId, messageListRef]);

  const onSend = (message) => {
    if (!message) return;
    if (!socket.connected) return;
    socket.emit('chat message', scheduleId, userId, username, message);
  };

  return (
    <View style={{ flex: 1 }}>
      <MessageList
        ref={messageListRef}
        messages={data[scheduleId] || []}
        scrollOffset={scrollOffset}
        setScrollOffset={setScrollOffset}
        onRefReady={(ref) => { setMessageListRef(ref); }}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      <SendMessage onSend={onSend} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.chatRoom.data,
    offset: state.chatRoom.offset,
  };
};

export default connect(mapStateToProps, null)(ChatRoom);
