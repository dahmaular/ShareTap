import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthenticatedRoutesParamsList, TabNavigatorParamsList} from '../types';
import {Home, Chat, Contacts, Profile, Card} from '../screens/tabs';
import HomeIcon from '../assets/svg/Home.svg';
import ChatBubble from '../assets/svg/Chat.svg';
import People from '../assets/svg/user.svg';
import User from '../assets/svg/Profile.svg';
import Plus from '../assets/svg/add_black_24dp (6) 1.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabStack = createBottomTabNavigator<TabNavigatorParamsList>();

interface TabContainerProps {
  label?: string;
  focused?: boolean;
  color: string;
}

interface CustomTabProps {
  onPress: () => void;
}

const TabContainer: React.FunctionComponent<TabContainerProps> = ({
  children,
  label,
  focused,
}) => (
  <>
    {focused ? (
      <View style={styles.tab}>
        {children}
        <Text style={{...styles.labelText, color: '#316F8A'}}>{label}</Text>
      </View>
    ) : (
      <View
        style={{width: '100%', alignItems: 'center', flex: 1, paddingTop: 15}}>
        {children}
        <Text style={{...styles.labelText, color: '#8C8C8C'}}>{label}</Text>
      </View>
    )}
  </>
);

const CustomTabBarButton: React.FunctionComponent<CustomTabProps> = ({
  onPress,
}) => (
  <TouchableOpacity style={styles.plusView} onPress={onPress}>
    <View style={styles.plusContainer}>
      <Plus color="#FFFFFF" />
    </View>
  </TouchableOpacity>
);

const TabNavigator = () => {
  const {Navigator, Screen} = TabStack;

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let label, iconName: string;

          switch (route.name) {
            case 'Home':
              label = 'Home';
              iconName = 'home-outline';
              break;
            case 'Chat':
              label = 'Chat';
              iconName = 'chatbubble-ellipses-outline';
              break;
            case 'Contacts':
              label = 'Contacts';
              iconName = 'people';
              break;
            case 'Profile':
              label = 'Profile';
              iconName = 'person-outline';
              break;
            default:
              return null;
          }
          return (
            <TabContainer label={label} focused={focused} color={color}>
              {label == 'Home' && (
                <HomeIcon color={focused ? '#31AAB7' : '#ACBAC3'} />
              )}

              {label == 'Chat' && (
                <ChatBubble color={focused ? '#31AAB7' : '#ACBAC3'} />
              )}

              {label == 'Contacts' && (
                <People color={focused ? '#31AAB7' : '#ACBAC3'} />
              )}

              {label == 'Profile' && (
                <User color={focused ? '#31AAB7' : '#ACBAC3'} />
              )}
            </TabContainer>
          );
        },

        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 70,
          position: 'absolute',
        },
        tabBarShowLabel: false,
      })}>
      <Screen name="Home" component={Home} options={{headerShown: false}} />
      <Screen name="Chat" component={Chat} options={{headerShown: false}} />

      <Screen
        name="Card"
        component={Card}
        options={{
          headerShown: false,
          tabBarButton: props => <CustomTabBarButton onPress={() => <></>} />,
        }}
      />
      <Screen
        name="Contacts"
        component={Contacts}
        options={{headerShown: false}}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tab: {
    borderBottomWidth: 2,
    borderBottomColor: '#316F8A',
    alignItems: 'center',
    flex: 1,
    paddingTop: 15,
  },
  labelText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginTop: 6,
  },

  plusView: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  plusContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#316F8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
