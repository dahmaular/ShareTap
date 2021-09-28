import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import ArrowLeft from '../../assets/svg/thin_big_left.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {UnauthenticatedRoutesParamsList} from '../../types';

type ProfileNavigationProp = StackNavigationProp<
  UnauthenticatedRoutesParamsList,
  'ProfileType'
>;

type Props = {
  navigation: ProfileNavigationProp;
};

const ProfileType = ({navigation}: Props) => {
  return (
    <View style={{flex: 1}}>
      <Header
        title=""
        titleColor="#000000"
        bgColor="#FFFFFF"
        leftSvg={<ArrowLeft />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<></>}
        rightOnPress={() => <></>}
      />
    </View>
  );
};

export default ProfileType;

const styles = StyleSheet.create({});
