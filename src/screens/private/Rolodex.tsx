import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import {AuthenticatedRoutesParamsList} from '../../types';
import Back from '../../assets/svg/back.svg';
import More from '../../assets/svg/more.svg';

type RolodexProps = NativeStackNavigationProp<
  AuthenticatedRoutesParamsList,
  'Rolodex'
>;

type RolodexRouteProp = RouteProp<AuthenticatedRoutesParamsList, 'Rolodex'>;

type Props = {
  navigation: RolodexProps;
  route: RolodexRouteProp;
};

const Rolodex = ({navigation}: Props) => {
  return (
    <View style={{flex: 1}}>
      <Header
        title="Rolodex"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<More />}
        rightOnPress={() => <></>}
      />
    </View>
  );
};

export default Rolodex;

const styles = StyleSheet.create({});
