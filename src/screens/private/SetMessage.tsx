import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
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

const SetMessage = ({navigation}: Props) => {
  const [message, setMessage] = useState({value: '', error: ''});
  const [messageFocus, setMessageFocus] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState('');

  const handleMessageBlur = () => {
    setMessageFocus(true);
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
              <Text style={styles.modalContentText}>
                You have successfully scheduled {'\n'} a message
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModal(false);
              navigation.navigate('Rolodex');
            }}>
            <Text style={styles.modalBtnText}>GO TO CALENDAR</Text>
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
            <Text style={styles.reminder}>
              Send follow up text, lorem ipsum dolor amet til
            </Text>
            <Text style={styles.reminder}>ime dolor impsum.</Text>
          </View>

          <TextInputs
            label="lets meet up next week"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Brain storming Session"
            value={message.value}
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
            dateValue={Moment(startDate).format('LL')}
            onValueChange={(itemValue: any) => {
              console.log({itemValue});
              setStartDate(itemValue);
            }}
          />

          <View style={styles.buttonView}>
            <Button
              disabled={!message.value}
              loading={false}
              label="CONTINUE"
              onPress={() => setModal(true)}
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
