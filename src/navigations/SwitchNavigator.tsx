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

export type LoggedInState = 'initializing' | 'loggedIn' | 'loggedOut';

const SwitchNavigator = () => {
  const [isUserLoggedIn, setUserLoggedIn] =
    useState<LoggedInState>('loggedOut');

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    getUserIdService()
      .then(() => setUserLoggedIn('loggedIn')) //also dispatch redux action to get users
      .catch(() => setUserLoggedIn('loggedOut'));
  }, []);

  const hubListener = (data: HubCapsule) => {
    setUserLoggedIn(data.payload.data);
  };

  useEffect(() => {
    Hub.listen('navigation', hubListener);

    return () => {
      Hub.remove('navigation', hubListener);
    };
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {isUserLoggedIn === 'initializing' && <Splash />}
        {isUserLoggedIn === 'loggedIn' && <AuthenticatedRoutes />}
        {isUserLoggedIn === 'loggedOut' && <UnauthenticatedRoutes />}
      </NavigationContainer>
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
});
