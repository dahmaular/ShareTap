/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {DrawerActions, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  AuthenticatedRoutesParamsList,
  TabNavigatorParamsList,
} from '../../types/navigation';
import TextInputs from '../../components/TextInput';
import Header from '../../components/Header';
import Menu from '../../assets/svg/menu.svg';
import Settings from '../../assets/svg/settings.svg';
import Bggroup from '../../assets/svg/bg-group.svg';
import Camera from '../../assets/svg/camera.svg';
import PImageBg from '../../assets/svg/profile-image-bg.svg';
import Location from '../../assets/svg/location.svg';
import Twitter from '../../assets/svg/twitter-colored.svg';
import Facebook from '../../assets/svg/facebook.svg';
import TapLogo from '../../assets/svg/Tapiolla-Full-Icon.svg';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Home'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

const {width, height} = Dimensions.get('screen');

const Profile = ({navigation}: Props) => {
  const [profileModal, setProfileModal] = useState(false);
  const [role, setRole] = useState({value: '', error: ''});
  const [organisation, setOrganisation] = useState({value: '', error: ''});
  const dispatch = useDispatch();

  const UserProfile = () => {
    return (
      <>
        <View style={styles.userProfile}>
          <View style={styles.profileRole}>
            <TapLogo style={styles.logo} />
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.roleText}>UX Designer</Text>
                <Text style={styles.roleCardNo}>2 cards</Text>
              </View>
              <Text style={styles.POrganText}>Tapiolla</Text>
              <Text style={styles.POrganText}>2015-2021</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.addCardBtn}>
              <Text style={styles.profileBtnText}>Add card</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line}></View>
      </>
    );
  };

  const addProfileModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.resultsBottomModal}
        isVisible={profileModal}
        onBackdropPress={() => setProfileModal(false)}
        onBackButtonPress={() => setProfileModal(false)}>
        <TouchableOpacity
          onPress={() => setProfileModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.resultsModal}>
          <View style={styles.modalHeader}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.searchResultText}>Add Profile </Text>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={styles.searchResultNote}>
                Add more roles *********
              </Text>
            </View>
          </View>
          <TextInputs
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
          />
          <TextInputs
            label="Organization"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Add organization"
            value={organisation.value}
            // onFocus={() => setTwitterFocus(true)}
            onChangeText={text => {
              setOrganisation({value: text, error: ''});
            }}
            style={styles.socialInputs}
          />
          <TouchableOpacity
            style={
              role.value !== '' || organisation.value !== ''
                ? styles.modalButton
                : styles.modalButtonInactive
            }
            // onPress={() => submitSocial()}
          >
            <Text style={styles.modalBtnText}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {profileModal && addProfileModal()}
      <Header
        title="PROFILE"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Menu />}
        leftOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        rightSvg={<Settings />}
        rightOnPress={() => <></>}
      />
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.profileContainer}>
            <View style={styles.rect}>
              <Bggroup />
              <View style={styles.bgView}>
                <TouchableOpacity style={styles.bgCamera}>
                  <Camera />
                </TouchableOpacity>
                <Text style={styles.bgText}>Add background image</Text>
              </View>
            </View>
            <View style={styles.proImageView}>
              <View style={styles.pImageBg}>
                <PImageBg />
              </View>
              <TouchableOpacity style={styles.profCamera}>
                <Camera />
              </TouchableOpacity>
            </View>
            <View style={styles.name}>
              <Text style={styles.username}>Charles Hudson</Text>
              <View style={styles.locationView}>
                <Location />
                <Text style={styles.location}>Lagos, Nigeria</Text>
              </View>
            </View>
            <View style={styles.locationView}>
              <View style={styles.socialView}>
                <Twitter />
                <Text style={styles.twitter}>Add Twitter</Text>
              </View>
              <View style={styles.socialView}>
                <Facebook />
                <Text style={styles.facebook}>Add Facebbok</Text>
              </View>
            </View>
            <View style={styles.about}>
              <Text style={styles.aboutHeading}>About Peter</Text>
              <Text style={styles.aboutText}>
                A eget phasellus maecenas vitae et ultrices non. Ilsa Praesent
                diam faucibus vel eget ipsum mus lacus.ilsa Proin volutpat urna,
                congue diam quam mi est ilsa pharetra. Dignissim tris.
              </Text>
            </View>
            <View style={styles.profileView}>
              <Text style={styles.profileText}>Profile</Text>
              <TouchableOpacity
                style={styles.addProfileBtn}
                onPress={() => setProfileModal(true)}>
                <Text style={styles.profileBtnText}>+ Add profile</Text>
              </TouchableOpacity>
            </View>
            <UserProfile />
            <UserProfile />
            <UserProfile />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    marginBottom: 70,
    // paddingHorizontal: 15,
  },
  rect: {
    marginTop: 15,
    backgroundColor: '#D1D1D1',
    width: '100%',
    height: 120,
  },
  bgView: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 20,
  },
  bgCamera: {
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 50,
  },
  bgText: {
    fontFamily: 'Poppins',
  },
  proImageView: {
    marginTop: height / 8.4,
    backgroundColor: '#D1D1D1',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profCamera: {
    left: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 50,
    elevation: 2,
  },
  pImageBg: {
    marginTop: 20,
  },
  name: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: height / 12,
  },
  username: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    color: 'rgba(51, 51, 51, 0.51)',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    margin: 5,
  },
  twitter: {
    color: 'rgba(51, 51, 51, 0.51)',
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: 'normal',
    marginLeft: 5,
  },
  facebook: {
    color: 'rgba(51, 51, 51, 0.51)',
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: 'normal',
    marginLeft: 5,
  },
  socialView: {
    flexDirection: 'row',
    marginTop: 10,
    margin: 20,
    alignItems: 'center',
  },
  about: {
    padding: 20,
  },
  aboutHeading: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
  },
  aboutText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 10,
  },
  profileView: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  profileText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
  },
  addProfileBtn: {
    width: 90,
    height: 22,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: '#316F8A',
    marginLeft: width / 1.8,
  },
  profileBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },
  userProfile: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  profileRole: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 10,
  },
  roleText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  roleCardNo: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    color: '#316F8A',
    backgroundColor: '#E1EEF4',
    marginLeft: 10,
    padding: 2,
  },
  POrganText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(51, 51, 51, 0.51)',
    lineHeight: 15,
  },
  addCardBtn: {
    width: 60,
    height: 22,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: '#316F8A',
    marginLeft: width / 4.5,
  },
  line: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },

  //profile modal
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    color: '#292929',
    fontStyle: 'normal',
    marginTop: 10,
    textAlign: 'center',
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
    height: 470,
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
  optionalText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'rgba(51, 51, 51, 0.51)',
  },

  searchResultNote: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#8C8C8C',
  },

  socialInputs: {
    backgroundColor: '#EEEFEF',
    marginBottom: -5,
    height: 43,
  },

  modalButtonInactive: {
    height: 63,
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 0,
  },

  modalButton: {
    height: 63,
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    bottom: 0,
  },

  modalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 22,
    marginBottom: 22,
    width: '100%',
    flexDirection: 'row',
  },

  connectLine: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  connect: {
    width: 86,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#316F8A',
    borderRadius: 2,
  },

  flatList: {width: '100%', marginBottom: 40, marginTop: 40},

  connectName: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
  },

  connectText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#316F8A',
  },
  eyeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
