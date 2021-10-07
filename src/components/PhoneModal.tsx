import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Close from '../assets/svg/phone-verif-close-icon.svg';
import Mail from '../assets/svg/mail.svg';
import {PRIMARY_COLOR} from '../core/color';

type Props = {
  navigation: any;
  route: any;
  phone: string;
  visible: boolean;
  onBackdropPress: Function;
  onBackButtonPress: Function;
  onClose: Function;
};

const PhoneModal = ({
  navigation,
  route,
  phone,
  visible,
  onBackdropPress,
  onBackButtonPress,
  onClose,
}: Props) => {
  const [wait, setWait] = useState(false);
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

  const proceedToVerify = () => {
    onClose();
    navigation.navigate('Verification', {
      item: {
        id: route.id,
        title: route.title,
        description: route.description,
        image: route.image,
        fullName: route.fullName,
        email: route.email,
        password: route.password,
        phone: phone,
      },
    });
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
          <View style={styles.mailBg}>
            <Mail height={50} width={50} />
          </View>

          <View style={{marginTop: 30}}>
            <Text style={styles.modalContentText}>
              We have sent a verification code{' '}
            </Text>
            <Text style={styles.modalContentText}>
              to <Text style={styles.modalContentPhoneText}>{phone}</Text>
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
              <Text style={styles.didReceiveText}>
                DIDNT RECEIVE A CODE?{' '}
                <Text style={styles.resendText}>RESEND CODE</Text>
              </Text>
            </View>
          )}
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

export default PhoneModal;

const styles = StyleSheet.create({
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
