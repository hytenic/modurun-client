import React, { useRef, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import Message from './Message';

const MessageList = ({messages}) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollView = useRef();
  useEffect(() => {
    console.log(Object.keys(scrollView.current));
    // scrollView.current.scrollToEnd();
  }, []);

  const updateScrollOffset = (e) => {
    console.log(Object.keys(e.nativeEvent));
    console.log(e.nativeEvent.layoutMeasurement);
    console.log(e.nativeEvent.contentSize.height);
    console.log(scrollOffset);
    setScrollOffset(e.nativeEvent.contentOffset);
  };

  return (
    <ScrollView onScroll={updateScrollOffset} ref={scrollView} style={{ paddingTop: 10 }}>
      {messages.map((message) => <Message data={message} />)}
      <View style={{ height: 10 }} />
    </ScrollView>
  );
};

export default MessageList;
