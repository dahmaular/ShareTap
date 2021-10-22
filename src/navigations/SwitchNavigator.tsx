import React, {useEffect, useState} from 'react';
import {Hub, HubCapsule} from '@aws-amplify/core';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AuthenticatedRoutes from './Authenticated';
import UnauthenticatedRoutes from './Public';
import Splash from '../screens/public/Splash';
import {getUserIdService} from '../services/userService';
import Message from '../components/Message';

export type LoggedInState = 'initializing' | 'loggedIn' | 'loggedOut';

const SwitchNavigator = () => {
  const [message, setMessage] = useState('');
  const [isUserLoggedIn, setUserLoggedIn] =
    useState<LoggedInState>('loggedOut');

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    getUserIdService()
      .then(() => setUserLoggedIn('loggedIn')) //also dispatch redux action to get users
      .catch(() => setUserLoggedIn('loggedOut'));
  }, []);

  const hubListener = (data: HubCapsule) => {
    switch (data.channel as 'navigation' | 'alert') {
      case 'navigation':
        return setUserLoggedIn(data.payload.data);
      case 'alert':
        return setMessage(data.payload.data);
      default:
        return;
    }
  };

  useEffect(() => {
    Hub.listen('navigation', hubListener);
    Hub.listen('alert', hubListener);

    return () => {
      Hub.remove('navigation', hubListener);
      Hub.remove('alert', hubListener);
    };
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {isUserLoggedIn === 'initializing' && <Splash />}
        {isUserLoggedIn === 'loggedIn' && <AuthenticatedRoutes />}
        {isUserLoggedIn === 'loggedOut' && <UnauthenticatedRoutes />}
      </NavigationContainer>
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
    </>
  );
};

export default SwitchNavigator;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  toastView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
