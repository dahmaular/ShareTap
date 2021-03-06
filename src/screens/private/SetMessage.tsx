import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TextInputs from '../../components/TextInput';
import Header from '../../components/Header';
import Back from '../../assets/svg/back.svg';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import {AuthenticatedRoutesParamsList} from '../../types/navigation';
import Moment from 'moment';
import DateSelect from '../../components/DatePicker';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Hurray from '../../assets/svg/hurray.svg';
import {ScheduleMessageInput} from '../../types/apiTypes';
import {scheduleMessageService} from '../../services/rolodexService';
import Toast from '../../core/toast';
import {getUserIdService} from '../../services/userService';

type SetMessageProps = NativeStackNavigationProp<
  AuthenticatedRoutesParamsList,
  'SetMessage'
>;

type SetMessageRouteProp = RouteProp<
  AuthenticatedRoutesParamsList,
  'SetMessage'
>;

type Props = {
  navigation: SetMessageProps;
  route: SetMessageRouteProp;
};

const {width} = Dimensions.get('screen');

const SetMessage = ({navigation, route}: Props) => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState({value: '', error: ''});
  const [messageFocus, setMessageFocus] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [loading, setLoading] = useState(false);

  const {item} = route.params;

  useEffect(() => {
    getUserIdService()
      .then(id => {
        setUserId(id);
      })
      .catch(e => {
        throw e;
      });
  }, [item]);

  const handleMessageBlur = () => {
    setMessageFocus(true);
  };

  const scheduleMessage = async () => {
    setLoading(true);
    const body: ScheduleMessageInput = {
      message: message.value,
      sender: userId,
      conversationId: item.conversationId,
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
    };

    const res = await scheduleMessageService(body);
    if (res.data?.data) {
      setLoading(false);
      setModalData(res.data?.data);
      setModal(true);
    } else {
      setLoading(false);
      Toast(res.data?.error);
    }
  };

  const successModal = (data: any) => {
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
            <View>
              <Hurray />
            </View>

            <View style={{marginTop: 36}}>
              <Text style={styles.modalContentText}>{data}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setMessage({value: '', error: ''});
              setStartDate(new Date());
              setModal(false);
              navigation.goBack();
            }}>
            <Text style={styles.modalBtnText}>GO BACK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      {modal && successModal(modalData)}
      <Header
        title="Schedule Message"
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
            <Text style={styles.reminderText}>Schedule a Message</Text>
            <Text style={styles.reminder}>Send follow up message</Text>
          </View>

          <TextInputs
            label="lets meet up next week"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Brain storming Session"
            value={item?.message ? item.message : message.value}
            onChangeText={text => setMessage({value: text, error: ''})}
            error={!!message.error}
            errorText={message.error}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="familyName"
            keyboardType="name-phone-pad"
            multiline={true}
            numberOfLines={6}
            onFocus={() => setMessageFocus(true)}
            onBlur={handleMessageBlur}
            style={{
              backgroundColor: messageFocus ? '#FFFFFF' : '#d8d9d9',
              textAlignVertical: 'top',
              textAlign: 'left',
            }}
          />

          <DateSelect
            placeholder="Set Date"
            dateValue={
              item?.year && item?.month && item?.day
                ? `${item.year}-${item.month}-${item.day}`
                : Moment(startDate).format('LL')
            }
            onValueChange={(itemValue: any) => {
              setStartDate(itemValue);

              const splitDate = Moment(itemValue).format('l').split('/');
              const splitTime = Moment.utc(itemValue).format('LT').split(':');
              const year = splitDate[2];
              const month = splitDate[0];
              const day = splitDate[1];
              const hour = splitTime[0];
              const minute = new Date(itemValue).getMinutes().toString();
              setYear(year);
              setMonth(month);
              setDay(day);
              setHour(hour);
              setMinute(minute);
            }}
          />

          <View style={styles.buttonView}>
            <Button
              disabled={!message.value && !startDate}
              loading={loading}
              label="CONTINUE"
              onPress={() => scheduleMessage()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SetMessage;

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

  // Success Modal

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
    alignItems: 'center',
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
    color: '#333333',
    textAlign: 'center',
  },
});
