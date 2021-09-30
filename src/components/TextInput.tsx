import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';

type Props = React.ComponentProps<typeof Input> & {errorText?: string};

const TextInput = ({errorText, ...props}: Props) => {
  return (
    <View style={styles.container}>
      <Input
        style={{backgroundColor: '#FFFFFF'}}
        selectionColor={'#000000'}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {errorText ? (
        <Text style={{...styles.error, color: 'red'}}>{errorText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  error: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default TextInput;
