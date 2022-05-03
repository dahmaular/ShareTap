import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  TextInput,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Menu} from 'react-native-paper';
import {
  CompositeNavigationProp,
  DrawerActions,
  useFocusEffect,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Contacts from 'react-native-contacts';

import Header from '../../components/Header';
import NoContact from '../../assets/svg/No_Contact.svg';
import Menus from '../../assets/svg/menu.svg';
import Back from '../../assets/svg/back.svg';
import Search from '../../assets/svg/Search.svg';
import MessageIcon from '../../assets/svg/MessageIcon.svg';
import VerticalEll from '../../assets/svg/Vertical-Ellipse.svg';
import Cancel from '../../assets/svg/cancelX.svg';
import {
  AuthenticatedRoutesParamsList,
  TabNavigatorParamsList,
} from '../../types/navigation';
import {getUserIdService, listContactService} from '../../services/userService';
import SearchContactHeader from '../../components/SearchContactHeader';
import {
  createConversationService,
  listUserConversationsService,
} from '../../services/chatService';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Contacts'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

interface UserConversationsProps {
  id: string | null;
  recipientUserId: string | null;
  recipientUsername: string | null;
  recipientAvatar: string | null;
  lastMessage: string | null;
  createdAt: string | null;
  error: string | null;
}

interface ContactsProps {
  id: string;
  name: string;
  phoneNumber: string;
}

const Contact = ({navigation}: Props) => {
  const [filteredDataSource, setFilteredDataSource] = useState<
    UserConversationsProps[]
  >([]);
  const [contacts, setContacts] = useState<any>(null);
  const [userId, setUserId] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phoneContact, setPhoneContact] = useState<any>(null);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getUserIdService()
        .then(id => {
          setUserId(id);
          setIsLoading(false);
          requestContactPermission();
          listUserConversationsService(id)
            .then(res => {
              if (res.data) {
                setFilteredDataSource(res.data as []);
              }
            })
            .catch(e => {});
        })
        .catch(e => {
          throw e;
        });
    }, []),
  );

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
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const initiateConversation = async (item: ContactsProps) => {

    const payload = {
      recipients: [item.id, userId],
    };

    const res = await createConversationService(payload);


    // {
    //   chatItem
    //     ? navigation.navigate('ChatMessage', {item: chatItem})
    //     : navigation.navigate('ChatMessage', {
    //         item: {...item, recipientUsername: item.name},
    //       });
    // }
  };

  const getPhoneContacts = () => {
    Contacts.getAll().then(async (contacts: any[]) => {
      const sortedContacts = contacts.sort(function (a, b) {
        if (a.givenName < b.givenName) {
          return -1;
        }
        if (a.givenName > b.givenName) {
          return 1;
        }
        return 0;
      });

      const warefa: any = sortedContacts?.map((item, i) => {
        return {
          name:
            Platform.OS === 'android'
              ? item?.displayName
              : `${item.givenName}` + `${' '}` + `${item.familyName}`,
          phoneNumber: item?.phoneNumbers[0]?.number,
        };
      });
      const filteredContacts = warefa.filter((cont: {phoneNumber: any}) => {
        return cont.phoneNumber !== undefined;
      });
      await listContactService(filteredContacts).then(res => {
        setContacts(res.data?.tapiollaContacts);
        setPhoneContact(res.data?.phoneContacts);
      });
    });
  };

  const NoContactYet = () => {
    return (
      <View style={styles.noActivity}>
        <NoContact />
        <View style={styles.noActyTextView}>
          <Text style={styles.noActivityText}>NO CONTACT YET</Text>
        </View>
        <View style={styles.createView}>
          <Text style={styles.createText}>
            Those you have shared your cards with will appear here. Search
            Tapiolla Community to add contact
          </Text>
          <Text style={{...styles.createText, marginTop: 15}}>OR</Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('AddContact', {item: phoneContact})
            }>
            <Text style={styles.btnText}>INVITE FROM CONTACT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ContactList = () => {
    return (
      <FlatList
        data={contacts}
        renderItem={({item}) => {
          const id = item?.id;
          const filteredConvo = filteredDataSource.filter(prevChats => {
            return prevChats.recipientUserId === id;
          });
          const chatItem = filteredConvo[0];
          return (
            <View style={{margin: 15}}>
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
                  <Text>{item?.name[0]}</Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>{item.name}</Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => initiateConversation(item)}>
                    <MessageIcon />
                  </TouchableOpacity>
                  <TouchableOpacity onLongPress={openMenu}>
                    <View style={{marginLeft: 20}}>
                      <VerticalEll />
                    </View>
                  </TouchableOpacity>
                  {/* <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableOpacity onLongPress={openMenu}>
                      <View style={{marginLeft: 20}}>
                        <VerticalEll />
                      </View>
                    </TouchableOpacity>
                  }>
                  <Menu.Item
                    titleStyle={styles.text}
                    // onPress={() => onShare()}
                    title="Share"
                  />
                  <Menu.Item
                    titleStyle={styles.deleteText}
                    onPress={() => {}}
                    title="Delete"
                  />
                </Menu> */}
                </View>
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
          );
        }}
        keyExtractor={(item, index) => `${index}-${item}`}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="CONTACTS"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Menus />}
        leftOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        rightSvg={<Search />}
        rightOnPress={() =>
          navigation.navigate('SearchContact', {item: phoneContact})
        }
      />
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            color={'#316F8A'}
            size={'large'}
            animating={true}
          />
        </View>
      ) : (
        <>{contacts?.length > 0 ? <ContactList /> : <NoContactYet />}</>
      )}
    </View>
  );
};

export default Contact;

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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  deleteText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#EB5757',
  },
});
