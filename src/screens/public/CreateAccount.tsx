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
import FacebookButton from '../../components/FacebookButton';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  confirmPasswordValidator,
} from '../../core/utils';
import {FederatedSignInOptions} from '@aws-amplify/auth/lib-esm/types';
import {Auth} from 'aws-amplify';

const {width} = Dimensions.get('screen');

type CreateNavigationProp = NativeStackNavigationProp<
  UnauthenticatedRoutesParamsList,
  'CreateAccount'
>;

type CreateRouteProp = RouteProp<
  UnauthenticatedRoutesParamsList,
  'CreateAccount'
>;

type Props = {
  navigation: CreateNavigationProp;
  route: CreateRouteProp;
};

const CreateAccount = ({navigation, route}: Props) => {
  const [firstName, setfirstName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [userName, setUserName] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });

  const [passwordEntry, setPasswordEntry] = useState(true);
  const [confirmEntry, setConfirmEntry] = useState(true);

  const [emailFocus, setEmailFocus] = useState(false);
  const [firstNameFocus, setfirstNameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const {item} = route.params;

  const validateFields = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const firstNameError = nameValidator(firstName.value, 'First name');
    const userNameError = nameValidator(userName.value, 'Username');
    const confirmPasswordError = confirmPasswordValidator(
      confirmPassword.value,
      password.value,
    );

    return {
      emailError,
      passwordError,
      firstNameError,
      userNameError,
      confirmPasswordError,
    };
  };

  const _onRegisterPressed = () => {
    const validationErrors = validateFields();

    if (Object.values(validationErrors).some(value => value !== '')) {
      setfirstName({...firstName, error: validationErrors.firstNameError});
      setEmail({...email, error: validationErrors.emailError});
      setPassword({...password, error: validationErrors.passwordError});
      setUserName({...userName, error: validationErrors.userNameError});
      setConfirmPassword({
        ...confirmPassword,
        error: validationErrors.confirmPasswordError,
      });
    } else {
      navigation.navigate('PhoneNumber', {
        item: {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          firstName: firstName.value,
          email: email.value,
          password: password.value,
          userName: userName.value,
        },
      });
    }
  };

  const handleFirstNameBlur = () => {
    setfirstNameFocus(true);

    const validationError = nameValidator(firstName.value, 'First name');

    setfirstName({...firstName, error: validationError});
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

  const handleEmailBlur = () => {
    setEmailFocus(true);

    const validationError = emailValidator(email.value);
    setEmail({...email, error: validationError});
  };

  const handleUsernameBlur = () => {
    setUserNameFocus(true);

    const validationError = nameValidator(userName.value, 'Username');
    setUserName({...userName, error: validationError});
  };

  const facebookLogin = () => {
    Auth.federatedSignIn({provider: 'Facebook'} as FederatedSignInOptions);
  };

  const googleLogin = () => {
    Auth.federatedSignIn({provider: 'Google'} as FederatedSignInOptions);
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
            <Text style={styles.createText}>Create account</Text>
            <Text style={styles.create}>Create your personal account</Text>
          </View>

          <TextInputs
            label="First name"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Enter your first name"
            value={firstName.value}
            onChangeText={text => setfirstName({value: text, error: ''})}
            error={!!firstName.error}
            errorText={firstName.error}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="familyName"
            keyboardType="name-phone-pad"
            onFocus={() => setfirstNameFocus(true)}
            onBlur={handleFirstNameBlur}
            style={{
              backgroundColor: firstNameFocus ? '#FFFFFF' : '#EEEFEF',
              marginTop: 34,
            }}
          />

          <TextInputs
            label="Email"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Enter your email address"
            value={email.value}
            onChangeText={text => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            onFocus={() => setEmailFocus(true)}
            onBlur={handleEmailBlur}
            style={{
              backgroundColor: emailFocus ? '#FFFFFF' : '#EEEFEF',
            }}
          />

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
            onFocus={() => setfirstNameFocus(true)}
            onBlur={handleUsernameBlur}
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

          <TextInputs
            label="Confirm Password"
            returnKeyType="done"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Confirm your password"
            value={confirmPassword.value}
            onChangeText={text => setConfirmPassword({value: text, error: ''})}
            error={!!confirmPassword.error}
            errorText={confirmPassword.error}
            secureTextEntry={confirmEntry}
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
                    onPress={() => setConfirmEntry(prev => !prev)}>
                    <Ionicons
                      name={confirmEntry ? 'eye-outline' : 'eye-off-outline'}
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
              label="CONTINUE"
              onPress={() => _onRegisterPressed()}
            />
          </View>

          <View style={styles.OR}>
            <View style={styles.firstLine}></View>
            <Text style={styles.option}>or</Text>
            <View style={styles.secondLine}></View>
          </View>

          <View style={styles.socialButtonWrap}>
            <GoogleButton
              disabled={false}
              label="Continue with google"
              onPress={googleLogin}
            />
            <FacebookButton
              disabled={false}
              label="Continue with facebook"
              onPress={facebookLogin}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateAccount;

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

  option: {
    marginLeft: 2,
    marginRight: 2,
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#333333',
  },

  socialButtonWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 23,
    marginBottom: 50,
  },
});
