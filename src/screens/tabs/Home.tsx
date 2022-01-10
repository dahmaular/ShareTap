/* eslint-disable react-hooks/exhaustive-deps */ /* eslint-disable prettier/prettier */
import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import Header from '../../components/Header';
import {
  AuthenticatedRoutesParamsList,
  TabNavigatorParamsList,
} from '../../types/navigation';
import {DrawerActions, CompositeNavigationProp} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import Menu from '../../assets/svg/menu.svg';
import Tap from '../../assets/svg/tap_2.svg';
import Notification from '../../assets/svg/ion-ios-notifications.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import Message from '../../components/Message';
import {Analytics} from 'aws-amplify';
import Card from '../../components/Card';
import NotificationModal from '../../components/NotificationModal';
import Modal from 'react-native-modal';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import {
  getUserIdService,
  listUserCardsService,
} from '../../services/userService';
import {fetchUserCards} from '../../slices/user';
import {hubDispatch} from '../../core/awsExports';
import {userSlice} from '../../selectors';
import {GET_FCM_TOKEN, GET_FCM_TOKEN_STATUS} from '../../core/storage';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Home'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

const {width, height} = Dimensions.get('screen');

const Home = ({navigation}: Props) => {
  const [message, setMessage] = useState<{
    type: 'regular' | 'error';
    text: string;
  }>({type: 'regular', text: ''});
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userSlice);
  const [cardModal, setCardModal] = useState(false);
  const boxWidth = scrollViewWidth * 1;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = useRef(new Animated.ValueXY()).current;
  const [userId, setUserId] = useState('');
  console.log('User data @home', user.cards.listUserCards.cards);
  const _onNotificationPressed = () => {
    setModal(true);
  };

  useEffect(() => {
    getUserIdService()
      .then(id => {
        console.log('Id is here', id);
        setUserId(id);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    listUserCardsService(userId)
      .then(card => {
        // console.log('card is here @home', card.data.listUserCards?.cards[0]);
        // setUserId(id);
      })
      .catch(e => console.log(e));
  }, []);

  const confirmToVerify = () => {
    setCardModal(false);
  };

  // ?TAP TO SHARE BUTTON
  const TapToShareButton = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.tap}
          onPress={
            // () => setCardModal(true)
            // scanExample()
            () =>
              navigation.navigate(
                'Search',
                user.cards ? {card: user.cards} : null,
              )
          }>
          <Tap />
          <Text style={styles.tapText}>TAP TO SHARE</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ?CARD FLATLIST
  const UserCardSlider = () => {
    return (
      <View style={styles.flatlistView}>
        <FlatList
          horizontal
          data={user.cards.listUserCards.cards}
          contentContainerStyle={{paddingVertical: 5}}
          contentInsetAdjustmentBehavior="never"
          snapToAlignment="center"
          decelerationRate="fast"
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          snapToInterval={boxWidth}
          contentInset={{
            left: halfBoxDistance,
            right: halfBoxDistance,
          }}
          contentOffset={{x: halfBoxDistance * -1, y: 0}}
          onLayout={e => {
            setScrollViewWidth(e.nativeEvent.layout.width);
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: pan.x}}}],
            {
              useNativeDriver: false,
            },
          )}
          onScrollEndDrag={() => console.log('Animation ended')}
          keyExtractor={(item, index) => `${index}-${item}`}
          renderItem={({item, index}) => (
            <Card
              item={item}
              index={index}
              boxWidth={boxWidth}
              halfBoxDistance={halfBoxDistance}
              pan={pan}
            />
          )}
        />
      </View>
    );
  };

  const selectCardModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.bottomModal}
        isVisible={cardModal}
        onBackdropPress={() => setCardModal(false)}
        onBackButtonPress={() => setCardModal(false)}>
        <TouchableOpacity
          onPress={() => setCardModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.modal}>
          <View style={styles.modalContentWrap}>
            <View style={{marginTop: 23}}>
              <Text style={styles.selectCardText}>Select Card</Text>
            </View>
            <FlatList
              horizontal
              data={user.cards}
              contentContainerStyle={{paddingVertical: 5, marginTop: 43}}
              contentInsetAdjustmentBehavior="never"
              snapToAlignment="center"
              decelerationRate="fast"
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={1}
              snapToInterval={boxWidth}
              contentInset={{
                left: halfBoxDistance,
                right: halfBoxDistance,
              }}
              contentOffset={{x: halfBoxDistance * -1, y: 0}}
              onLayout={e => {
                setScrollViewWidth(e.nativeEvent.layout.width);
              }}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: pan.x}}}],
                {
                  useNativeDriver: false,
                },
              )}
              keyExtractor={(item, index) => `${index}-${item}`}
              renderItem={({item, index}) => (
                <Card
                  item={item}
                  index={index}
                  boxWidth={boxWidth}
                  halfBoxDistance={halfBoxDistance}
                  pan={pan}
                />
              )}
            />
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => confirmToVerify()}>
            <Text style={styles.modalBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  useEffect(() => {
    getUserIdService()
      .then(id => {
        uploadPushToken(id);
        dispatch(fetchUserCards(id));
      })
      .catch(() => hubDispatch('navigation', 'loggedIn'));
  }, [dispatch]);

  const uploadPushToken = async (id: string) => {
    const isSaved = await GET_FCM_TOKEN_STATUS();
    const token = await GET_FCM_TOKEN();
    console.log('TOken Gotten', token);
    if (isSaved) {
      return;
    } else {
      Analytics.updateEndpoint({
        address: token, // Token should be set on address field!
        userId: id
      }).then((res)=>{
        console.log('Response', res);
      }).catch((error)=>{
        console.log('Errrrrrrrrror', error)
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      {modal && (
        <NotificationModal
          visible={modal}
          onBackButtonPress={() => setModal(true)}
          onBackdropPress={() => setModal(true)}
          onClose={() => setModal(false)}
        />
      )}

      {cardModal && selectCardModal}
      <Header
        title="HOME"
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
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.homeContainer}>
            {message.text != '' && (
              <View style={styles.toastView}>
                <Message
                  message={message}
                  onHide={() => {
                    setMessage({...message, text: ''});
                  }}
                />
              </View>
            )}
            <View style={styles.organize}>
              <View>
                <Text style={styles.organizeText}>Organize cards shared</Text>
                <Text style={styles.organizeText}>
                  with you in your Rolodex
                </Text>
              </View>

              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => {
                  // setMessage('Upgrade to premium to unlock full access.')
                  console.log('Pressed');
                  navigation.navigate('Rolodex');
                }}>
                <Text style={styles.viewButtonText}>View Rodolex</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.yourCards}>
              <Text style={styles.yourCardsText}>Your Cards (4)</Text>
              <Text
                style={styles.viewAll}
                onPress={() => {
                  // navigation.navigate('Search');
                }}>
                View all
              </Text>
            </View>

            <UserCardSlider />

            <TapToShareButton />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: '#FF4E00',
    color: '#FFFFFF',
  },

  container: {
    flex: 1,
  },

  homeContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  organize: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 56,
  },

  viewButton: {
    width: 128,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#316F8A',
  },

  viewButtonText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },

  organizeText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(51, 51, 51, 0.55)',
  },

  toastView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  yourCards: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 52,
  },

  yourCardsText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
  },

  viewAll: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
    textDecorationLine: 'underline',
  },

  flatlistView: {
    height: 200,
    width: '100%',
    marginTop: 25,
  },

  tap: {
    width: '100%',
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 120,
  },

  tapText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
    marginTop: 0,
  },

  // Modal

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modal: {
    width: '100%',
    height: 404,
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

  modalContentWrap: {height: 331, width: '100%', paddingHorizontal: 20},

  modalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  modalCloseBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },

  selectCardText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#316F8A',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
});
