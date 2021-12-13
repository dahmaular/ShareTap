import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthenticatedRoutesParamsList, TabNavigatorParamsList} from '../types';
import {Home, Chat, Contacts, Profile, Card} from '../screens/tabs';
import Plus from '../assets/svg/add_black_24dp (6) 1.svg';
import Svg, {Path} from 'react-native-svg';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Card'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

const TabStack = createBottomTabNavigator<TabNavigatorParamsList>();

interface TabContainerProps {
  label?: string;
  focused?: boolean;
  color: string;
}

interface CustomTabProps {
  // onPress: () => void;
  // onPress: Function
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

const CustomTabBarButton: React.FunctionComponent<CustomTabProps> = (
  {
    // children,
    // onPress,
  },
) => {
  const navigation = useNavigation<Props>();
  return (
    <TouchableOpacity
      style={styles.plusView}
      onPress={() => {
        navigation.navigate('CreateCard');
      }}>
      <View style={styles.plusContainer}>
        <Plus color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};

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
                <Svg width={22} height={21} fill="none">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.502 13.38c1.054 0 1.911.851 1.911 1.898v2.691c0 .225.18.405.412.41h1.667c1.314 0 2.383-1.055 2.383-2.351V8.394a1.467 1.467 0 00-.584-1.145l-5.769-4.601a2.114 2.114 0 00-2.634.002l-5.73 4.597a1.466 1.466 0 00-.596 1.162v7.619c0 1.296 1.069 2.352 2.383 2.352h1.683c.238 0 .43-.188.43-.42 0-.05.006-.101.017-.15v-2.532c0-1.04.852-1.891 1.898-1.898h2.53zm3.99 6.312H14.81c-.964-.023-1.708-.78-1.708-1.723v-2.691a.593.593 0 00-.599-.586H9.977a.593.593 0 00-.59.586v2.682a.635.635 0 01-.027.189 1.74 1.74 0 01-1.731 1.543H5.944c-2.038 0-3.695-1.644-3.695-3.664V8.403a2.76 2.76 0 011.102-2.19l5.718-4.59a3.423 3.423 0 014.27-.001l5.759 4.593a2.763 2.763 0 011.088 2.17v7.643c0 2.02-1.657 3.664-3.695 3.664z"
                    fill={focused ? '#31AAB7' : '#ACBAC3'}
                  />
                </Svg>
              )}

              {label == 'Chat' && (
                <Svg width={21} height={21} fill="none">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.28.875a9.34 9.34 0 016.65 2.753c3.669 3.668 3.669 9.636 0 13.303a9.435 9.435 0 01-6.671 2.752 9.375 9.375 0 01-3.942-.866c-.371-.149-.718-.289-.968-.289-.287.002-.673.135-1.045.264-.765.262-1.717.59-2.422-.112-.701-.703-.378-1.652-.117-2.416.129-.376.26-.765.26-1.059 0-.241-.115-.55-.294-.993C.092 10.672.85 6.407 3.63 3.629A9.34 9.34 0 0110.28.875zm0 1.313a8.038 8.038 0 00-5.723 2.37 8.131 8.131 0 00-1.621 9.134c.205.507.402 1 .402 1.513 0 .512-.175 1.027-.33 1.482-.128.375-.321.94-.197 1.064.121.126.69-.072 1.066-.2.45-.155.961-.332 1.468-.335.507 0 .986.192 1.493.396 3.103 1.435 6.774.783 9.165-1.608 3.155-3.157 3.155-8.292 0-11.448a8.038 8.038 0 00-5.722-2.368zm3.454 7.58a.875.875 0 110 1.75.878.878 0 01-.878-.875c0-.484.387-.875.87-.875h.008zm-3.508 0a.875.875 0 110 1.75.878.878 0 01-.878-.875.87.87 0 01.87-.875h.008zm-3.508 0a.875.875 0 110 1.75.878.878 0 01-.878-.875c0-.484.388-.875.87-.875h.008z"
                    fill={focused ? '#31AAB7' : '#ACBAC3'}
                  />
                </Svg>
              )}

              {label == 'Contacts' && (
                <Svg width={22} height={21} fill="none">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.901 12.612H11l.22.001c1.69.011 5.55.182 5.55 2.798 0 2.6-3.725 2.77-5.523 2.78h-.666c-1.69-.01-5.55-.181-5.55-2.794 0-2.603 3.86-2.773 5.55-2.784h.32zm0 1.313c-2.079 0-4.558.255-4.558 1.471 0 1.19 2.331 1.467 4.368 1.483h.19c2.079 0 4.557-.254 4.557-1.468 0-1.228-2.478-1.486-4.557-1.486zm6.96-1.668c2.12.318 2.565 1.313 2.565 2.093 0 .476-.187 1.345-1.439 1.822a.657.657 0 01-.467-1.227c.593-.226.593-.475.593-.595 0-.383-.487-.65-1.448-.794a.658.658 0 01-.552-.748.66.66 0 01.747-.55zm-13.173.551a.658.658 0 01-.552.748c-.96.143-1.448.41-1.448.794 0 .12 0 .369.594.595a.656.656 0 11-.467 1.227c-1.253-.478-1.44-1.347-1.44-1.822 0-.779.446-1.775 2.567-2.093a.66.66 0 01.746.551zM10.901 3.5a4.002 4.002 0 013.998 3.998 4.002 4.002 0 01-3.998 3.998h-.024a3.955 3.955 0 01-2.816-1.178 3.954 3.954 0 01-1.157-2.823A4.002 4.002 0 0110.901 3.5zm0 1.313a2.688 2.688 0 00-2.684 2.685 2.654 2.654 0 00.775 1.895 2.656 2.656 0 001.887.79l.022.656v-.656a2.688 2.688 0 002.685-2.685 2.689 2.689 0 00-2.685-2.686zm5.415-.456a3.16 3.16 0 012.656 3.13 3.187 3.187 0 01-2.73 3.135.655.655 0 01-.74-.56c-.05-.359.2-.69.559-.74a1.866 1.866 0 001.599-1.838 1.85 1.85 0 00-1.557-1.832.657.657 0 01.213-1.295zm-10.076.54a.657.657 0 01-.54.755 1.851 1.851 0 00-1.557 1.834A1.865 1.865 0 005.74 9.322a.656.656 0 11-.18 1.3 3.186 3.186 0 01-2.73-3.134 3.16 3.16 0 012.656-3.13.653.653 0 01.754.54z"
                    fill={focused ? '#31AAB7' : '#ACBAC3'}
                  />
                </Svg>
              )}

              {label == 'Profile' && (
                <Svg width={21} height={21} fill="none">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.36 15.919c0 2.884-3.955 3.217-6.93 3.217h-.212c-1.895-.004-6.718-.124-6.718-3.234 0-2.826 3.796-3.203 6.747-3.217h.396c1.895.004 6.717.123 6.717 3.234zm-6.93-1.922c-3.728 0-5.618.64-5.618 1.905 0 1.275 1.89 1.922 5.619 1.922 3.727 0 5.616-.64 5.616-1.905 0-1.276-1.889-1.922-5.616-1.922zm0-12.247a4.65 4.65 0 014.646 4.646 4.65 4.65 0 01-4.645 4.645h-.028a4.637 4.637 0 01-4.62-4.648 4.651 4.651 0 014.648-4.643zm0 1.25a3.4 3.4 0 00-3.397 3.396 3.389 3.389 0 003.372 3.397l.026.625v-.625a3.4 3.4 0 003.396-3.397 3.4 3.4 0 00-3.396-3.397z"
                    fill={focused ? '#31AAB7' : '#ACBAC3'}
                  />
                </Svg>
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
          tabBarButton: props => (
            <CustomTabBarButton
            // onPress={() => console.log('I was presssssed')}
            // {...props}
            // onPress={() => navigation.navigation.navigate('Card')}
            />
          ),
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
