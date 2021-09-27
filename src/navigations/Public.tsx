import React from 'react';
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
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumber}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileType"
        component={ProfileType}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
