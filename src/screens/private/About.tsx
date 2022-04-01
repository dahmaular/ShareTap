/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  //   TextInput,
} from 'react-native';
import Back from '../../assets/svg/back.svg';
import Logo from '../../assets/svg/Logo green.svg';
import Copyright from '../../assets/svg/copyright.svg';
import DashboardHeader from '../../components/DashboardHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {PRIMARY_COLOR} from '../../core/color';

const {width, height} = Dimensions.get('screen');

const About = ({navigation}) => {
  return (
    <View style={styles.container}>
      <DashboardHeader
        bgColor="#316F8A"
        titleColor="#FFFFFF"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        title="About"
      />
      <View style={styles.body}>
        <Logo />
        <View style={styles.version}>
          <Text style={styles.vText}>VERSION 1.0.0</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Copyright />
        <Text style={styles.vText}>
          2021 Tapiolla Technologies. All rights reserved
        </Text>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginTop: width / 2,
  },
  version: {
    marginTop: 10,
  },
  vText: {
    color: 'rgba(51, 51, 51, 0.51)',
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
  },
});
