import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Close from '../assets/svg/phone-verif-close-icon.svg';
import Mail from '../assets/svg/modal-bell.svg';
import {PRIMARY_COLOR} from '../core/color';

type Props = {
  visible: boolean;
  onBackdropPress: Function;
  onBackButtonPress: Function;
  onClose: Function;
};

const NotificationModal = ({
  visible,
  onBackdropPress,
  onBackButtonPress,
  onClose,
}: Props) => {
  const [modal] = useState(visible);

  const closeModal = () => {
    onClose();
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
          <Mail height={50} width={50} />

          <View style={{marginTop: 34}}>
            <Text style={styles.modalContentText}>
              Magic Johnson wants to exchange cards with you
            </Text>
          </View>
        </View>
        <View style={styles.modalButtonsWrap}>
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() => closeModal()}>
            <Text style={styles.modalBtnText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalExchangeButton}
            onPress={() => closeModal()}>
            <Text style={styles.modalBtnText}>EXCHANGE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;

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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 54,
  },

  modalButtonsWrap: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 38,
  },

  modalCancelButton: {
    height: 40,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    marginRight: 25,
  },

  modalExchangeButton: {
    height: 40,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },

  modalContentWrap: {
    width: '100%',
    paddingHorizontal: 21,
    alignItems: 'center',
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
});
