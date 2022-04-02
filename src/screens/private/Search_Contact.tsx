import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {
  CompositeNavigationProp,
  DrawerActions,
  RouteProp,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Contacts from 'react-native-contacts';

import Back from '../../assets/svg/back.svg';
import Plus from '../../assets/svg/Group+.svg';
import Cancel from '../../assets/svg/cancelX.svg';
import {
  AuthenticatedRoutesParamsList,
  TabNavigatorParamsList,
} from '../../types/navigation';
import SearchContactHeader from '../../components/SearchContactHeader';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticatedRoutesParamsList, 'AddContact'>,
    StackNavigationProp<AuthenticatedRoutesParamsList, 'SearchContact'>
  >;
  route: RouteProp<AuthenticatedRoutesParamsList, 'SearchContact'>;
};
const {width, height} = Dimensions.get('screen');
const SearchContact = ({navigation, route}: Props) => {
  const [contacts, setContacts] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [contList, setContList] = useState<any>(null);

  //   useEffect(() => {
  //     if (route.params) {
  //       const {item} = route.params;
  //       setContList(item.contacts);
  //     }
  //   }, []);

  useEffect(() => {
    // requestContactPermission();
    const unsubscribe = navigation.addListener('focus', async () => {
      requestContactPermission();
    });
    return unsubscribe;
  }, [navigation]);

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
      setContList(sortedContacts);
      //   setPhoneContacts(sortedContacts);
    });
  };

  const requestContactPermission = async () => {
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
  };

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the chats lists
      // Update FilteredDataSource
      const newData = contList?.filter(function (item: any) {
        const itemData = item.givenName
          ? item.givenName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setContacts(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with chats
      setContacts(null);
      setSearch(text);
    }
  };

  const addCard = async (value: any) => {
  };

  return (
    <View style={styles.container}>
      <SearchContactHeader
        leftSvg={<Back />}
        bgColor="#316F8A"
        leftOnPress={() => navigation.goBack()}
        rightOnPress={() => <></>}
        searchBar={
          <View
            style={{
              height: 40,
              width: width / 1.3,
              backgroundColor: '#EBEBEB',
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              placeholderTextColor="rgba(51, 51, 51, 0.51)"
              onChangeText={text => searchFilterFunction(text)}
              value={search}
            />
            <TouchableOpacity
              onPress={() => {
                setSearch('');
                setContacts(null);
              }}
              style={{alignSelf: 'center', position: 'absolute', right: 5}}>
              <Cancel />
            </TouchableOpacity>
          </View>
        }
      />
      <View>
        {contacts && (
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={{color: '#8C8C8C'}}>Invite from your contacts</Text>
          </View>
        )}
        <FlatList
          data={contacts}
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
      </View>
    </View>
  );
};

export default SearchContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textInput: {
    flex: 1,
    width: '100%',
  },
});
