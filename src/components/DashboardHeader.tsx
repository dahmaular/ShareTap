/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface HeaderProps {
  leftSvg: any;
  title: string;
  bgColor: string;
  titleColor: string;
  leftOnPress: () => void;
}

const DashboardHeader: FC<HeaderProps> = ({
  leftSvg,
  title,
  bgColor,
  titleColor,
  leftOnPress,
}) => {
  return (
    <View style={{...styles.header, backgroundColor: bgColor}}>
      <TouchableOpacity onPress={() => leftOnPress()}>
        {leftSvg}
      </TouchableOpacity>

      <View>
        <Text style={{...styles.title, color: titleColor}}>{title}</Text>
      </View>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 85,
    // justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    marginLeft: 10,
  },
});
