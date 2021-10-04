import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import ArrowLeft from '../../assets/svg/thin_big_left.svg';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Mail from '../../assets/svg/mail.svg';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {UnauthenticatedRoutesParamsList} from '../../types';
import PhoneInput from 'react-native-phone-number-input';
import Button from '../../components/Button';
import Modal from 'react-native-modal';

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
  const [modal, setModal] = useState(false);

  const _onRegisterPressed = () => {
    setModal(true);
  };

  const proceedToVerify = () => {
    setModal(false);
    navigation.navigate('Verification', {
      item: {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        fullName: item.fullName,
        email: item.email,
        password: item.password,
        phone: phone,
      },
    });
  };

  const phoneVerificationModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.bottomModal}
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
        onBackButtonPress={() => setModal(false)}>
        <TouchableOpacity
          onPress={() => setModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.modal}>
          <View style={styles.modalContentWrap}>
            <View style={styles.mailBg}>
              <Mail height={50} width={50} />
            </View>

            <View style={{marginTop: 30}}>
              <Text style={styles.modalContentText}>
                We have sent a verification code{' '}
              </Text>
              <Text style={styles.modalContentText}>
                to{' '}
                <Text style={styles.modalContentPhoneText}>
                  +1 ... ... ... ... 9237
                </Text>
              </Text>
            </View>

            <View style={{marginTop: 17}}>
              <Text style={styles.didReceiveText}>
                DIDNT RECEIVE A CODE?{' '}
                <Text style={styles.resendText}>RESEND CODE</Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => proceedToVerify()}>
            <Text style={styles.modalBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      {modal && phoneVerificationModal()}
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

  bottomModal: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  modal: {
    width: '100%',
    height: 332,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  modalButton: {
    height: 73,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },

  modalContentWrap: {height: 259, width: '100%', paddingHorizontal: 20},

  modalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  modalCloseBtn: {marginBottom: 24, alignSelf: 'flex-end'},

  mailBg: {
    width: 67,
    height: 67,
    borderRadius: 50,
    backgroundColor: '#209AD7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 53,
  },

  modalContentText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#000000',
  },

  modalContentPhoneText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#209AD7',
  },

  didReceiveText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#9E9E9E',
  },

  resendText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: PRIMARY_COLOR,
  },
});
