import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import Header from '../../components/Header';
import ArrowLeft from '../../assets/svg/thin_big_left.svg';
import {BACKGROUND_COLOR} from '../../core/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {UnauthenticatedRoutesParamsList} from '../../types';
import PhoneInput from 'react-native-phone-number-input';
import Button from '../../components/Button';

const {width} = Dimensions.get('screen');

type PhoneNavigationProp = NativeStackNavigationProp<
  UnauthenticatedRoutesParamsList,
  'PhoneNumber'
>;

type PhoneNumberRouteProp = RouteProp<
  UnauthenticatedRoutesParamsList,
  'PhoneNumber'
>;

type Props = {
  navigation: PhoneNavigationProp;
  route: PhoneNumberRouteProp;
};

const PhoneNumber = ({navigation, route}: Props) => {
  const {item} = route.params;
  console.log('Item on Phone Number', item);
  const phoneInput = useRef(null);
  const [phone, setPhone] = useState('');

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
            <Text style={styles.createText}>Phone Number</Text>
            <Text style={styles.create}>
              Add your phone to verify your account{' '}
            </Text>
          </View>

          <PhoneInput
            ref={phoneInput}
            defaultValue={phone}
            defaultCode="NG"
            layout="first"
            onChangeText={text => setPhone(text)}
            containerStyle={styles.phone}
            textContainerStyle={styles.phoneText}
            textInputStyle={styles.phoneInput}
            codeTextStyle={styles.codeText}
            flagButtonStyle={styles.flag}
            withShadow={true}
          />

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

export default PhoneNumber;

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
    marginTop: 67,
  },

  phone: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 126,
    elevation: 10,
    shadowColor: '#5468FF4D',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  phoneText: {
    backgroundColor: 'transparent',
  },

  codeText: {
    color: '#ABB4BD',
    fontSize: 12,
    marginTop: 7,
  },

  phoneInput: {
    color: '#ABB4BD',
    fontSize: 12,
    marginTop: 7,
  },

  flag: {
    marginLeft: 10,
    marginTop: 7,
  },
});
