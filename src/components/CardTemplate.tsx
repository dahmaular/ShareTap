/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Share,
  Linking,
  TextInput,
  Platform,
  Image,
} from 'react-native';

import {Menu} from 'react-native-paper';
import Link from '../assets/svg/link_02.svg';
import Facebook from '../assets/svg/facebbk.svg';
import Twitter from '../assets/svg/twitter.svg';
import LinkedIn from '../assets/svg/linkedIn.svg';
const {width} = Dimensions.get('window');
import dynamicLinks from '@react-native-firebase/dynamic-links';
// import CheckBox from '@react-native-community/checkbox';
import {Checkbox} from 'react-native-paper';
import TextInputs from './TextInput';

import {ListUserCardsResponse} from '../services/userService';
import {CreateUserCardResponse} from '../services/cardService';

export interface cardTemplate {
  item: Record<
    | 'name'
    | 'role'
    | 'email'
    | 'phone'
    | 'address'
    | 'website'
    | 'facebook'
    | 'twitter'
    | 'linkedIn'
    | 'cardTemplateId',
    string
  >;
  index: number;
  boxWidth: number;
  halfBoxDistance: number;
  pan: any;
  idColor: any;
  social: {
    websiteIcon: string;
    twitterIcon: string;
    facebookIcon: string;
    linkedInIcon: string;
  };
}

const CardTemplate = ({
  item,
  index,
  boxWidth,
  halfBoxDistance,
  pan,
  idColor,
  social,
}: cardTemplate) => {
  const [visible, setVisible] = React.useState(false);

  const userId = 2;

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const [checkName, setCheckName] = React.useState(false);
  const [checkRole, setCheckRole] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [checkPhone, setCheckPhone] = React.useState(false);
  const [checkAddress, setCheckAddress] = React.useState(false);
  const [name, setName] = useState({value: '', error: ''});
  const [role, setRole] = useState({value: '', error: ''});
  const [mail, setMail] = useState({value: '', error: ''});
  const [telephone, setTelephone] = useState({value: '', error: ''});
  const [address, setAddress] = useState({value: '', error: ''});
  const [emailVal, setEmailVal] = useState(false);

  const validate = (text: string) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      // item.email = text;
      setEmailVal(true);
      return false;
    }
  };

  return (
    <Animated.View
      style={{
        ...styles.animatedCard,
        transform: [
          {
            scale: pan.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
              ],
              outputRange: [0.8, 1, 0.8], // scale down when out of scope
              extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={styles.menu}
        anchor={
          <View style={{...styles.touchable, width: boxWidth}}>
            <View style={styles.checkInput}>
              <Checkbox.Android
                style={styles.checkBox}
                color="#219653"
                disabled={false}
                status={item.name.length > 3 ? 'checked' : 'unchecked'}
                onPress={() => setCheckName(!checkName)}
              />
              <TextInput
                style={styles.namer}
                placeholder="Add name"
                value={item.name}
                onChangeText={t => {
                  setName({value: t, error: ''});
                  item.name = t;
                }}
              />
            </View>
            <View style={styles.checkInput}>
              <Checkbox.Android
                style={styles.checkBox}
                color="#219653"
                disabled={false}
                status={item.role.length > 3 ? 'checked' : 'unchecked'}
                onPress={() => setCheckRole(!checkRole)}
              />
              <TextInput
                style={styles.namer}
                placeholder="Add role"
                value={item.role}
                onChangeText={t => {
                  setRole({value: t, error: ''});
                  item.role = t;
                }}
              />
            </View>
            <View style={styles.checkInput}>
              <Checkbox.Android
                style={styles.checkBox}
                color="#219653"
                disabled={false}
                status={
                  item.email.length > 5 || emailVal ? 'checked' : 'unchecked'
                }
                onPress={() => setCheckEmail(!checkEmail)}
              />
              <TextInput
                style={styles.namer}
                placeholder="Add mail"
                autoCapitalize="none"
                keyboardType="email-address"
                value={item.email}
                onChangeText={t => {
                  validate(t);
                  setMail({value: t, error: ''});
                  item.email = t;
                }}
              />
            </View>
            <View style={styles.checkInput}>
              <Checkbox.Android
                style={styles.checkBox}
                color="#219653"
                disabled={false}
                status={item.phone.length > 10 ? 'checked' : 'unchecked'}
                onPress={() => setCheckPhone(!checkPhone)}
              />
              <TextInput
                style={styles.namer}
                placeholder="Add telephone no."
                value={item.phone}
                keyboardType="phone-pad"
                onChangeText={t => {
                  setTelephone({value: t, error: ''});
                  item.phone = t;
                }}
              />
            </View>
            <View style={styles.checkInput}>
              <Checkbox.Android
                style={styles.checkBox}
                color="#219653"
                disabled={false}
                status={item.address.length > 3 ? 'checked' : 'unchecked'}
                onPress={() => setCheckAddress(!checkAddress)}
              />
              <TextInput
                style={styles.namer}
                placeholder="Add Address"
                value={item.address}
                onChangeText={t => {
                  setAddress({value: t, error: ''});
                  item.address = t;
                }}
              />
              <View style={styles.socialIcons}>
                {social.websiteIcon === 'true' && (
                  <TouchableOpacity
                    style={styles.social}
                    onPress={() => {
                      item.name.length;
                    }}>
                    <Link />
                  </TouchableOpacity>
                )}
                {social.facebookIcon === 'true' && (
                  <TouchableOpacity style={styles.social}>
                    <Facebook />
                  </TouchableOpacity>
                )}
                {social.twitterIcon === 'true' && (
                  <TouchableOpacity style={styles.social}>
                    <Twitter />
                  </TouchableOpacity>
                )}
                {social.linkedInIcon === 'true' && (
                  <TouchableOpacity style={styles.social}>
                    <LinkedIn />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        }
      />
      {idColor && (
        <View style={{...styles.bottomLine, backgroundColor: `${idColor}`}} />
      )}
      {/* {idColor && (
        <View style={{...styles.bottomLine2, backgroundColor: `${idColor}`}} />
      )}
      {idColor && (
        <View style={{...styles.bottomLine3, backgroundColor: `${idColor}`}} />
      )}
      {idColor && (
        <View style={{...styles.bottomLine4, backgroundColor: `${idColor}`}} />
      )} */}
    </Animated.View>
  );
};

export default CardTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedCard: {
    height: 191,
    width: width,
    borderWidth: 1,
    borderColor: 'rgba(49, 111, 138, 0.16)',
    backgroundColor: '#FFFFFF',
    marginRight: -25,
  },

  touchable: {
    height: 184,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },

  checkBox: {
    borderColor: 'rgba(51, 51, 51, 0.4)',

    alignSelf: 'center',
    marginRight: 20,
  },
  checkInput: {
    flexDirection: 'row',
    marginBottom: -20,
  },
  social: {marginRight: 10},

  bottomLine: {width: '100%', height: 7},
  bottomLine2: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    height: 7,
    backgroundColor: '#9B51E0',
  },
  bottomLine3: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    height: 7,
    backgroundColor: '#F2C34A',
  },
  bottomLine4: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    height: 7,
    backgroundColor: '#F2994A',
  },

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
    color: 'rgba(51, 51, 51, 0.4)',
  },
  namer: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#333333',
    alignItems: 'center',
    marginTop: -3,
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

  menu: {
    position: 'absolute',
    top: 460,
    left: 280,
    width: 100,
    height: 112,
  },
  socialIcons: {
    flexDirection: 'row',
    marginLeft: width / 5,
    alignItems: 'center',
  },
});
