import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import Back from '../../assets/svg/back.svg';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import {AuthenticatedRoutesParamsList} from '../../types/navigation';
import RNCalendarEvents from 'react-native-calendar-events';
import {RadioButton} from 'react-native-paper';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Hurray from '../../assets/svg/hurray.svg';
import Moment from 'moment';
import {ReminderInput} from '../../types/apiTypes';
import {setReminderService} from '../../services/rolodexService';
import {getUserIdService} from '../../services/userService';

type ReminderCalendarProps = NativeStackNavigationProp<
  AuthenticatedRoutesParamsList,
  'ReminderCalendar'
>;

type ReminderCalendarRouteProp = RouteProp<
  AuthenticatedRoutesParamsList,
  'ReminderCalendar'
>;

type Props = {
  navigation: ReminderCalendarProps;
  route: ReminderCalendarRouteProp;
};

interface CalendarProps {
  id: string;
  title: string;
  type: string;
  allowsModifications: boolean;
  color: string;
  isPrimary: boolean;
  source: string;
  allowedAvailabilities: string[];
}

const {width} = Dimensions.get('screen');

const ReminderCalendar = ({navigation, route}: Props) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [modalData, setModalData] = useState('');
  const [calendars, setCalendars] = useState<CalendarProps[]>([]);
  const [state, setState] = useState({
    selectedCalendar: '',
  });

  const {item} = route.params;

  const year = new Date(item.startDate).getFullYear().toString();
  const month = new Date(item.startDate).getMonth().toString();
  const day = new Date(item.startDate).getDay().toString();
  const hour = new Date(item.startDate).getHours().toString();
  const minute = new Date(item.startDate).getMinutes().toString();

  useEffect(() => {
    RNCalendarEvents.requestPermissions(false).then(fulfilled => {
      if (fulfilled == 'authorized' || fulfilled == 'undetermined') {
        getCalendars();
      }
    });
  }, []);

  useEffect(() => {
    getUserIdService()
      .then(id => {
        setUserId(id);
      })
      .catch(e => {
        throw e;
      });
  }, [item]);

  const getCalendars = () => {
    RNCalendarEvents.findCalendars()
      .then(calendars => {
        setCalendars(calendars);
      })
      .catch(error => {});
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
                You have successfully set a {'\n'} reminder for{' '}
                {Moment(data).format('LLL')}.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModal(false);
              navigation.navigate('Rolodex');
            }}>
            <Text style={styles.modalBtnText}>BACK TO ROLODEX</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const saveToServer = async (val: ReminderInput) => {
    setLoading(true);
    const res = await setReminderService(val);
    setLoading(false);
    return res;
  };

  const saveReminder = (id: string) => {
    RNCalendarEvents.saveEvent(item.title, {
      notes: item.description,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate,
      calendarId: id,
      alarms: [{date: item.startDate}, {date: item.endDate}],
    })
      .then(async event => {
        if (event) {
          const body = {
            userId: userId,
            message: item.description,
            hour: hour,
            day: day,
            minute: minute,
            year: year,
            month: month,
          };

          const res = await saveToServer(body);
          if (res) {
            setModalData(item.startDate);
            setModal(true);
          }
        }
      })
      .catch(error => {});
  };

  return (
    <View style={{flex: 1}}>
      {modal && successModal(modalData)}
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
          <View style={styles.calReminderView}>
            <Text style={styles.reminderText}>Add to calendar</Text>
            <Text style={styles.reminder}>
              Select a suitable plan to explore more
            </Text>
            <Text style={styles.reminder}>features</Text>
          </View>

          <View
            style={{
              marginTop: 32,
            }}>
            <RadioButton.Group
              onValueChange={newValue => {
                setState({...state, selectedCalendar: newValue});
              }}
              value={state.selectedCalendar}>
              {calendars.map((k, index) => {
                const isActive = state.selectedCalendar == k.title;
                return (
                  <View
                    key={index}
                    style={{
                      ...styles.card,
                      borderColor: isActive ? '#209AD7' : '#F1F0FF',
                      backgroundColor: isActive
                        ? 'rgba(49, 111, 138, 0.1)'
                        : '#FFFFFF',
                    }}>
                    <Text style={styles.title}>{k.title}</Text>
                    <RadioButton.Android value={k.id} color={'#316F8A'} />
                  </View>
                );
              })}
            </RadioButton.Group>
          </View>

          <View style={styles.buttonView}>
            <Button
              disabled={!state.selectedCalendar}
              loading={loading}
              label="CONTINUE"
              onPress={() => saveReminder(state.selectedCalendar)}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ReminderCalendar;

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

  calReminderView: {
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

  column: {
    flex: 1,
  },

  title: {
    color: '#333333',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    fontSize: 14,
  },

  card: {
    height: 74,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
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
