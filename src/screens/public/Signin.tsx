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
import GoogleButton from '../../components/GoogleButton';
import {passwordValidator, nameValidator} from '../../core/utils';
import {signInService} from '../../services/authService';
import {hubDispatch} from '../../core/awsExports';

const {width} = Dimensions.get('screen');

type SignInNavigationProp = NativeStackNavigationProp<
  UnauthenticatedRoutesParamsList,
  'Signin'
>;

type SignInRouteProp = RouteProp<UnauthenticatedRoutesParamsList, 'Signin'>;

type Props = {
  navigation: SignInNavigationProp;
  route: SignInRouteProp;
};

const Signin = ({navigation, route}: Props) => {
  const [userName, setUserName] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);

  const [passwordEntry, setPasswordEntry] = useState(true);

  const [userNameFocus, setUserNameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const _onRegisterPressed = async () => {
    try {
      const emailError = nameValidator(userName.value, 'Username');
      const passwordError = passwordValidator(password.value);

      if (emailError || passwordError) {
        setUserName({...userName, error: emailError});
        setPassword({...password, error: passwordError});
        return;
      }

      setLoading(true);

      await signInService(userName.value, password.value);

      hubDispatch('navigation', 'loggedIn'); //Route to homepage
    } catch (error: any) {
      hubDispatch('alert', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(true);

    const validationError = passwordValidator(password.value);

    setPassword({...password, error: validationError});
  };

  const handleUserNameBlur = () => {
    setUserNameFocus(true);

    const validationError = nameValidator(userName.value, 'Username');
    setUserName({...userName, error: validationError});
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
            <Text style={styles.createText}>Sign in</Text>
            <Text style={styles.create}>Sign into your account</Text>
          </View>

          <TextInputs
            label="Username"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Enter your username"
            value={userName.value}
            onChangeText={text => setUserName({value: text, error: ''})}
            error={!!userName.error}
            errorText={userName.error}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="familyName"
            keyboardType="name-phone-pad"
            onFocus={() => setUserNameFocus(true)}
            onBlur={handleUserNameBlur}
            style={{
              backgroundColor: userNameFocus ? '#FFFFFF' : '#EEEFEF',
            }}
          />

          <TextInputs
            label="Password"
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

          <View style={styles.forgotpasswordContainer}>
            <Text
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotpasswordText}>
              Forgot password?
            </Text>
          </View>

          <View style={styles.buttonView}>
            <Button
              disabled={false}
              loading={loading}
              label="CONTINUE"
              onPress={() => _onRegisterPressed()}
            />
          </View>

          <View style={styles.OR}>
            <View style={styles.firstLine}></View>
            <Text style={styles.option}>or</Text>
            <View style={styles.secondLine}></View>
          </View>

          <View style={styles.googleView}>
            <GoogleButton
              disabled={false}
              label="CONTINUE"
              onPress={() => <></>}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Signin;

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
    marginTop: 67,
  },

  OR: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  firstLine: {
    borderColor: '#DFE2E4',
    borderWidth: 0.5,
    width: 159,
  },

  secondLine: {
    borderColor: '#DFE2E4',
    borderWidth: 0.5,
    width: 159,
  },

  forgotpasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotpasswordText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.20000000298023224,
    textAlign: 'left',
    color: '#316F8A',
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

  googleView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 23,
    marginBottom: 50,
  },
});
