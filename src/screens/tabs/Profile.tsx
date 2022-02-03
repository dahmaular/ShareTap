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
import {DrawerActions, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  AuthenticatedRoutesParamsList,
  TabNavigatorParamsList,
} from '../../types/navigation';
import NotificationModal from '../../components/NotificationModal';
import Header from '../../components/Header';
import Menu from '../../assets/svg/menu.svg';
import Settings from '../../assets/svg/settings.svg';
import Bggroup from '../../assets/svg/bg-group.svg';
import Camera from '../../assets/svg/camera.svg';
import PImageBg from '../../assets/svg/profile-image-bg.svg';
import Location from '../../assets/svg/location.svg';
import Twitter from '../../assets/svg/twitter-colored.svg';
import Facebook from '../../assets/svg/facebook.svg';
import {BACKGROUND_COLOR} from '../../core/color';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Home'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

const {width, height} = Dimensions.get('screen');

const Profile = ({navigation}: Props) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const _onNotificationPressed = () => {
    setModal(true);
  };

  const UserCard = () => {
    return (
      <>
        <Text>Hello World</Text>
        <Text style={styles.aboutText}>
          A eget phasellus maecenas vitae et ultrices non. Ilsa Praesent diam
          faucibus vel eget ipsum mus lacus.ilsa Proin volutpat urna, congue
          diam quam mi est ilsa pharetra. Dignissim tris.
        </Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {modal && (
        <NotificationModal
          visible={modal}
          onBackButtonPress={() => setModal(true)}
          onBackdropPress={() => setModal(true)}
          onClose={() => setModal(false)}
        />
      )}
      <Header
        title="PROFILE"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Menu />}
        leftOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        rightSvg={<Settings onPress={_onNotificationPressed} />}
        rightOnPress={() => <></>}
      />
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={true}
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
              <TouchableOpacity style={styles.addProfileBtn}>
                <Text style={styles.profileBtnText}>+ Add profile</Text>
              </TouchableOpacity>
            </View>
            <UserCard />
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
    alignItems: 'center',
    marginBottom: 50,
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
});
