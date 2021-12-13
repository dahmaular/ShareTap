import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Close from '../assets/svg/phone-verif-close-icon.svg';
import Message from '../assets/svg/message-icon.svg';
import {PRIMARY_COLOR} from '../core/color';
import {resendSignUpService} from '../services/authService';
import {hubDispatch} from '../core/awsExports';

type Props = {
  navigation: any;
  userName: string;
  visible: boolean;
  onBackdropPress: Function;
  onBackButtonPress: Function;
  onClose: Function;
};

const EmailModal = ({
  navigation,
  userName,
  visible,
  onBackdropPress,
  onBackButtonPress,
  onClose,
}: Props) => {
  const [wait, setWait] = useState(false);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(59);
  const [modal] = useState(visible);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
      setWait(true);
    } else {
      setWait(false);
    }
  });

  const proceedToResetPassword = () => {
    onClose();
    navigation.navigate('Verification', {
      item: {
        userName: userName,
        isForgotPassword: true,
      },
    });

    // navigation.navigate('ResetPassword'); //! routing should proceed to verification page
  };


  const resendEmailOTP = () => {
    setCounter(59);
    setWait(true);
    resendSignUpService(userName)
      .then(data => {
        console.log('Response Data', data);
      })
      .catch(e => {
        console.log('Errrrorrr', e)
      })
      .finally(() => {});
  };

  return (
    <Modal
      avoidKeyboard
      propagateSwipe={true}
      style={styles.bottomModal}
      isVisible={modal}
      onBackdropPress={() => onBackdropPress()}
      onBackButtonPress={() => onBackButtonPress()}>
      <TouchableOpacity onPress={() => onClose()} style={styles.modalCloseBtn}>
        <Close />
      </TouchableOpacity>
      <View style={styles.modal}>
        <View style={styles.modalContentWrap}>
          <View style={styles.modalContentIcon}>
            <Message height={43} width={43} />
          </View>

          <View style={{marginTop: 30}}>
            <Text style={styles.modalContentText}>
              A reset code has been sent to your
            </Text>
            <Text style={styles.modalContentText}>
              registered <Text style={styles.modalContentPhoneText}>phone number</Text>
            </Text>
          </View>

          {wait ? (
            <View style={{marginTop: 17}}>
              <Text style={styles.didReceiveText}>
                RESEND CODE IN{' '}
                <Text style={styles.resendText}>{counter} SECS</Text>
              </Text>
            </View>
          ) : (
            <View style={{marginTop: 17}}>
              <Text style={styles.didReceiveText} >
                DIDNT RECEIVE A CODE?{' '}
                <Text style={styles.resendText} onPress={()=>resendEmailOTP()}>RESEND CODE</Text>
              </Text>
            </View>
          )}
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

export default EmailModal;

const styles = StyleSheet.create({
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
    textDecorationLine: 'underline',
  },
});
