import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabNavigatorParamsList} from '../types';
import {Home, Chat, Contacts, Profile, Card} from '../screens/tabs';
import HomeIcon from '../assets/svg/Home.svg';

const TabStack = createBottomTabNavigator<TabNavigatorParamsList>();

interface TabContainerProps {
  label?: string;
  focused?: boolean;
  color: string;
}

const TabContainer: React.FunctionComponent<TabContainerProps> = ({
  children,
  label,
  focused,
}) => (
  <>
    {focused ? (
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: '#316F8A',
          alignItems: 'center',
          flex: 1,
          paddingTop: 15,
        }}>
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
              iconName = 'home';
              break;
            case 'Chat':
              label = 'Chat';
              iconName = 'chat';
              break;
            case 'Contacts':
              label = 'Contacts';
              iconName = 'contacts';
              break;
            case 'Profile':
              label = 'Profile';
              iconName = 'profile';
              break;
            default:
              return null;
          }
          return (
            <TabContainer label={label} focused={focused} color={color}>
              <HomeIcon color={color} />
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
  labelText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginTop: 6,
  },
});
