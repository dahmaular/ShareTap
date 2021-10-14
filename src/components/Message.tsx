import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, Animated} from 'react-native';
import Close from '../assets/svg/close.svg';

interface MessageProps {
  onHide: () => void;
  message: string;
}

const Message = ({onHide, message}: MessageProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, []);
  return (
    <Animated.View
      style={{
        ...styles.animatedView,
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }}>
      <Text style={styles.animatedText}>{message}</Text>
      <Close />
    </Animated.View>
  );
};

export default Message;

const styles = StyleSheet.create({
  animatedView: {
    backgroundColor: 'rgba(251, 188, 5, 0.1)',
    width: '100%',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  animatedText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#F2994A',
  },
});
