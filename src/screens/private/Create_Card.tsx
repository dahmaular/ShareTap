/* eslint-disable prettier/prettier */
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import Back from '../../assets/svg/back.svg';
import More from '../../assets/svg/more.svg';

const {width} = Dimensions.get('screen');

const deviceHeight = Dimensions.get('window').height;

const CreateCard = ({navigation}: Props) => {
  return (
    <View style={{flex: 1}}>
      <Header
        title=""
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<More />}
        rightOnPress={() => null}
      />
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.categoriesView}></View>

          <View></View>
        </View>
      </View>
    </View>
  );
};

export default CreateCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  categoriesView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
    height: 35,
    paddingHorizontal: 20,
  },
});
