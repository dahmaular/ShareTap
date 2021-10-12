import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {CardProps} from '../types';

const {width} = Dimensions.get('window');

const Card = ({item, index, boxWidth, halfBoxDistance, pan}: CardProps) => {
  return (
    <Animated.View
      style={{
        ...styles.animatedCard,
        transform: [
          {
            scale: pan.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
              ],
              outputRange: [0.8, 1, 0.8], // scale down when out of scope
              extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <TouchableOpacity style={{...styles.touchable, width: boxWidth}}>
        <Text>I dey here</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  animatedCard: {
    height: 191,
    width: width,
    borderWidth: 1,
    borderColor: 'rgba(49, 111, 138, 0.16)',
    backgroundColor: '#FFFFFF',
    marginRight: -25,
  },

  touchable: {
    height: 191,
    paddingHorizontal: 20,
  },
});
