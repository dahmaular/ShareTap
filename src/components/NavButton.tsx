import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const NavButton = (props: any) => {
  const pressBtn = () => {
    if (props.onPress) {
      props.onPress();
    }
  };
  return (
    <TouchableOpacity onPress={() => pressBtn()} style={styles.btn}>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default NavButton;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    borderRadius: 2,
    backgroundColor: '#F4F3F3',
  },

  label: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
  },
});
