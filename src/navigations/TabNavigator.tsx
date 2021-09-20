import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabNavigatorParamsList} from '../types';
import {Home, Chat, Contacts, Profile, Card} from '../screens/tabs';
import HomeIcon from '../assets/svg/Home.svg';

const TabStack = createBottomTabNavigator<TabNavigatorParamsList>();

interface TabContainerProps {
  label?: string;
  focused?: boolean;
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
          borderBottomWidth: 1,
          borderBottomColor: '#316F8A',
          alignItems: 'center',
          flex: 1,
          paddingTop: 7,
        }}>
        {children}
        <Text style={{color: '#316F8A', marginTop: 6}}>{label}</Text>
      </View>
    ) : (
      <View
        style={{width: '100%', alignItems: 'center', flex: 1, paddingTop: 8}}>
        {children}
        <Text style={{color: '#8C8C8C', marginTop: 6}}>{label}</Text>
      </View>
    )}
  </>
);

const TabNavigator = () => {
  const {Navigator, Screen} = TabStack;

  return (
    <Navigator
      initialRouteName="Home"
      // tabBarOptions={{
      //   showLabel: false,
      //   style: {
      //     height: 80,
      //     backgroundColor: '#30444E',
      //     borderTopColor: 'rgba(0, 0, 0, 0)',
      //   },
      // }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
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
            <TabContainer label={label} focused={focused}>
              <HomeIcon color={`${focused ? 'red' : 'blue'}`} />
            </TabContainer>
          );
        },

        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 70,
          borderTopColor: 'transparent',
        },
        headerShown: false,
      })}>
      <Screen name="Home" component={Home} />
      <Screen name="Chat" component={Chat} />
      <Screen name="Contacts" component={Contacts} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};

export default TabNavigator;
