/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface HeaderProps {
  leftSvg: any;
  rightSvg: any;
  title: string;
  bgColor: string;
  titleColor: string;
  rightOnPress: () => void;
  leftOnPress: () => void;
}

const Header: FC<HeaderProps> = ({
  leftSvg,
  rightSvg,
  title,
  bgColor,
  titleColor,
  rightOnPress,
  leftOnPress,
}) => {
  return (
    <View style={{...styles.header, backgroundColor: bgColor}}>
      <TouchableOpacity onPress={() => leftOnPress()}>
        {leftSvg}
      </TouchableOpacity>

      <View>
        <Text style={{...styles.title, color: titleColor, textTransform: 'capitalize'}}>{title}</Text>
      </View>

      <TouchableOpacity onPress={() => rightOnPress()}>
        {rightSvg}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 85,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
  },
});
