import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import Header from '../../components/Header';
import Back from '../../assets/svg/back.svg';
import {BACKGROUND_COLOR} from '../../core/color';
import {AuthenticatedRoutesParamsList} from '../../types/navigation';
import RNCalendarEvents from 'react-native-calendar-events';
import {RadioButton} from 'react-native-paper';

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
  const [hasAccess, setHasAccess] = useState(false);
  const [calendarId, setCalendarId] = useState(null);
  const [calendars, setCalendars] = useState<CalendarProps[]>([]);
  const [state, setState] = useState({
    selectedCalendar: '',
  });

  const {item} = route.params;

  console.log('Route Items', item);

  const MY_CALENDAR = 'MY_CALENDAR';
  const _ = require('lodash');

  useEffect(() => {
    RNCalendarEvents.requestPermissions(false).then(fulfilled => {
      if (fulfilled == 'authorized' || fulfilled == 'undetermined') {
        setHasAccess(true);
        getCalendars();
      }
    });
  }, []);

  const getCalendars = () => {
    RNCalendarEvents.findCalendars()
      .then(calendars => {
        console.log('Calendars', calendars);
        setCalendars(calendars);
      })
      .catch(error => {
        console.log('Error', error);
      });
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
          <View style={styles.calReminderView}>
            <Text style={styles.reminderText}>Add to calendar</Text>
            <Text style={styles.reminder}>
              Select a suitable plan to explore more features
            </Text>
            <Text style={styles.reminder}>features</Text>
          </View>

          <View style={{width: '100%'}}>
            <RadioButton.Group
              onValueChange={newValue => {
                setState({...state, selectedCalendar: newValue});
              }}
              value={state.selectedCalendar}>
              <View style={styles.column}>
                {calendars.map((k, index) => {
                  const isActive = state.selectedCalendar == k.title;
                  return (
                    <View
                      key={index}
                      style={{
                        width: '60%',
                        height: 54,
                        borderWidth: 2,
                        borderColor: isActive ? '#316F8A' : '#F1F0FF',
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      <RadioButton.Android value={k.title} color={'#316F8A'} />

                      <Text style={styles.title}>{k.title}</Text>
                    </View>
                  );
                })}
              </View>
            </RadioButton.Group>
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
    flexDirection: 'column',
    width: width,
  },

  title: {
    color: '#333333',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    fontSize: 14,
  },
});
