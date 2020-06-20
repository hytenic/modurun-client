/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Animated, SliderComponent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaskedView from '@react-native-community/masked-view';

const Rate = ({onRate, size, color, score}) => {
  const [rateBoxWidth, setRateBoxWidth] = useState(0);
  const [slide, setSlide] = useState(200);
  const [initialized, setInitialized] = useState(false);

  const iconProps = {
    size: size || 32,
    name: 'star',
    style: {
      marginRight: 2,
    },
    color: 'lightgrey',
  };

  useEffect(() => {
    if (score !== undefined) {
      setSlide(rateBoxWidth * (score / 5));
    }
  }, []);

  const catchViewSize = (e) => {
    if (rateBoxWidth) return;
    setRateBoxWidth(e.nativeEvent.layout.width);
    setInitialized(true);
  };

  const catchSlideRatio = (e) => {
    if (score !== undefined) return;
    const { locationX } = e.nativeEvent;
    const rawRatio = locationX / rateBoxWidth;
    const slideRatio = rawRatio > 1 ? 1 : rawRatio;
    setSlide(slideRatio * rateBoxWidth);
  };

  const recordRate = () => {
    if (score !== undefined) return;
    const slideRatio = slide / rateBoxWidth;
    const snappedRatio = (Math.round(slideRatio * 10) / 10);
    const newSlide = snappedRatio * rateBoxWidth;
    setSlide(newSlide);
    if (!onRate) return;
    onRate(snappedRatio * 5);
  };

  const rateBoxProp = {
    style: {
      flexDirection: 'row',
    },
  };

  const rateBox = (
    <View pointerEvents="none" {...rateBoxProp}>
      <Icon {...iconProps} />
      <Icon {...iconProps} />
      <Icon {...iconProps} />
      <Icon {...iconProps} />
      <Icon {...iconProps} />
    </View>
  );

  const renderRateBox = () => {
    if (!initialized) {
      return rateBox;
    }

    return (
      <MaskedView style={{ backgroundColor: 'transparent' }} maskElement={rateBox}>
        <View style={{ width: slide, height: size || 32, backgroundColor: color || 'orange' }} />
      </MaskedView>
    );
  };

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View
          onLayout={(e) => catchViewSize(e)}
          onMoveShouldSetResponder={() => true}
          onResponderMove={catchSlideRatio}
          onResponderEnd={recordRate}
          style={{ flexDirection: 'row', width: initialized ? rateBoxWidth : undefined }}
        >
          <View style={{position: 'absolute'}}>
            {rateBox}
          </View>
          {renderRateBox()}
        </View>
      </View>
    </View>
  );
};

export default Rate;
