import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Facebook from '../assets/svg/facebook.svg';

interface FacebookProps {
  label: string;
  onPress: Function;
  disabled: boolean;
}

const FacebookButton: FC<FacebookProps> = ({label, onPress, disabled}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles.btn}
      disabled={disabled}>
      <View style={styles.svg}>
        <Facebook />
      </View>

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default FacebookButton;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '47.4%',
    height: 48,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.19)',
  },

  label: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
  },

  svg: {
    marginRight: 10,
  },
});
