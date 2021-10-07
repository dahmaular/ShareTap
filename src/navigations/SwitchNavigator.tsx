import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AuthenticatedRoutes from './Authenticated';
import UnauthenticatedRoutes from './Public';
import Splash from '../screens/public/Splash';

const SwitchNavigator = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    checkAuthState();
  }, [isUserLoggedIn]);

  const checkAuthState = async () => {
    setUserLoggedIn('loggedOut');
  };

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
