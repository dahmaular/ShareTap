import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';
import DrawerContent from './DrawerContent';
import {AuthenticatedRoutesParamsList} from '../types';
import Search from '../screens/private/Search';
import Rolodex from '../screens/private/Rolodex';
import CreateCard from '../screens/private/Create_Card';

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
        name="CreateCard"
        component={CreateCard}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
