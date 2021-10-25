import React from 'react';
import {StyleSheet, Animated, FlatList} from 'react-native';

import RolodexScrollItem from '../components/RolodexScrollItem';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const RolodexScrollList = (props: any) => {
  const {
    data,
    renderItem,
    distanceBetweenItem: distance,
    ...otherProps
  } = props;

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });

  let distanceBetweenItem: number = distance || 8;
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      data={data}
      renderItem={data => {
        let item = renderItem(data);
        const {index} = data;
        return <RolodexScrollItem {...{index, y, item, distanceBetweenItem}} />;
      }}
      {...{onScroll}}
      {...otherProps}
    />
  );
};

export default RolodexScrollList;

const styles = StyleSheet.create({});
