import React, { useState, useRef } from 'react';
import { View, Text, Alert, Animated, Easing } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const APITestButton = ({test, text}) => {
  const colorAnim = useRef(new Animated.Value(0)).current;
  const [result, setResult] = useState(false);

  const recoverAnim = () => {
    Animated.sequence([
      Animated.delay(100000),
      Animated.timing(colorAnim, {
        toValue: 0,
        duration: 1000,
      }),
    ]).start();
  };

  const dangerColorAnim = () => {
    Animated.timing(colorAnim, {
      toValue: -1,
      duration: 500,
    }).start(recoverAnim);
  };

  const safeColorAnim = () => {
    Animated.timing(colorAnim, {
      toValue: 1,
      duration: 500,
    }).start(recoverAnim);
  };

  const backgroundColorAnimated = colorAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['rgba(255, 0, 0, 1)', 'rgba(200, 200, 200, 1)', 'dodgerblue'],
  });

  const textColorAnimated = colorAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['white', 'black', 'white'],
  });

  const onPress = () => {
    test()
      .then(async (res) => {
        if (res.ok) {
          const data = await res.text();
          Alert.alert('SUCCESS', data);
          safeColorAnim();
        } else {
          dangerColorAnim();
          Alert.alert('FAIL', JSON.stringify(res));
        }
      });
  };

  const regMatched = String(text).match(/([A-Z]+\s?[A-Z]+)\s(.+)/);
  const upperCases = regMatched[1];
  const latter = regMatched[2];

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={onPress} style={{ elevation: 1, borderWidth: 1, borderColor: 'rgb(200,200,200)', borderRadius: 20, margin: 5 }}>
        <Animated.View style={{ backgroundColor: backgroundColorAnimated, padding: 10, alignItems: 'center', borderRadius: 20 }}>
          <Animated.Text style={{ fontWeight: 'bold', color: textColorAnimated }}>{upperCases}</Animated.Text>
          <Animated.Text style={{ color: textColorAnimated }}>{latter}</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default APITestButton;
