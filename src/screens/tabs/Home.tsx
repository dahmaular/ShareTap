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
import cards from '../../mock/CarouselList';
import Card from '../../components/Card';
import NotificationModal from '../../components/NotificationModal';
import Modal from 'react-native-modal';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import {getUserIdService} from '../../services/userService';
import {fetchUserCards} from '../../slices/user';
import {hubDispatch} from '../../core/awsExports';
import {userSlice} from '../../selectors';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Home'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

const {width} = Dimensions.get('screen');

const CopilotText = walkthroughable(Text);

const Home = ({navigation, start}: any) => {
  const [message, setMessage] = useState('');
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userSlice);

  const [cardModal, setCardModal] = useState(false);
  const boxWidth = scrollViewWidth * 1;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = useRef(new Animated.ValueXY()).current;

  const _onNotificationPressed = () => {
    setModal(true);
  };

  const confirmToVerify = () => {
    setCardModal(false);
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
      .then(id => dispatch(fetchUserCards(id)))
      .catch(() => hubDispatch('navigation', 'loggedIn'));
  }, [dispatch]);
  useEffect(() => {
    start();
  }, []);

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

      {cardModal && selectCardModal()}
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
            {message != '' && (
              <View style={styles.toastView}>
                <Message
                  message={message}
                  onHide={() => {
                    setMessage('');
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
                onPress={() => navigation.navigate('Search')}>
                View all
              </Text>
            </View>
            <View style={styles.flatlistView}>
              <FlatList
                horizontal
                data={user.cards}
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
            <CopilotStep
              text="This is a hello world example!"
              order={1}
              name="hello">
              <TouchableOpacity
                style={styles.tap}
                onPress={() => setCardModal(true)}>
                <Tap />
                <Text style={styles.tapText}>TAP TO SHARE</Text>
              </TouchableOpacity>
              {/* <CopilotText>Hello world!</CopilotText> */}
            </CopilotStep>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default copilot({
  overlay: 'svg', // or 'view'
  animated: true, // or false
})(Home as any);

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

  tap: {width: '100%', marginTop: 20, alignItems: 'center', marginBottom: 120},

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
});
