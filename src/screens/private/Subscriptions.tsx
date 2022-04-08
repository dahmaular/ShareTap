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
  SectionList,
  //   TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import TextInputs from '../../components/TextInput';
import Back from '../../assets/svg/back.svg';
import Mark from '../../assets/svg/mark.svg';
import MasterCard from '../../assets/svg/Mastercard.svg';
import DashboardHeader from '../../components/DashboardHeader';
import {listSubscriptionsService} from '../../services/userService';
import {ScrollView} from 'react-native-gesture-handler';
import {PRIMARY_COLOR} from '../../core/color';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const Subscriptions = ({navigation}: any) => {
  const [showPlans, setShowPlans] = useState<boolean>(true);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<any>(null);
  const [chosenPlan, setChosenPlan] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const getSubscriptions = async () => {
    setIsLoading(true);
    const subs = (await listSubscriptionsService()).data?.subscriptionPlans;
    console.log(subs);
    setSubscriptions(subs);
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      // setIsLoading(true);
      getSubscriptions();
    }, []),
  );

  // useEffect(() => {
  //   getSubscriptions();
  // }, []);

  const PlanFlatList = () => {
    return (
      <>
        {subscriptions ? (
          <View style={{marginTop: 20}}>
            <FlatList
              data={subscriptions}
              renderItem={({item}) => (
                <View style={{marginTop: 20}}>
                  <View style={styles.plan}>
                    <View
                      style={
                        item.plan.includes('Premium')
                          ? {
                              ...styles.planHeaderView,
                              backgroundColor: '#000000',
                            }
                          : {
                              ...styles.planHeaderView,
                              backgroundColor: PRIMARY_COLOR,
                            }
                      }>
                      <View style={styles.planHeaderTextView}>
                        <Text style={styles.planHeaderStan}>${item.price}</Text>
                        <View style={styles.planName}>
                          <Text style={{...styles.aboutText, marginTop: 4}}>
                            {item.plan.split(' ')[0]}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{margin: 15}}>
                      <View style={styles.featureView}>
                        <Mark style={styles.featureIcon} />
                        <Text style={styles.aboutText}>{item.features}</Text>
                      </View>
                    </View>
                    <View style={styles.btnView}>
                      <TouchableOpacity
                        style={
                          item.plan.includes('Premium')
                            ? styles.btnPre
                            : styles.btnStan
                        }
                        onPress={() => {
                          setShowPlans(false);
                          setShowPayment(true);
                          setChosenPlan(item);
                        }}>
                        <Text
                          style={{
                            ...styles.aboutText,
                            textAlign: 'center',
                            marginTop: 12,
                            color: 'white',
                          }}>
                          PAY ${item.price}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => `${index}-${item}`}
            />
          </View>
        ) : (
          <ActivityIndicator size={'large'} animating={true} color="white" />
        )}
      </>
    );
  };

  const PaymentPlanView = () => {
    return (
      // <FlatList
      // data={}
      //  />
      <View style={{marginTop: 20}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.planTitleView}>
              <View style={styles.planTitle}>
                <Text style={styles.planText}>{chosenPlan?.plan}</Text>
              </View>
              <View style={styles.amtView}>
                <Text style={{...styles.aboutText, fontWeight: 'bold'}}>
                  ${chosenPlan?.price}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.amtView}
              onPress={() => {
                setShowPayment(false);
                setShowPlans(true);
              }}>
              <Text style={{...styles.aboutText, color: PRIMARY_COLOR}}>
                Change Plan
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <View style={styles.featureView}>
              <Mark style={styles.featureIcon} />
              <Text style={styles.aboutText}>{chosenPlan?.features}</Text>
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={styles.paymentMethod}>Payment Method</Text>
          </View>
          <View style={styles.cardView}>
            <View style={styles.amtView}>
              <Text>**** **** **** 1987</Text>
            </View>
            <View style={styles.masterCard}>
              <MasterCard style={styles.card} />
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity>
              <Text
                style={{
                  ...styles.aboutText,
                  //   textAlign: 'center',
                  marginTop: 12,
                  color: PRIMARY_COLOR,
                }}>
                Change Payment Method
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DashboardHeader
        bgColor="#316F8A"
        titleColor="#FFFFFF"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        title="Subscriptions"
      />
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.header}>Choose Plan</Text>
          <Text style={styles.subHeader}>
            Select a suitable plan to explore more features
          </Text>
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              style={{alignItems: 'center'}}
              animating={true}
              color={PRIMARY_COLOR}
            />
          ) : (
            <>
              {showPlans && (
                <>
                  {/* <FreePlan /> */}
                  <PlanFlatList />
                </>
              )}
              {showPayment && <PaymentPlanView />}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    marginTop: 30,
    // marginBottom: height / 4,
  },
  header: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },
  subHeader: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: 'rgba(51, 51, 51, 0.51)',
    lineHeight: 28,
    width: '80%',
  },
  featureIcon: {
    marginRight: 10,
    alignSelf: 'center',
  },

  featureView: {
    flexDirection: 'row',
    alignContent: 'space-between',
    marginBottom: 10,
  },

  aboutText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
  },
  planHeader: {
    color: '#333333',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontWeight: '600',
  },
  planHeaderStan: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontWeight: '600',
  },
  planHeaderTextView: {margin: 10, flexDirection: 'row', width},
  planHeaderView: {
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  planHeaderViewStandard: {
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
  },
  planHeaderViewPremium: {
    backgroundColor: '#000000',
    width: '100%',
  },
  plan: {
    width: width / 1.2,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
  },
  planName: {
    alignSelf: 'center',
    marginHorizontal: width / 2.5,
    backgroundColor: '#EBEBEB',
    //   padding: 10,
    width: 70,
    height: 30,
    alignItems: 'center',
  },
  btnView: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  btn: {
    width: width / 1.8,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
  },
  btnStan: {
    width: width / 1.8,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 2,
  },
  btnPre: {
    width: width / 1.8,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  planTitleView: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    width: width / 1.6,
    height: 60,
    flexDirection: 'row',
  },
  planTitle: {
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  planText: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
  },
  amtView: {
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  paymentMethod: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  cardView: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginTop: 20,
  },
  masterCard: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginLeft: width / 3,
    height: 20,
    width: 20,
    borderWidth: 0.4,
    borderColor: '#D9D9D9',
    borderRadius: 5,
  },
  card: {
    alignSelf: 'center',
    marginTop: 3,
  },
});
