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
  confirmPasswordValidator,
} from '../../core/utils';
import {resetPassword} from '../../services/authService';
import {hubDispatch} from '../../core/awsExports';

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
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const [passwordEntry, setPasswordEntry] = useState(true);
  const [confirmPasswordEntry, setConfirmPasswordEntry] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const {item} = route.params;

  const _onRegisterPressed = async () => {
    const passwordError = passwordValidator(password.value);

    if (passwordError) {
      setPassword({...password, error: passwordError});
      return;
    }

    const response = await resetPassword(item.email, item.code, password.value);

    if (response) {
      hubDispatch('navigation', 'loggedIn'); //Route to homepage
    }
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(true);

    const validationError = passwordValidator(password.value);

    setPassword({...password, error: validationError});
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordFocus(true);

    const validationError = confirmPasswordValidator(
      confirmPassword.value,
      password.value,
    );

    setConfirmPassword({...confirmPassword, error: validationError});
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
            onBlur={handlePasswordBlur}
            style={{
              backgroundColor: passwordFocus ? '#FFFFFF' : '#EEEFEF',
              marginTop: 31,
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
            value={confirmPassword.value}
            onChangeText={text => setConfirmPassword({value: text, error: ''})}
            error={!!confirmPassword.error}
            errorText={confirmPassword.error}
            secureTextEntry={confirmPasswordEntry}
            onFocus={() => setConfirmPasswordFocus(true)}
            onBlur={handleConfirmPasswordBlur}
            style={{
              backgroundColor: confirmPasswordFocus ? '#FFFFFF' : '#EEEFEF',
            }}
            right={
              <TextInput.Icon
                name={() => (
                  <TouchableOpacity
                    style={styles.eyeView}
                    onPress={() => setConfirmPasswordEntry(prev => !prev)}>
                    <Ionicons
                      name={confirmPasswordEntry ? 'eye-outline' : 'eye-off-outline'}
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
