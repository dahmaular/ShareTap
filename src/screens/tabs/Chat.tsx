import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import Menu from '../../assets/svg/menu.svg';
import Notification from '../../assets/svg/ion-ios-notifications.svg';
import Search from '../../assets/svg/Search.svg';
import Calendar from '../../assets/svg/calendar 1.svg';
import Chevron from '../../assets/svg/chevron_big_right.svg';
import {Badge, Avatar} from 'react-native-paper';
import {DrawerActions, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  TabNavigatorParamsList,
  AuthenticatedRoutesParamsList,
} from '../../types/navigation';
import {BACKGROUND_COLOR} from '../../core/color';
import {listUserConversationsService} from '../../services/chatService';
import {getUserIdService} from '../../services/userService';
import Moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Chat'>,
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

const Chat = ({navigation}: Props) => {
  const [filteredDataSource, setFilteredDataSource] = useState<
    UserConversationsProps[]
  >([]);
  const [chats, setChats] = useState<UserConversationsProps[]>([]);
  const [search, setSearch] = useState('');
  const _onNotificationPressed = () => {};

  useFocusEffect(
    React.useCallback(() => {
      getUserIdService()
        .then(id => {
          listUserConversationsService(id)
            .then(res => {
              if (res.data) {
                setChats(res.data as []);
                setFilteredDataSource(res.data as []);
              }
            })
            .catch(e => {
            });
        })
        .catch(e => {throw e});
    }, []),
  );

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the chats lists
      // Update FilteredDataSource
      const newData = chats.filter(function (item) {
        const itemData = item.lastMessage
          ? item.lastMessage.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with chats
      setFilteredDataSource(chats);
      setSearch(text);
    }
  };

  const ListEmptyView = () => {
    return (
      <View style={styles.listEmpty}>
        <View style={styles.emptyView}>
          <Text style={styles.emptyHeaderText}>No conversations Yet</Text>
          <Text style={styles.emptyText}>
            To start a conversation, send a message {'\n'} to your contact
          </Text>

          <TouchableOpacity style={styles.emptyBtn}>
            <Text style={styles.emptyBtnText}>GO TO CONTACTS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title="CHAT"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Menu />}
        leftOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        rightSvg={
          <>
            <Notification onPress={_onNotificationPressed} />

            <Badge size={12} style={styles.badgeStyle}>
              0
            </Badge>
          </>
        }
        rightOnPress={() => <></>}
      />

      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <View style={styles.paddingH}>
            <View style={styles.searchView}>
              <View style={{flex: 0.1}}>
                <Search />
              </View>
              <View style={{flex: 0.9}}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Search Conversations"
                  placeholderTextColor="rgba(51, 51, 51, 0.51)"
                  onChangeText={text => searchFilterFunction(text)}
                  value={search}
                />
              </View>
            </View>
          </View>

          <View style={styles.paddingH}>
            <View style={{...styles.flexRow, marginTop: 24}}>
              <TouchableOpacity
                style={styles.rowCenter}
                onPress={() => navigation.navigate('ScheduledMessages')}>
                <Calendar />

                <Text style={styles.schedule}>View Scheduled Messages</Text>
              </TouchableOpacity>

              <View>
                <Chevron />
              </View>
            </View>
          </View>

          <View style={styles.border}></View>

          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmptyView}
            style={styles.flatlist}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.chatCard}
                onPress={() => navigation.navigate('ChatMessage', {item})}>
                <View style={{flex: 0.18}}>
                  <Avatar.Image
                    size={50}
                    source={{uri: item.recipientAvatar as string}}
                  />
                </View>

                <View style={{flex: 0.82, justifyContent: 'space-between'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={styles.name}>{item.recipientUsername}</Text>
                      <Text numberOfLines={2} style={styles.chat}>
                        {item.lastMessage}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.time}>
                        {Moment(item.createdAt).format('LT')}
                      </Text>
                      {/* <Badge size={15} style={styles.badge}>
                        12
                      </Badge> */}
                    </View>
                  </View>

                  <View style={{...styles.border, marginTop: 8}}></View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: '#FF4E00',
    color: '#FFFFFF',
  },

  badge: {
    backgroundColor: '#316F8A',
    color: '#FFFFFF',
    marginTop: 4,
  },

  container: {
    flex: 1,
  },

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

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  border: {
    width: '100%',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    marginTop: 13,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },

  schedule: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#333333',
    marginLeft: 17,
  },

  paddingH: {width: '100%', paddingHorizontal: 15},

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

  emptyBtn: {
    width: 200,
    height: 40,
    borderRadius: 2,
    backgroundColor: '#316F8A',
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyBtnText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: '#FFFFFF',
    fontStyle: 'normal',
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

  flatlist: {
    flex: 1,
    width: '100%',
    marginTop: 13,
    paddingHorizontal: 15,
    marginBottom: 60,
  },

  chatCard: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 15,
  },
});
