import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';
import DrawerContent from './DrawerContent';
import {AuthenticatedRoutesParamsList} from '../types/navigation';
import Search from '../screens/private/Search';
import Rolodex from '../screens/private/Rolodex';
import SetReminder from '../screens/private/SetReminder';
import ReminderCalendar from '../screens/private/ReminderCalendar';
import SetMessage from '../screens/private/SetMessage';
import CreateCard from '../screens/private/Create_Card';
import Dashboard from '../screens/private/Dashboard';
import ChatMessage from '../screens/private/ChatMessage';
import ScheduledMessages from '../screens/private/ScheduledMessages';

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

      <Drawer.Screen
        name="SetMessage"
        component={SetMessage}
        options={{headerShown: false}}
      />

      <Drawer.Screen name="ReminderCalendar" component={ReminderCalendar} />

      <Drawer.Screen
        name="CreateCard"
        component={CreateCard}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="ChatMessage"
        component={ChatMessage}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="ScheduledMessages"
        component={ScheduledMessages}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
