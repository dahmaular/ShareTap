import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps {
  label: string;
  loading: boolean;
  onPress: Function;
  disabled: boolean;
}

const Button = (props: ButtonProps) => {
  const {loading} = props;
  const disabled = loading || props.disabled;

  const pressBtn = () => {
    if (loading || disabled) {
      return;
    }

    if (props.onPress) {
      props.onPress();
    }
  };
  return (
    <TouchableOpacity
      onPress={() => pressBtn()}
      style={[styles.btn, {backgroundColor: disabled ? '#333333' : '#316F8A'}]}
      disabled={props.disabled}>
      {loading ? (
        <ActivityIndicator color={'white'} size={'small'} animating={true} />
      ) : (
        <>
          <Text style={styles.label}>{props.label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    borderRadius: 2,
  },

  label: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
