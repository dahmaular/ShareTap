import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';
import DrawerContent from './DrawerContent';
import {AuthenticatedRoutesParamsList} from '../types/navigation';
import Search from '../screens/private/Search';
import Rolodex from '../screens/private/Rolodex';
import SetReminder from '../screens/private/SetReminder';

const Drawer = createDrawerNavigator<AuthenticatedRoutesParamsList>();

export default function AuthenticatedRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Root"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Root"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="Rolodex"
        component={Rolodex}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="SetReminder"
        component={SetReminder}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
