import React, {useEffect, useState} from 'react';
import {Hub, HubCapsule} from '@aws-amplify/core';
import {
  NavigationContainer,
  RouteProp,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {StyleSheet, View, Linking, Alert} from 'react-native';
import AuthenticatedRoutes from './Authenticated';
import UnauthenticatedRoutes from './Public';
import Splash from '../screens/public/Splash';
import {getUserIdService} from '../services/userService';
import Message from '../components/Message';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthenticatedRoutesParamsList} from '../types/navigation';

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

const SwitchNavigator = ({navigation}: Props) => {
  // const linking = {
  //   prefixes: ['https://google.com', 'tapiolla://'],
  // };

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

  useEffect(() => {
    // Get the deep link used to open the app
    const getUrl = async () => {
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl === null) {
        return;
      }

      if (initialUrl.includes('Rolodex')) {
        Alert.alert(initialUrl);
        navigation.navigate('Rolodex');
      }
    };

    getUrl();
  });

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        // linking={linking}
      >
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
