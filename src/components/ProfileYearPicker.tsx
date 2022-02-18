/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DownArrow from '../assets/svg/caret-down-icon.svg';
import Moment from 'moment';
const YearSelect = (props: any) => {
  const [pickerMode, setPickerMode] = useState<any>(null);
  const [dateNow, setDateNow] = useState(
    new Date(props.dateValue || undefined),
  );
  const [display, setDisplay] = useState(null);

  const showDatePicker = () => {
    setPickerMode('date');
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const handleConfirm = (date: any) => {
    // In order to prevent the double-shown popup bug on Android, picker has to be hidden first (https://github.com/react-native-datetimepicker/datetimepicker/issues/54#issuecomment-618776550)
    hidePicker();

    let newDate: any = new Date(date);
    newDate = `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}`;
    setDateNow(date);
    setDisplay(newDate);
    props.onValueChange(Moment(date).format('l'));
  };

  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity style={styles.dateTimeButton} onPress={showDatePicker}>
        <Text style={styles.dateTimeButtonText}>
          {display || props.dateValue || props.placeholder || 'Select Date'}
        </Text>
        <DownArrow />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode={pickerMode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        date={dateNow}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    width: '100%',
    height: 50,
    borderRadius: 5,
    padding: 7,
    marginTop: 10,
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
});
export default YearSelect;
