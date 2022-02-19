/* eslint-disable prefer-const */ /* eslint-disable no-extra-boolean-cast */ /* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Hub, HubCapsule} from '@aws-amplify/core';
import {
  NavigationContainer,
  RouteProp,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {StyleSheet, View, Linking, AppState} from 'react-native';
import AuthenticatedRoutes from './Authenticated';
import UnauthenticatedRoutes from './Public';
import Splash from '../screens/public/Splash';
import {getUserIdService} from '../services/userService';
import Message from '../components/Message';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthenticatedRoutesParamsList} from '../types/navigation';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export type LoggedInState = 'initializing' | 'loggedIn' | 'loggedOut';

type RolodexProps = NativeStackNavigationProp<
  AuthenticatedRoutesParamsList,
  'Rolodex'
>;

type RolodexRouteProp = RouteProp<AuthenticatedRoutesParamsList, 'Rolodex'>;

type Props = {
  navigation: RolodexProps;
  route: RolodexRouteProp;
};

const SwitchNavigator = () => {
  const [message, setMessage] = useState<{
    type: 'regular' | 'error';
    text: string;
  }>({type: 'regular', text: ''});
  const [isUserLoggedIn, setUserLoggedIn] =
    useState<LoggedInState>('loggedOut');

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    getUserIdService()
      .then(() => setUserLoggedIn('loggedIn')) //also dispatch redux action to get users
      .catch(() => setUserLoggedIn('loggedOut'));
  }, []);

  const hubListener = (data: HubCapsule) => {
    switch (data.channel as 'navigation' | 'alert' | 'auth') {
      case 'navigation':
        return setUserLoggedIn(data.payload.data);
      case 'alert':
        return setMessage(data.payload.data);
      case 'auth':
        if (data.payload.event === 'cognitoHostedUI') {
          return setUserLoggedIn('loggedIn');
        }
        break;
      default:
        return setUserLoggedIn('loggedOut');
    }
  };

  useEffect(() => {
    Hub.listen('navigation', hubListener);
    Hub.listen('alert', hubListener);
    Hub.listen('auth', hubListener);

    return () => {
      Hub.remove('navigation', hubListener);
      Hub.remove('alert', hubListener);
      Hub.remove('auth', hubListener);
    };
  }, []);

  const handleDynamicLink = (link: any) => {
    console.log('link url ++++', link);
    if (!!link?.url) {
      let getId = link.url?.split('=').pop();
      console.log('ID in the link', getId);
      // navigation.navigate('Rolodex')
      // setTimeout(()=>{
      //   // add ID to the navigation params later
      //   // navigation.navigate('Rolodex');
      // }, 1000)
    }
  };

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      });
    const linkListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkListener();
    };
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {isUserLoggedIn === 'initializing' && <Splash />}
        {isUserLoggedIn === 'loggedIn' && <AuthenticatedRoutes />}
        {isUserLoggedIn === 'loggedOut' && <UnauthenticatedRoutes />}
      </NavigationContainer>
      {message.text != '' && (
        <View style={styles.toastView}>
          <Message
            message={message}
            onHide={() => {
              setMessage({...message, text: ''});
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
