import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AuthenticatedRoutesParamsList} from '../../types/navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {getUserIdService} from '../../services/userService';
import {ListScheduledMessagesService} from '../../services/rolodexService';
import Header from '../../components/Header';
import Back from '../../assets/svg/back.svg';
import {BACKGROUND_COLOR} from '../../core/color';
import Search from '../../assets/svg/Search.svg';
import Moment from 'moment';

type ScheduledMessagesProps = NativeStackNavigationProp<
  AuthenticatedRoutesParamsList,
  'ScheduledMessages'
>;

type ScheduledMessagesRouteProp = RouteProp<
  AuthenticatedRoutesParamsList,
  'ScheduledMessages'
>;

type Props = {
  navigation: ScheduledMessagesProps;
  route: ScheduledMessagesRouteProp;
};

interface ScheduledListProps {
  message?: string | null;
  sender?: string | null;
  conversationId?: string | null;
  minute?: string | null;
  hour?: string | null;
  day?: string | null;
  month?: string | null;
  year?: string | null;
}

const {width} = Dimensions.get('screen');

const ScheduledMessages = ({navigation}: Props) => {
  const [filteredDataSource, setFilteredDataSource] = useState<
    ScheduledListProps[]
  >([]);

  const [list, setList] = useState<ScheduledListProps[]>([]);

  const [search, setSearch] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getUserIdService()
        .then(id => {
          ListScheduledMessagesService(id)
            .then(res => {
              if (res.data) {
                setList(res.data.scheduledMessages as []);
                setFilteredDataSource(res.data.scheduledMessages as []);
              }
            })
            .catch(e => {});
        })
        .catch(e => {
          throw e;
        });
    }, []),
  );

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the list
      // Update FilteredDataSource
      const newData = list.filter(function (item) {
        const itemData = item.message
          ? item.message.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with list
      setFilteredDataSource(list);
      setSearch(text);
    }
  };

  const ListEmptyView = () => {
    return (
      <View style={styles.listEmpty}>
        <View style={styles.emptyView}>
          <Text style={styles.emptyHeaderText}>No scheduled message</Text>
          <Text style={styles.emptyText}>
            To start a conversation, send a message {'\n'} to your contact
          </Text>

          {/* <TouchableOpacity style={styles.emptyBtn}>
            <Text style={styles.emptyBtnText}>GO TO CONTACTS</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title="Scheduled Messages"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<></>}
        rightOnPress={() => {}}
      />
      <View style={{flex: 1}}>
        <View style={styles.chatContainer}>
          <View style={styles.paddingH}>
            <View style={styles.searchView}>
              <View style={{flex: 0.1}}>
                <Search />
              </View>
              <View style={{flex: 0.9}}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Search Scheduled Messages"
                  placeholderTextColor="rgba(51, 51, 51, 0.51)"
                  onChangeText={text => searchFilterFunction(text)}
                  value={search}
                />
              </View>
            </View>
          </View>

          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmptyView}
            style={styles.flatlist}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <>
                <View style={styles.paddingH}>
                  <TouchableOpacity
                    style={styles.listCard}
                    onPress={() =>
                      navigation.navigate('SetMessage', {item: item})
                    }>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text style={styles.name}>{item.message}</Text>
                          <Text numberOfLines={2} style={styles.chat}>
                            In {item.day} days {item.hour} hours {item.minute}{' '}
                            mins
                          </Text>
                        </View>

                        <View></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{...styles.border, marginTop: 8}}></View>
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ScheduledMessages;

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    width: width,
    alignItems: 'center',
  },

  searchView: {
    height: 40,
    width: '100%',
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  textInput: {
    flex: 1,
    width: '100%',
  },
  listEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#316F8A',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    color: '#8C8C8C',
    fontStyle: 'normal',
    textAlign: 'center',
    marginTop: 16,
  },

  flatlist: {
    flex: 1,
    width: '100%',
    marginTop: 13,
    marginBottom: 60,
  },

  listCard: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },

  border: {
    width: '100%',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    marginTop: 13,
    marginBottom: 13,
  },

  name: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    color: '#333333',
    fontStyle: 'normal',
    textTransform: 'capitalize',
  },

  chat: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    color: 'rgba(51, 51, 51, 0.51)',
    fontStyle: 'normal',
    marginTop: 2,
  },

  time: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    color: 'rgba(51, 51, 51, 0.51)',
    fontStyle: 'normal',
  },

  paddingH: {width: '100%', paddingHorizontal: 15},
});
