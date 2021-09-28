import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {BACKGROUND_COLOR} from '../../core/color';
import Group from '../../assets/svg/group.svg';
import Button from '../../components/Button';
import NavButton from '../../components/NavButton';
import Tapiolla from '../../assets/svg/tap_logo_2.svg';
import {UnauthenticatedRoutesParamsList} from '../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const {width} = Dimensions.get('screen');

type WelcomeNavigationProp = NativeStackNavigationProp<
  UnauthenticatedRoutesParamsList,
  'Welcome'
>;

type Props = {
  navigation: WelcomeNavigationProp;
};

const Welcome = ({navigation}: Props) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.welcomeContainer}>
            <View style={styles.group}>
              <Group width={260} height={262} />
            </View>

            <View style={{marginTop: 50}}>
              <Text style={styles.welcomeText}>Welcome to Tapiolla</Text>
            </View>

            <View style={{marginTop: 8}}>
              <Text style={styles.welcomeNote}>
                Connect with other professionals, create
              </Text>
              <Text style={styles.welcomeNote}>
                personalised business cards and share
              </Text>
              <Text style={styles.welcomeNote}>with your connections.</Text>
            </View>

            <View style={styles.buttonView}>
              <Button
                disabled={false}
                label="CREATE ACCOUNT"
                onPress={() => navigation.navigate('ProfileType')}
                loading={false}
              />
            </View>

            <View style={styles.button}>
              <NavButton
                label="SIGN IN"
                onPress={() => <></>}
              />
            </View>

            <View style={styles.tapLogo}>
              <Tapiolla />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  welcomeContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    paddingHorizontal: 20,
  },

  group: {
    marginTop: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeText: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },

  welcomeNote: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'rgba(51, 51, 51, 0.51)',
  },

  buttonView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 37,
  },

  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 25,
  },

  tapLogo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 47,
    marginBottom: 20,
  },
});
