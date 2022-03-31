/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface HeaderProps {
  leftSvg: any;
  searchBar: any;
  bgColor: string;
  rightOnPress: () => void;
  leftOnPress: () => void;
}

const SearchContactHeader: FC<HeaderProps> = ({
  leftSvg,
  searchBar,
  bgColor,
  rightOnPress,
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

      <View style={styles.right}>{searchBar}</View>
    </View>
  );
};

export default SearchContactHeader;

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
