import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Menu} from 'react-native-paper';
import {CompositeNavigationProp, DrawerActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Contacts from 'react-native-contacts';

import Back from '../../assets/svg/back.svg';
import Search from '../../assets/svg/Search.svg';
import MessageIcon from '../../assets/svg/MessageIcon.svg';
import Plus from '../../assets/svg/Group+.svg';
import {
  AuthenticatedRoutesParamsList,
  TabNavigatorParamsList,
} from '../../types/navigation';
import {getUserIdService, listContactService} from '../../services/userService';
import DashboardHeader from '../../components/DashboardHeader';
import Header from '../../components/Header';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticatedRoutesParamsList, 'AddContact'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};
const {width, height} = Dimensions.get('screen');

const AddContacts = ({navigation}: Props) => {
  const [contacts, setContacts] = useState<any>(null);
  const [userId, setUserId] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const [phoneContacts, setPhoneContacts] = useState<any>(null);

  useEffect(() => {
    // requestContactPermission();
    const unsubscribe = navigation.addListener('focus', async () => {
      requestContactPermission();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getUserIdService()
      .then(id => {
        // console.log('Id is here', id);
        setUserId(id);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    getSavedContacts(userId);
  }, [userId]);

  const getSavedContacts = async (id: string) => {
    await listContactService(id).then(contact => {
      setContacts(contact.data?.contacts);
      console.log(contact);
    });
  };

  const requestContactPermission = async () => {
    if (Platform.OS !== 'android') {
      getPhoneContacts();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Tapiolla App Permission',
            message:
              'Contacts permission is required to access your phone contacts. ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getPhoneContacts();
        } else {
          console.log('Contact permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getPhoneContacts = () => {
    Contacts.getAll().then(contacts => {
      const sortedContacts = contacts.sort(function (a, b) {
        if (a.givenName < b.givenName) {
          return -1;
        }
        if (a.givenName > b.givenName) {
          return 1;
        }
        return 0;
      });
      setPhoneContacts(sortedContacts);
      // console.log('Phone contacts', contacts[30].recordID);
    });
  };

  const TapiollaContactList = () => {
    return (
      <>
        {contacts && (
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={{color: '#8C8C8C'}}>
              {contacts.length} contacts use Tapiolla
            </Text>
          </View>
        )}
        <FlatList
          data={contacts}
          renderItem={({item}) => (
            <View
              style={{marginHorizontal: 20, marginTop: 10, marginBottom: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: '#E1EEF4',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>
                    {item?.name[0]}
                    {item?.name[0]}
                  </Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins',
                      fontSize: 14,
                      lineHeight: 20,
                      color: '#000000',
                    }}>
                    {item?.name}
                  </Text>
                  <View style={{marginTop: 5}}>
                    <Text
                      style={{color: 'rgba(51, 51, 51, 0.51)', fontSize: 12}}>
                      {item?.phone}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={{position: 'absolute', right: 5}}>
                  <Plus />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  alignSelf: 'center',
                  marginTop: 16,
                }}></View>
            </View>
          )}
          keyExtractor={(item, index) => `${index}-${item}`}
        />
      </>
    );
  };

  const ContactList = () => {
    return (
      <>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text style={{color: '#8C8C8C'}}>Invite from your contacts</Text>
        </View>
        <FlatList
          data={phoneContacts}
          renderItem={({item}) => (
            <View style={{marginHorizontal: 20, marginTop: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: '#E1EEF4',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>
                    {item?.givenName[0]}
                    {item?.familyName[0]}
                  </Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins',
                      fontSize: 14,
                      lineHeight: 20,
                      color: '#000000',
                    }}>
                    {item?.givenName}{' '}
                    {item?.middleName && item.middleName + ' '}
                    {item?.familyName}
                  </Text>
                  <View style={{marginTop: 5}}>
                    <Text
                      style={{color: 'rgba(51, 51, 51, 0.51)', fontSize: 12}}>
                      {item?.phoneNumbers[0]?.number}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{position: 'absolute', right: 5}}
                  onPress={() => addCard(item)}>
                  <Plus />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  alignSelf: 'center',
                  marginTop: 16,
                }}></View>
            </View>
          )}
          keyExtractor={(item, index) => `${index}-${item}`}
        />
      </>
    );
  };

  const addCard = async (value: any) => {
    console.log(value);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Add Contact"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<Search />}
        rightOnPress={() => navigation.navigate('SearchContact')}
      />
      <ScrollView>
        <TapiollaContactList />
        <ContactList />
      </ScrollView>
    </View>
  );
};

export default AddContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  noActivity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  noActyTextView: {
    margin: 10,
  },
  noActivityText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#316F8A',
    fontWeight: 'bold',
  },
  createView: {
    width: '70%',
    alignItems: 'center',
  },
  createText: {
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#8C8C8C',
  },
  btnView: {
    margin: 40,
  },
  btn: {
    backgroundColor: '#316F8A',
    width: 180,
    height: 35,
    borderRadius: 2,
  },
  btnText: {
    alignSelf: 'center',
    marginTop: 8,
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 12,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#333333',
  },
  deleteText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#EB5757',
  },
});
