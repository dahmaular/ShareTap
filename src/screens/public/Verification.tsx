import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import Header from '../../components/Header';
import ArrowLeft from '../../assets/svg/thin_big_left.svg';
import {BACKGROUND_COLOR} from '../../core/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {UnauthenticatedRoutesParamsList} from '../../types';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from '../../components/Button';

const {width} = Dimensions.get('screen');

type VerifyNavigationProp = NativeStackNavigationProp<
  UnauthenticatedRoutesParamsList,
  'Verification'
>;

type VerifyRouteProp = RouteProp<
  UnauthenticatedRoutesParamsList,
  'Verification'
>;

type Props = {
  navigation: VerifyNavigationProp;
  route: VerifyRouteProp;
};

const Verification = ({navigation, route}: Props) => {
  const {item} = route.params;
  const [otpCode, setOtpCode] = useState('');

  const _onRegisterPressed = () => {};

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
      <View style={styles.container}>
        <ScrollView
          style={styles.createContainer}
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.createView}>
            <Text style={styles.createText}>Verification</Text>
            <Text style={styles.create}>
              A pin was sent to your phone, kindly confrim and input
            </Text>
          </View>

          <View style={styles.otpContainer}>
            <OTPInputView
              style={styles.otpInputView}
              pinCount={6}
              onCodeChanged={code => {
                setOtpCode(code);
              }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {}}
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              disabled={false}
              loading={false}
              label="CONTINUE"
              onPress={() => _onRegisterPressed()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  createContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    paddingHorizontal: 15,
  },

  createView: {
    width: '100%',
  },

  createText: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },

  create: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(51, 51, 51, 0.51)',
  },

  buttonView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 200,
    marginBottom: 40
  },

  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  otpInputView: {
    width: '100%',
    height: 100,
    marginTop: 55,
  },

  //OTP box

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },

  underlineStyleHighLighted: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    borderWidth: 1,
    borderColor: '#209AD7',
  },
});
