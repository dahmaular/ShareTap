import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import {
  AuthenticatedRoutesParamsList,
  TabNavigatorParamsList,
} from '../../types';
import {DrawerActions, CompositeNavigationProp} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import Menu from '../../assets/svg/menu.svg';
import Notification from '../../assets/svg/ion-ios-notifications.svg';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Home'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

const Home = ({navigation}: Props) => {
  return (
    <View style={{flex: 1}}>
      <Header
        title="HOME"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Menu />}
        leftOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        rightSvg={
          <>
            <Notification />

            <Badge size={12} style={styles.badgeStyle}>
              0
            </Badge>
          </>
        }
        rightOnPress={() => <></>}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: '#FF4E00',
    color: '#FFFFFF',
  },
});
