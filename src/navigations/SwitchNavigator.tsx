import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AuthenticatedRoutes from './Authenticated';
import UnauthenticatedRoutes from './Public';

const SwitchNavigator = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    setUserLoggedIn('loggedIn');
  };

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {isUserLoggedIn === 'initializing' && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" animating color="#316F8A" />
          </View>
        )}
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
