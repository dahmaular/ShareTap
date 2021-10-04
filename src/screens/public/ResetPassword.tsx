import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import ArrowLeft from '../../assets/svg/thin_big_left.svg';
import {BACKGROUND_COLOR} from '../../core/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {UnauthenticatedRoutesParamsList} from '../../types';
import TextInputs from '../../components/TextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-paper';
import Button from '../../components/Button';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';

const {width} = Dimensions.get('screen');

type ResetPasswordNavigationProp = NativeStackNavigationProp<
  UnauthenticatedRoutesParamsList,
  'ResetPassword'
>;

type ResetPasswordRouteProp = RouteProp<
  UnauthenticatedRoutesParamsList,
  'ResetPassword'
>;

type Props = {
  navigation: ResetPasswordNavigationProp;
  route: ResetPasswordRouteProp;
};

const ResetPassword = ({navigation, route}: Props) => {
  const [password, setPassword] = useState({value: '', error: ''});
  const [passwordEntry, setPasswordEntry] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const _onRegisterPressed = () => {
    const passwordError = passwordValidator(password.value);

    if (passwordError) {
      setPassword({...password, error: passwordError});
      return;
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title=""
        titleColor="#000000"
        bgColor="#FFFFFF"
        leftSvg={<ArrowLeft />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<></>}
        rightOnPress={() => <></>}
      />
      <View style={styles.container}>
        <ScrollView
          style={styles.createContainer}
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.createView}>
            <Text style={styles.createText}>Reset password</Text>
          </View>

          <TextInputs
            label="New Password"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Enter your password"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry={passwordEntry}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            style={{
              backgroundColor: passwordFocus ? '#FFFFFF' : '#EEEFEF', marginTop: 31
            }}
            right={
              <TextInput.Icon
                name={() => (
                  <TouchableOpacity
                    style={styles.eyeView}
                    onPress={() => setPasswordEntry(prev => !prev)}>
                    <Ionicons
                      name={passwordEntry ? 'eye-outline' : 'eye-off-outline'}
                      size={17}
                      color="#000000"
                    />
                  </TouchableOpacity>
                )}
              />
            }
          />
          <TextInputs
            label="Confirm Password"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Enter your password"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry={passwordEntry}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            style={{
              backgroundColor: passwordFocus ? '#FFFFFF' : '#EEEFEF',
            }}
            right={
              <TextInput.Icon
                name={() => (
                  <TouchableOpacity
                    style={styles.eyeView}
                    onPress={() => setPasswordEntry(prev => !prev)}>
                    <Ionicons
                      name={passwordEntry ? 'eye-outline' : 'eye-off-outline'}
                      size={17}
                      color="#000000"
                    />
                  </TouchableOpacity>
                )}
              />
            }
          />

          <View style={styles.buttonView}>
            <Button
              disabled={false}
              loading={false}
              label="RESET"
              onPress={() => _onRegisterPressed()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  createContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    paddingHorizontal: 15,
  },

  createView: {
    width: '100%',
  },

  createText: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },

  create: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(51, 51, 51, 0.51)',
  },
  eyeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  buttonView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 210,
  },

  option: {
    marginLeft: 2,
    marginRight: 2,
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#333333',
  },
});
