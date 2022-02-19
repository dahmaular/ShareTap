/* eslint-disable prettier/prettier */ /* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Close from '../assets/svg/phone-verif-close-icon.svg';
import DownArrow from '../assets/svg/caret-down-icon.svg';
import Moment from 'moment';

import TextInputs from '../components/TextInput';
import {TextInput} from 'react-native-paper';
import {PRIMARY_COLOR} from '../core/color';
import DateSelect from './DatePicker';

type Props = {
  visible: boolean;
  onBackdropPress: Function;
  onBackButtonPress: Function;
  onClose: Function;
};

const ReminderModal = ({
  visible,
  onBackdropPress,
  onBackButtonPress,
  onClose,
}: Props) => {
  const [modal] = useState(visible);

  const closeModal = () => {
    onClose();
  };

  const [reminder, setreminder] = useState({value: '', error: ''});
  const [reminderFocus, setreminderFocus] = useState(false);
  const [selectDate, setSelectedDate] = useState(
    Moment(new Date()).format('lll'),
  );

  const validateFields = () => {};

  const handlereminderBlur = () => {
    setreminderFocus(true);
  };

  return (
    <Modal
      avoidKeyboard
      propagateSwipe={true}
      style={styles.bottomModal}
      isVisible={visible}
      onBackdropPress={() => onBackdropPress()}
      onBackButtonPress={() => onBackButtonPress()}>
      <TouchableOpacity onPress={() => onClose()} style={styles.modalCloseBtn}>
        <Close />
      </TouchableOpacity>
      <View style={styles.modal}>
        <View style={styles.modalContentWrap}>
          <Text style={styles.reminderHeader}>Set Reminder</Text>
          <Text style={styles.reminderText}>
            Ensure the recipient has clicked on the tap {'\n'}to share button on
          </Text>

          <TextInputs 
            label="Remind me of"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Remind me of"
            value={reminder.value}
            onChangeText={text => setreminder({value: text, error: ''})}
            error={!!reminder.error}
            errorText={reminder.error}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="familyName"
            keyboardType="name-phone-pad"
            onFocus={() => setreminderFocus(true)}
            onBlur={handlereminderBlur}
            style={{
              backgroundColor: reminderFocus ? '#FFFFFF' : '#d8d9d9',
              marginBottom: 14,
            }}
          />

          <DateSelect
            name="doe"
            placeholder="Select Date"
            dateValue={Moment(selectDate).format('lll')}
            onValueChange={(itemValue: any) => {
              console.log({itemValue});
              setSelectedDate(itemValue);
            }}
          />
        </View>

        <TouchableOpacity style={styles.modalButton}>
          <Text style={styles.modalBtnText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ReminderModal;

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  modal: {
    width: '100%',
    height: 390,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingBottom: 26,
    alignItems: 'flex-start',
  },

  modalContentWrap: {
    height: 317,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 23,
  },

  modalCloseBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
  },

  reminderHeader: {
    fontFamily: 'Poppins',
    fontSize: 20,
    lineHeight: 24,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    letterSpacing: 0.2,
    marginBottom: 16,
  },
  reminderText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#8C8C8C',
    letterSpacing: 0.2,
    marginBottom: 16,
  },

  dateTimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 14,
    borderRadius: 4,
  },

  dateTimeButtonText: {
    color: 'rgba(90, 89, 89, 0.55)',
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },

  modalButton: {
    height: 73,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },

  modalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
