import React, {useState} from 'react';
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
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {UnauthenticatedRoutesParamsList} from '../../types';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Message from '../../assets/svg/message-icon.svg';
import TextInputs from '../../components/TextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-paper';
import Button from '../../components/Button';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';
import Modal from 'react-native-modal';

const {width} = Dimensions.get('screen');

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  UnauthenticatedRoutesParamsList,
  'ForgotPassword'
>;

type ForgotPasswordRouteProp = RouteProp<
  UnauthenticatedRoutesParamsList,
  'ForgotPassword'
>;

type Props = {
  navigation: ForgotPasswordNavigationProp;
  route: ForgotPasswordRouteProp;
};

const ForgotPassword = ({navigation, route}: Props) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [emailFocus, setEmailFocus] = useState(false);
  const [modal, setModal] = useState(false);

  const _onRegisterPressed = () => {
    setModal(true);
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
  };

  const proceedToResetPassword = () => {
    setModal(false);
    navigation.navigate('ResetPassword');
  };

  const forgotPasswordModal = () => {
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
            <View style={styles.modalContentIcon}>
              <Message height={43} width={43} />
            </View>

            <View style={{marginTop: 30}}>
              <Text style={styles.modalContentText}>
                A reset link has been sent to your
              </Text>
              <Text style={styles.modalContentText}>
                to{' '}
                <Text style={styles.modalContentPhoneText}>
                  mailbox Mu***bs24@gmail.com
                </Text>
              </Text>
            </View>

            <View style={{marginTop: 17}}>
              <Text style={styles.didReceiveText}>
                DIDNT RECEIVE A LINK?
                <Text style={styles.resendText}> RESEND LINK</Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => proceedToResetPassword()}>
            <Text style={styles.modalBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      {modal && forgotPasswordModal()}
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
            <Text style={styles.createText}>Forgot password</Text>
            <Text style={styles.create}>Enter your email address</Text>
          </View>

          <TextInputs
            label="Email"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Enter your email address"
            value={email.value}
            onChangeText={text => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            style={{
              backgroundColor: emailFocus ? '#FFFFFF' : '#EEEFEF',
              marginTop: 34,
            }}
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

export default ForgotPassword;

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
  },

  bottomModal: {
    justifyContent: 'flex-end',
    paddingBottom: 60,
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

  modalContentWrap: {
    height: 259,
    width: '100%',
    paddingHorizontal: 29,
    paddingTop: 56.93,
  },
  modalContentIcon: {
    paddingLeft: 13,
    marginBottom: 30,
  },
  modalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  modalCloseBtn: {marginBottom: 24, alignSelf: 'flex-end'},

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
    textDecorationLine: 'underline'
  },
});
