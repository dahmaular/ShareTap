/* eslint-disable prettier/prettier */
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
  Linking,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import Back from '../../assets/svg/back.svg';
import More from '../../assets/svg/more.svg';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import {AuthenticatedRoutesParamsList} from '../../types/navigation';
import TextInputs from '../../components/TextInput';
import DateSelect from '../../components/DatePicker';
import Modal from 'react-native-modal';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Calendar from '../../assets/svg/calendar-icon.svg';
import Clock from '../../assets/svg/clock-icon.svg';
import Link from '../../assets/svg/link_02.svg';
import Facebook from '../../assets/svg/facebook.svg';
import Twitter from '../../assets/svg/twitter.svg';
import EmptyCard from '../../assets/svg/EmptyCard.svg';
import tabs from '../../mock/Tabs';
import Moment from 'moment';
import {
  listCategoriesService,
  listReceivedCardsService,
} from '../../services/rolodexService';
import {getUserIdService} from '../../services/userService';
import {fetchReceivedCards} from '../../slices/rolodex';
import {useDispatch} from 'react-redux';

type RolodexProps = NativeStackNavigationProp<
  AuthenticatedRoutesParamsList,
  'Rolodex'
>;

type RolodexRouteProp = RouteProp<AuthenticatedRoutesParamsList, 'Rolodex'>;

type Props = {
  navigation: RolodexProps;
  route: RolodexRouteProp;
};

interface CategoryProps {
  id: number | null;
  catName: string;
}

interface TabsProps {
  id: number | null;
  category: string;
  data: CardProps;
}

interface CardDetailsProps {
  id: string;
  name: string | null;
  role: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  website: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedIn: string | null;
  createdAt: string | null;
  businessProfileId: string;
  userId: string | null;
  cardTemplateId: string | null;
  status: string | null;
  color: string | null;
  category: string | null;
}

interface CardTemplateProps {
  id: string | null;
  backgroundColor: string | null;
  borderBottomColor: string | null;
}

interface ReceivedCardProps {
  cardDetails: CardDetailsProps;
  cardTemplate: CardTemplateProps;
}

interface CardProps {
  cards: ReceivedCardProps[];
}

interface ReceivedCardProps_ {
  id: number;
  category: string;
  data: CardProps;
}

const {width} = Dimensions.get('screen');

const deviceHeight = Dimensions.get('window').height;

const Rolodex = ({navigation}: Props) => {
  const [reminderModal, setReminderModal] = useState(false);
  const dispatch = useDispatch();
  const [reminderCalenderModal, setReminderCalenderModal] = useState(false);
  const [reminder, setreminder] = useState({value: '', error: ''});
  const [reminderFocus, setreminderFocus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [pressed, setPressed] = useState(0);

  const [categories, setCategories] = useState<CategoryProps[]>([]);

  // const [tabsList] = useState<TabsProps[]>(tabs);
  const [cardsList, setCardsList] = useState<ReceivedCardProps_[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>({
    id: null,
    catName: '',
  });
  const [selectedCategoryHash, setSelectedCategoryHash] = useState<any>({
    id: '',
    catName: '',
  });

  const [selectedTab, setSelectedTab] = useState<TabsProps>({
    id: null,
    category: '',
    data: [] as any,
  });
  const [selectedTabHash, setSelectedTabHash] = useState<any>({
    id: '',
    tab: '',
  });

  const [scrollY] = useState(new Animated.Value(0));
  let offsetY = 0;
  const [selectDate, setSelectedDate] = useState(
    Moment(new Date()).format('lll'),
  );

  const handlereminderBlur = () => {
    setreminderFocus(true);
  };

  const cardHeight = 250;
  const cardAmount = cardsList.length;
  const cardVisibleHeight = 191;
  const cardVisibleHeightCollapsed = 60;
  const cardVisibleDelta = cardVisibleHeight - cardVisibleHeightCollapsed;
  const topOffset = 150;
  const stackHeight = cardVisibleDelta * cardAmount - cardVisibleDelta;
  const scrollHeight =
    deviceHeight + cardVisibleDelta * cardAmount - cardVisibleDelta;

  useEffect(() => {
    getUserIdService()
      .then(id => {
        listReceivedCardsService(id).then(res => {
          setCardsList(res.data?.receivedCards as any);
          if (res.data?.receivedCards?.length) {
            setSelectedTab((res.data?.receivedCards as any)[0]);
          }
        });
        getCategories();
        dispatch(fetchReceivedCards(id));
      })
      .catch(e => {
        throw e;
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const getCategories = async () => {
    const data = await listCategoriesService();

    const newData = data.data?.map((x, i) => {
      return {
        id: i,
        catName: x,
      };
    });

    setCategories(newData as []);
  };

  const pressClick = (e: any) => {
    const pressY = e.nativeEvent.pageY;
    const currentStackHeight =
      stackHeight -
      offsetY +
      cardHeight +
      (cardAmount - 1) * cardVisibleHeightCollapsed;

    let y = topOffset;

    if (pressY < y || pressY > currentStackHeight + topOffset) {
      return false;
    }

    const collapsedCount = Math.floor(offsetY / cardVisibleDelta);
    const expanedCount = cardAmount - collapsedCount - 2;

    for (let i = 0; i <= cardAmount; i++) {
      // if a collapsed card
      if (i < collapsedCount) {
        y += cardVisibleHeightCollapsed;
      }
      // if the last card
      else if (i === cardAmount - 1) {
        y += cardHeight;
      }
      // if a collapsing card
      else if (i === collapsedCount) {
        y +=
          currentStackHeight -
          cardHeight -
          collapsedCount * cardVisibleHeightCollapsed -
          expanedCount * cardVisibleHeight;
      }
      // if an expanded card
      else {
        y += cardVisibleHeight;
      }

      if (pressY < y) {
        return setPressed(i);
      }
    }
  };

  const cardTransform = (i: number) => {
    if (!i) {
      return {transform: [{translateY: topOffset}]};
    }

    const translateY = scrollY.interpolate({
      inputRange: [
        -100,
        0,
        cardVisibleDelta * i,
        stackHeight,
        stackHeight + 100,
      ],
      outputRange: [
        topOffset + i * 100,
        topOffset,
        topOffset - cardVisibleDelta * i,
        topOffset - cardVisibleDelta * i,
        topOffset - cardVisibleDelta * i - i * 5,
      ],
    });

    return {transform: [{translateY}]};
  };

  const ListEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyView}>
          <EmptyCard />
          <Text style={styles.emptyText}>No Cards Yet</Text>
          <Text style={styles.empty}>
            Cards shared with you will appear here
          </Text>
        </View>
      </View>
    );
  };

  const ListHeader = () => {
    return (
      <View style={styles.tabsView}>
        {cardsList.map((k, i) => {
          const active = selectedTabHash[k.id as number];
          return (
            <TouchableOpacity
              style={{
                ...styles.tab,
                backgroundColor: active ? '#316F8A' : '#cedae0',
              }}
              key={i}
              onPress={() => {
                setSelectedTabHash({
                  [k.id as number]: !(selectedTabHash[k.id as number] || false),
                });
                const picked = cardsList.find(x => x.id == k.id);
                setSelectedTab(picked as TabsProps);
              }}>
              <Text
                style={{
                  ...styles.tabText,
                  color: active ? '#FFFFFF' : '#333333',
                }}>
                {k.category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const ReminderAndCalendarModal = () => {
    return (
      <View>
        <Modal
          avoidKeyboard
          propagateSwipe={true}
          style={styles.bottomModal}
          isVisible={reminderCalenderModal}
          onBackdropPress={() => setReminderCalenderModal(false)}
          onBackButtonPress={() => setReminderCalenderModal(false)}>
          <TouchableOpacity
            onPress={() => setReminderCalenderModal(false)}
            style={styles.modalCloseBtn}>
            <Close />
          </TouchableOpacity>
          <View style={styles.modal}>
            {/* <TouchableOpacity style={styles.modalActionButton}>
              <Calendar height={24} width={24} />
              <Text
                style={styles.modalActionButtonText}
                onPress={() => {
                  setReminderCalenderModal(false);
                  navigation.navigate('SetMessage');
                }}>
                Schedule a Message
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.modalActionButton}
              onPress={() => {
                setReminderCalenderModal(false);
                navigation.navigate('SetReminder');
              }}>
              <Clock height={24} width={24} />
              <Text style={styles.modalActionButtonText}>Set Reminder</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  const ReminderModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.bottomModal}
        isVisible={reminderModal}
        onBackdropPress={() => setReminderModal(false)}
        onBackButtonPress={() => setReminderModal(false)}>
        <TouchableOpacity
          onPress={() => setReminderModal(false)}
          style={styles.reminderModalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.reminderModal}>
          <View style={styles.modalContentWrap}>
            <Text style={styles.reminderHeader}>Set Reminder</Text>
            <Text style={styles.reminderText}>
              Ensure the recipient has clicked on the tap {'\n'}to share button
              on
            </Text>

            <TextInputs
              label="Remind me of"
              returnKeyType="next"
              placeholderTextColor="rgba(90, 89, 89, 0.55)"
              placeholder="Remind me of"
              value={reminder.value}
              onChangeText={text => setreminder({value: text, error: ''})}
              error={!!reminder.error}
              errorText={reminder.error}
              autoCapitalize="none"
              autoCompleteType="name"
              textContentType="familyName"
              keyboardType="name-phone-pad"
              onFocus={() => setreminderFocus(true)}
              onBlur={handlereminderBlur}
              style={{
                backgroundColor: reminderFocus ? '#FFFFFF' : '#d8d9d9',
                marginBottom: 14,
              }}
            />

            <DateSelect
              placeholder="Select Date"
              dateValue={Moment(selectDate).format('lll')}
              onValueChange={(itemValue: any) => {
                setSelectedDate(itemValue);
              }}
            />
          </View>

          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={'#316F8A'} size={'large'} animating={true} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {reminderModal && ReminderModal()}
      {reminderCalenderModal && ReminderAndCalendarModal()}

      <Header
        title="Rolodex"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<More />}
        rightOnPress={() => {
          setReminderCalenderModal(true);
        }}
      />
      {cardsList.length >= 1 ? (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View style={styles.categoriesView}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {categories.map((k, i) => {
                  const active = selectedCategoryHash[k.id as number];
                  return (
                    <Pressable
                      style={{
                        ...styles.addNewChip,
                        width: 70,
                        borderColor: active
                          ? '#316F8A'
                          : 'rgba(51, 51, 51, 0.51)',
                      }}
                      key={i}
                      onPress={() => {
                        setSelectedCategoryHash({
                          [k.id as number]: !(
                            selectedCategoryHash[k.id as number] || false
                          ),
                        });
                        const picked = categories.find(x => x.id == k.id);
                        setSelectedCategory(picked as CategoryProps);
                      }}>
                      <Text numberOfLines={1} style={styles.addNewText}>
                        {k.catName}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            <>{ListHeader()}</>
            <View>
              {selectedTab?.data?.cards?.map((item, index) => {
                return (
                  <Animated.View
                    key={index}
                    style={[
                      styles.animatedCard,
                      {
                        backgroundColor: item.cardTemplate
                          ?.backgroundColor as string,
                      },
                      cardTransform(index),
                      {
                        top: index * cardVisibleHeight,
                        marginTop: -150,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{...styles.touchable}}>
                      <Text style={styles.name}>{item.cardDetails.name}</Text>
                      <Text style={styles.profession}>
                        {item.cardDetails.category}
                      </Text>
                      <Text style={styles.email}>{item.cardDetails.email}</Text>
                      <View style={styles.telSocial}>
                        <View>
                          <Text style={styles.telephone}>
                            {item.cardDetails.phone}
                          </Text>
                        </View>

                        <View style={styles.rowCenter}>
                          <Pressable
                            style={{marginRight: 10}}
                            onPress={() =>
                              Linking.openURL(
                                item.cardDetails.website as string,
                              )
                            }>
                            <Link />
                          </Pressable>

                          <Pressable
                            style={{marginRight: 10}}
                            onPress={() =>
                              Linking.openURL(
                                item.cardDetails.facebook as string,
                              )
                            }>
                            <Facebook />
                          </Pressable>

                          <Pressable
                            style={{marginRight: 10}}
                            onPress={() =>
                              Linking.openURL(
                                item.cardDetails.twitter as string,
                              )
                            }>
                            <Twitter />
                          </Pressable>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        ...styles.bottomLine,
                        backgroundColor: item.cardTemplate
                          ?.borderBottomColor as string,
                      }}
                    />
                  </Animated.View>
                );
              })}
            </View>

            <Animated.ScrollView
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {
                  useNativeDriver: true,
                  listener: (e: any) =>
                    (offsetY = e.nativeEvent.contentOffset.y),
                },
              )}
              scrollEventThrottle={24}
              showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={pressClick}
                style={[{height: scrollHeight}]}
              />
            </Animated.ScrollView>
          </View>
        </View>
      ) : (
        <ListEmptyView />
      )}
    </View>
  );
};

export default Rolodex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  rolodexContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  categoriesView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
    height: 35,
    paddingHorizontal: 20,
  },

  addNewChip: {
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 10,
  },

  addNewText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(51, 51, 51, 0.51)',
  },

  // Card
  animatedCard: {
    position: 'absolute',
    height: 191,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: 'rgba(49, 111, 138, 0.16)',
  },

  touchable: {
    height: 184,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },

  bottomLine: {width: '100%', height: 7},

  telSocial: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  rowCenter: {flexDirection: 'row', alignItems: 'center'},

  name: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#219653',
  },
  profession: {
    fontFamily: 'Poppins',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#cccccc',
  },

  email: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#333333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  telephone: {
    fontFamily: 'Poppins',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#333333',
  },

  deleteText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#EB5757',
  },

  text: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#333333',
  },

  menu: {position: 'absolute', top: 460, left: 280, width: 100, height: 112},

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 26,
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: '#316F8A',
    fontStyle: 'normal',
    marginTop: 16,
    textAlign: 'center',
  },

  empty: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    color: '#8C8C8C',
    fontStyle: 'normal',
    marginTop: 12,
    textAlign: 'center',
  },

  flatList: {
    width: '100%',
    marginBottom: 40,
    marginTop: 40,
  },

  tab: {
    width: 44,
    height: 26,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  tabText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
  },

  tabsView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  // Reminder $ Calendar Modal

  bottomModal: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  modal: {
    width: '100%',
    // height: 121,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 23,
    paddingBottom: 26,
    paddingHorizontal: 32,
    alignItems: 'flex-start',
  },

  modalCloseBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
  },

  modalActionButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 26,
  },

  modalActionButtonText: {
    marginLeft: 18,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
    letterSpacing: 0.2,
    lineHeight: 24,
  },

  // Reminder  Modal

  reminderModal: {
    width: '100%',
    height: 390,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingBottom: 26,
    alignItems: 'flex-start',
  },

  modalContentWrap: {
    height: 317,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 23,
  },

  reminderModalCloseBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
  },

  reminderHeader: {
    fontFamily: 'Poppins',
    fontSize: 20,
    lineHeight: 24,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    letterSpacing: 0.2,
    marginBottom: 16,
  },
  reminderText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#8C8C8C',
    letterSpacing: 0.2,
    marginBottom: 16,
  },

  dateTimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 14,
    borderRadius: 4,
  },

  dateTimeButtonText: {
    color: 'rgba(90, 89, 89, 0.55)',
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },

  modalButton: {
    height: 73,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },

  modalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
