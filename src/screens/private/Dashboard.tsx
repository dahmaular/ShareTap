/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import TextInputs from '../../components/TextInput';
import Back from '../../assets/svg/back.svg';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Noctivity from '../../assets/svg/noFile.svg';
import Card from '../../components/Card';
import DashboardCard from '../../components/DashboardCard';
import DashboardHeader from '../../components/DashboardHeader';
import {
  getUserIdService,
  listUserCardsService,
} from '../../services/userService';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const Dashboard = ({navigation}: any) => {
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [userId, setUserId] = useState('');
  const [userCards, setUserCards] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipientModal, setRecipientModal] = useState(false);
  const boxWidth = scrollViewWidth * 1;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = useRef(new Animated.ValueXY()).current;

  // useEffect(() => {
  //   getUserIdService()
  //     .then(id => {
  //       // console.log('Id is here', id);
  //       setUserId(id);
  //     })
  //     .catch(e => console.log(e));
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // setIsLoading(true);
      getUserIdService()
        .then(id => {
          // console.log('Id is here', id);
          setUserId(id);
          getUserCards(id);
        })
        .catch(e => console.log(e));
    }, []),
  );

  const getUserCards = (id: any) => {
    setIsLoading(true);
    listUserCardsService(id)
      .then(card => {
        // console.log('card is here @dashboard', card.data.listUserCards?.cards);
        setUserCards(card.data?.cards);
        setIsLoading(false);
      })
      .catch(e => console.log(e));
  };

  // useEffect(() => {
  //   getUserCards(userId);
  // }, [userId, navigation]);

  const NoActivity = () => {
    return (
      <View style={styles.noActivity}>
        <Noctivity />
        <View style={styles.noActyTextView}>
          <Text style={styles.noActivityText}>NO ACTIVITY YET</Text>
        </View>
        <View style={styles.createView}>
          <Text style={styles.createText}>
            Create your first card to start sharing with friends and networking!
          </Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('CreateCard')}>
            <Text style={styles.btnText}>CREATE CARD</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const UserCardS = () => {
    return (
      <View style={styles.flatlistView}>
        <FlatList
          data={userCards}
          numColumns={2}
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
            <DashboardCard
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

  const showRecipientModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.resultsBottomModal}
        isVisible={recipientModal}
        onBackdropPress={() => setRecipientModal(false)}
        onBackButtonPress={() => setRecipientModal(false)}>
        <TouchableOpacity
          onPress={() => setRecipientModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.resultsModal}>
          <View style={styles.modalHeader}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.searchResultText}>Recipients (7) </Text>
            </View>

            {/* <View style={{marginTop: 10}}>
              <Text style={styles.searchResultNote}>
                Add more roles *********
              </Text>
            </View> */}
          </View>
          {/* <TextInputs
            label="Role"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Add role"
            autoCapitalize="none"
            value={role.value}
            // onFocus={() => setWebsiteFocus(true)}
            onChangeText={text => {
              setRole({value: text, error: ''});
            }}
            style={styles.socialInputs}
          /> */}
          {/* <TextInputs
            label="Organization"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Add organization"
            value={organisation.value}
            // onFocus={() => setTwitterFocus(true)}
            onChangeText={text => {
              setOrganisation({value: text, error: ''});
            }}
            style={styles.socialInputs}
          /> */}
          {/* <View style={styles.dateView}>
            <View style={styles.startDate}>
              <YearSelect
                name="doe"
                placeholder="Start date"
                dateValue={moment(selectStartDate).format('l')}
                onValueChange={(itemValue: any) => {
                  console.log('start year', {itemValue});
                  setSelectedStartDate(itemValue);
                }}
              />
            </View>
            <View style={styles.endDate}>
              <YearSelect
                name="doe"
                placeholder="Present"
                dateValue={moment(selectEndDate).format('l')}
                onValueChange={(itemValue: any) => {
                  console.log('present', {itemValue});
                  setSelectedEndDate(itemValue);
                }}
              />
            </View>
          </View> */}
          {/* <TouchableOpacity
            style={
              role.value !== '' || organisation.value !== ''
                ? styles.modalButton
                : styles.modalButtonInactive
            }
            onPress={() => submitProfile()}>
            <Text style={styles.modalBtnText}>CONFIRM</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {recipientModal && showRecipientModal()}
      <DashboardHeader
        bgColor="#316F8A"
        titleColor="#FFFFFF"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        title="Dashboard"
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
        <>
          {userCards.length > 0 ? (
            <>
              <View style={styles.cardTextView}>
                <View style={styles.totalCards}>
                  <Text style={styles.number}>{userCards.length}</Text>
                  <Text style={styles.numberText}>TOTAL CARDS</Text>
                </View>
                <TouchableOpacity
                  style={styles.totalCards}
                  onPress={() => setRecipientModal(true)}>
                  <Text style={styles.number}>42</Text>
                  <Text style={styles.numberText}>TOTAL RECIPIENT</Text>
                </TouchableOpacity>
              </View>
              <UserCardS />
            </>
          ) : (
            <NoActivity />
          )}
        </>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
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
    width: '60%',
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
  },
  btnText: {
    alignSelf: 'center',
    marginTop: 8,
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 12,
  },
  flatlistView: {
    // height: 200,
    // width: '100%',
    margin: 20,

    // marginTop: 25,
  },
  cardTextView: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    alignContent: 'center',
  },
  totalCards: {
    width: 150,
    height: 77,
    backgroundColor: '#F2F2F2',
    marginRight: 20,
    borderRadius: 5,
  },
  number: {
    fontFamily: 'Poppins',
    fontSize: 26,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  numberText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'rgba(51, 51, 51, 0.51)',
    marginTop: 5,
  },
  resultsBottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modalCloseBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },

  resultsModal: {
    width: '100%',
    height: 420,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 30,
  },

  socialModalBody: {
    width: '100%',
    height: 280,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 30,
  },

  modalHeader: {
    width: '100%',
    marginTop: 23,
  },

  modalContent: {
    width: '100%',
  },

  searchResultText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#316F8A',
  },
});
