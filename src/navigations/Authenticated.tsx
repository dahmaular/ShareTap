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
import EditProfile from '../screens/private/Edit_Profile';
import Subscriptions from '../screens/private/Subscriptions';
import About from '../screens/private/About';
import TermsAndConditions from '../screens/private/Terms_Conditions';
import AddContacts from '../screens/private/Add_Contact';
import SearchContact from '../screens/private/Search_Contact';
import PrivacyPolicy from '../screens/private/Privacy_Policy';

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
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="Subscriptions"
        component={Subscriptions}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Terms"
        component={TermsAndConditions}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="AddContact"
        component={AddContacts}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="SearchContact"
        component={SearchContact}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
