/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  //   TextInput,
} from 'react-native';

import Back from '../../assets/svg/back.svg';
import Logo from '../../assets/svg/Logo green.svg';
import Copyright from '../../assets/svg/copyright.svg';
import DashboardHeader from '../../components/DashboardHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {PRIMARY_COLOR} from '../../core/color';
import {getTermsAndConditionsService} from '../../services/userService';
import moment from 'moment';
import AccordionListItem from '../../components/Accordion';

const {width, height} = Dimensions.get('screen');

const PrivacyPolicy = ({navigation}: any) => {
  const [terms, setTerms] = useState<any>(null);
  const [chosenPlan, setChosenPlan] = useState('');
  const [content, setContent] = useState<any>(null);

  const getTerms = async () => {
    await getTermsAndConditionsService().then(data => {
      console.log('data', data.data?.data);
      setTerms(data.data);
    });
  };

  useEffect(() => {
    getTerms();
  }, []);

  return (
    <View style={styles.container}>
      <DashboardHeader
        bgColor="#316F8A"
        titleColor="#FFFFFF"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        title="Terms & Conditions"
      />
      <ScrollView>
        <View style={styles.body}>
          <View style={{marginBottom: 20}}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16}}>
              Last updated: {moment(terms?.updatedAt).format('LL')}
            </Text>
          </View>
          {/* <Text style={styles.terms}>{terms?.data}</Text> */}
          <AccordionListItem title={'List Item'}>
            <Text>Some text here</Text>
          </AccordionListItem>
          <View style={styles.footer}>
            <TouchableOpacity
              style={{...styles.btn, backgroundColor: PRIMARY_COLOR}}>
              <Text style={styles.btnText}>I AGREE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.btn, backgroundColor: '#000000'}}>
              <Text style={styles.btnText}>DECLINE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // flex: 1,
    // paddingHorizontal: 16,
    // marginTop: 32,
    // backgroundColor: '#f4f4f4',
  },
  body: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  terms: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 22,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    marginVertical: 30,
    // width: '100%',
  },
  btn: {
    width: width / 2.4,
    // alignItems: 'flex-start',
    marginRight: 20,
    height: 40,
    alignItems: 'center',
    borderRadius: 2,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 12,
    marginTop: 10,
  },
});
