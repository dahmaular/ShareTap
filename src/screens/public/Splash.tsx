import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {PRIMARY_COLOR} from '../../core/color';
import Tapiolla from '../../assets/svg/tap_logo.svg';
import Overlay from '../../assets/svg/overlay.svg';

const Splash = () => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Overlay width={width} />
      </View>
      <Tapiolla />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
});
