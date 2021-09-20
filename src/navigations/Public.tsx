import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  ForgotPassword,
  CreateAccount,
  PhoneNumber,
  ProfileType,
  ResetPassword,
  Signin,
  Verification,
  Welcome,
} from '../screens/public';
import {UnauthenticatedRoutesParamsList} from '../types';

const Stack = createStackNavigator<UnauthenticatedRoutesParamsList>();

export default function UnauthenticatedRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="ProfileType" component={ProfileType} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Verification" component={Verification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
