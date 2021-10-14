import React from 'react';
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

const DrawerContent = (props: DrawerContentComponentProps) => {
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
                source={require('../assets/img/avatar-demo-image.png')}
              />
            </View>

            <View style={{marginLeft: 20}}>
              <Text style={styles.name}>Ayo Moses</Text>
              <Text style={styles.editProfile}>Edit Profile</Text>
            </View>
          </View>

          <View style={styles.border}></View>

          <View style={styles.navs}>
            <TouchableOpacity style={styles.navContainer}>
              <SubscriptionIcon />
              <Text style={styles.drawerText}>Subscriptions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navContainer}>
              <SupportIcon />
              <Text style={styles.drawerText}>Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navContainer}>
              <AboutIcon />
              <Text style={styles.drawerText}>About</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerFooterWrap}>
            <Text style={styles.drawerFooterLink}>Terms and Conditions</Text>
            <Text style={styles.drawerFooterLink}>Privacy Policy</Text>
            <Text style={styles.drawerFooterLogout}>Logout</Text>
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
    marginBottom: 60
  },
  drawerFooterLink: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 28.5,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    marginLeft: 18,
    color: '#333333',
    marginBottom: 16
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
