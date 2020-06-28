import React, { useRef, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Keyboard, RefreshControl } from 'react-native';
import Message from './Message';

const MessageList = ({
  messages,
  scrollOffset,
  setScrollOffset,
  onRefReady,
  refreshing,
  onRefresh
}) => {
  const listRef = useRef();

  const avoidKeyboard = () => {
    if (scrollOffset < 300) return;
    listRef.current.scrollTo({
      x: 0,
      y: scrollOffset + 300,
      animated: true,
    });
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', avoidKeyboard);
    return () => {
      Keyboard.removeListener('keyboardDidShow', avoidKeyboard);
    };
  }, [scrollOffset]);

  const updateScrollOffset = (e) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const maxScroll = contentSize.height - layoutMeasurement.height;
    const curScroll = contentOffset.y;
    setScrollOffset(curScroll);
  };

  return (
    <ScrollView
      onLayout={() => onRefReady(listRef)}
      onScroll={updateScrollOffset}
      ref={listRef}
      style={{ paddingTop: 10 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {messages.map((message) => <Message data={message} />)}
      <View style={{ height: 15 }} />
    </ScrollView>
  );
};

export default MessageList;
