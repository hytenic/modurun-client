import React, { useRef, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Keyboard } from 'react-native';
import Message from './Message';

const MessageList = ({ messages }) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollView = useRef();

  const avoidKeyboard = () => {
    if (scrollOffset < 300) return;
    scrollView.current.scrollTo({
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
    <ScrollView onScroll={updateScrollOffset} ref={scrollView} style={{ paddingTop: 10 }}>
      {messages.map((message) => <Message data={message} />)}
      <View style={{ height: 10 }} />
    </ScrollView>
  );
};

export default MessageList;
