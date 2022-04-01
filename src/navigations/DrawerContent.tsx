/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Avatar} from 'react-native-paper';
import AboutIcon from '../assets/svg/about-icon.svg';
import SubscriptionIcon from '../assets/svg/subscription-icon.svg';
import SupportIcon from '../assets/svg/support-icon.svg';
import {useSelector} from 'react-redux';
import {signOutService} from '../services/authService';
import {hubDispatch} from '../core/awsExports';
import {getUserIdService, getUserProfileService} from '../services/userService';
import PImageBg from '../../assets/svg/profile-image-bg.svg';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userId, setUserId] = useState('');
  const handleLogOut = async () => {
    try {
      await signOutService();
      hubDispatch('navigation', 'loggedOut');
    } catch (error: any) {
      hubDispatch('alert', error.message);
    }
  };

  useEffect(() => {
    getUserIdService()
      .then(id => {
        setUserId(id);
      })
      .catch(e =>{
        throw e
      });
  }, []);

  const getProfile = async (id: any) => {
    await getUserProfileService(id).then(profil => {
      setUserProfile(profil.data.getUserProfile?.userDetails);
    });
  };

  useEffect(() => {
    getProfile(userId);
  }, [userId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.drawerContainer}>
          <View style={styles.profile}>
            <View>
              <Avatar.Image
                size={50}
                source={
                  userProfile?.avatar
                    ? {uri: `${userProfile?.avatar}`}
                    : require('../assets/img/user_avater.png')
                }
              />
            </View>

            <View style={{marginLeft: 20}}>
              <Text style={styles.name}>
                {userProfile
                  ? userProfile?.firstName
                    ? userProfile?.firstName
                    : userProfile?.userName
                  : 'Ayo Moses'}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('EditProfile')}>
                <Text style={styles.editProfile}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.border}></View>

          <View style={styles.navs}>
            <TouchableOpacity
              style={styles.navContainer}
              onPress={() => props.navigation.navigate('Subscriptions')}>
              <SubscriptionIcon />
              <Text style={styles.drawerText}>Subscriptions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navContainer}>
              <SupportIcon />
              <Text style={styles.drawerText}>Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navContainer}
              onPress={() => props.navigation.navigate('About')}>
              <AboutIcon />
              <Text style={styles.drawerText}>About</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerFooterWrap}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Terms')}>
              <Text style={styles.drawerFooterLink}>Terms and Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.drawerFooterLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.drawerFooterLogout} onPress={handleLogOut}>
              Logout
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContainer: {
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  name: {
    fontFamily: 'Poppins',
    color: '#333333',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    textTransform: 'capitalize',
  },

  editProfile: {
    color: '#316F8A',
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 0.2,
  },

  profile: {
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  border: {
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
    borderBottomWidth: 1,
    marginTop: 24.5,
    width: '100%',
    flexDirection: 'row',
  },

  navs: {
    marginTop: 50.4,
    paddingHorizontal: 22,
  },

  navContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },

  drawerText: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 28.5,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    marginLeft: 18,
    color: '#333333',
  },

  drawerFooterWrap: {
    marginTop: 120,
    marginBottom: 60,
  },
  drawerFooterLink: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 28.5,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    marginLeft: 18,
    color: '#333333',
    marginBottom: 16,
  },
  drawerFooterLogout: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 28.5,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    marginLeft: 18,
    color: '#EB5757',
  },
});
