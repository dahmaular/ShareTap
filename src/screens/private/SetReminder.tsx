import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import TextInputs from '../../components/TextInput';
import Header from '../../components/Header';
import Back from '../../assets/svg/back.svg';
import {BACKGROUND_COLOR} from '../../core/color';
import {AuthenticatedRoutesParamsList} from '../../types/navigation';
import Moment from 'moment';
import DateSelect from '../../components/DatePicker';
import Button from '../../components/Button';

type SetReminderProps = NativeStackNavigationProp<
  AuthenticatedRoutesParamsList,
  'SetReminder'
>;

type SetReminderRouteProp = RouteProp<
  AuthenticatedRoutesParamsList,
  'SetReminder'
>;

type Props = {
  navigation: SetReminderProps;
  route: SetReminderRouteProp;
};

const {width} = Dimensions.get('screen');

const SetReminder = ({navigation}: Props) => {
  const [reminder, setreminder] = useState({value: '', error: ''});
  const [title, setTitle] = useState({value: '', error: ''});
  const [reminderFocus, setreminderFocus] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const [startDate, setStartDate] = useState(
  //   Moment(new Date()).format('LLLL'),
  // );

  const handlereminderBlur = () => {
    setreminderFocus(true);
  };

  const handleTitleBlur = () => {
    setTitleFocus(true);
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title="Set Reminder"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<></>}
        rightOnPress={() => {}}
      />
      <View style={styles.container}>
        <ScrollView
          style={styles.reminderContainer}
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.setReminderView}>
            <Text style={styles.reminderText}>Set Reminder</Text>
            <Text style={styles.reminder}>
              Select a suitable plan to explore more
            </Text>
            <Text style={styles.reminder}>features</Text>
          </View>

          <TextInputs
            label="Title"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Enter title"
            value={title.value}
            onChangeText={text => setTitle({value: text, error: ''})}
            error={!!title.error}
            errorText={title.error}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="none"
            keyboardType="default"
            onFocus={() => setTitleFocus(true)}
            onBlur={handleTitleBlur}
            style={{
              backgroundColor: titleFocus ? '#FFFFFF' : '#d8d9d9',
            }}
          />

          <TextInputs
            label="Remind me of"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Brain storming Session"
            value={reminder.value}
            onChangeText={text => setreminder({value: text, error: ''})}
            error={!!reminder.error}
            errorText={reminder.error}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="familyName"
            keyboardType="name-phone-pad"
            multiline={true}
            numberOfLines={6}
            onFocus={() => setreminderFocus(true)}
            onBlur={handlereminderBlur}
            style={{
              backgroundColor: reminderFocus ? '#FFFFFF' : '#d8d9d9',
              textAlignVertical: 'top',
              textAlign: 'left',
            }}
          />

          <DateSelect
            placeholder="Start Date"
            dateValue={Moment(startDate).format('LL')}
            onValueChange={(itemValue: any) => {
              setStartDate(itemValue);
            }}
          />

          <DateSelect
            placeholder="End Date"
            dateValue={endDate}
            onValueChange={(itemValue: any) => {
              setEndDate(itemValue);
            }}
          />

          <View style={styles.buttonView}>
            <Button
              disabled={!reminder.value && !title.value}
              loading={false}
              label="CONTINUE"
              onPress={() =>
                navigation.navigate('ReminderCalendar', {
                  item: {
                    title: title.value,
                    description: reminder.value,
                    startDate: startDate,
                    endDate: endDate,
                  },
                })
              }
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SetReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  reminderContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    paddingHorizontal: 15,
  },

  setReminderView: {
    width: '100%',
    marginTop: 24,
  },

  reminderText: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },

  reminder: {
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
    marginTop: 144,
  },
});
