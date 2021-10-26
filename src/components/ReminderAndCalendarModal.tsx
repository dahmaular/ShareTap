import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Close from '../assets/svg/phone-verif-close-icon.svg';
import Mail from '../assets/svg/modal-bell.svg';
import Calendar from '../assets/svg/calendar-icon.svg';
import Clock from '../assets/svg/clock-icon.svg';
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
        <TouchableOpacity style={styles.modalActionButton}>
          <Calendar height={24} width={24} />
          <Text style={styles.modalActionButtonText}>Schedule a Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalActionButton}>
          <Clock height={24} width={24} />
          <Text style={styles.modalActionButtonText}>Set Reminder</Text>
        </TouchableOpacity>
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
    height: 121,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 23,
    paddingBottom: 26,
    paddingHorizontal: 32,
    alignItems: 'flex-start',
  },

  modalCloseBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
  },

  modalActionButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 26,
  },

  modalActionButtonText: {
    marginLeft: 18,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
    letterSpacing: 0.2,
    lineHeight: 24,
  },
});
