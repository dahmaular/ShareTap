/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface HeaderProps {
  leftSvg: any;
  rightSvg1: any;
  rightSvg2: any;
  rightSvg3: any;
  bgColor: string;
  rightOnPress: () => void;
  rightSvg2OnPress: () => void;
  leftOnPress: () => void;
}

const CreateCardHeader: FC<HeaderProps> = ({
  leftSvg,
  rightSvg1,
  rightSvg2,
  rightSvg3,
  bgColor,
  rightOnPress,
  rightSvg2OnPress,
  leftOnPress,
}) => {
  return (
    <View style={{...styles.header, backgroundColor: bgColor}}>
      <TouchableOpacity onPress={() => leftOnPress()}>
        {leftSvg}
      </TouchableOpacity>

      {/* <View>
        <Text style={{...styles.title, color: titleColor}}>{title}</Text>
      </View> */}

      <View style={styles.right}>
        <TouchableOpacity
          style={{marginRight: 30}}
          onPress={() => rightOnPress()}>
          {rightSvg1}
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 30}}
          onPress={() => rightSvg2OnPress()}>
          {rightSvg2}
        </TouchableOpacity>
        <TouchableOpacity
        // onPress={() => rightOnPress()}
        >
          {rightSvg3}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateCardHeader;

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
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
