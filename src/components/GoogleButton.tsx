import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Google from '../assets/svg/google.svg';

interface GoogleProps {
  label: string;
  onPress: Function;
  disabled: boolean;
}

const GoogleButton: FC<GoogleProps> = ({label, onPress, disabled}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles.btn}
      disabled={disabled}>
      <View style={styles.svg}>
        <Google />
      </View>

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
