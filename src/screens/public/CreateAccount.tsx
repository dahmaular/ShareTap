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
} from '../../core/utils';

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
  const [fullName, setFullName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });

  const [passwordEntry, setPasswordEntry] = useState(true);
  const [confirmEntry, setConfirmEntry] = useState(true);

  const [emailFocus, setEmailFocus] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const {item} = route.params;

  console.log('Create Account Items', item);

  const _onRegisterPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const fullNameError = nameValidator(fullName.value);

    if (emailError || passwordError || fullNameError) {
      setFullName({...fullName, error: fullNameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    navigation.navigate('PhoneNumber', {
      item: {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        fullName: fullName.value,
        email: email.value,
        password: password.value,
      },
    });
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
            label="Username"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Enter your username"
            value={fullName.value}
            onChangeText={text => setFullName({value: text, error: ''})}
            error={!!fullName.error}
            errorText={fullName.error}
            autoCapitalize="none"
            autoCompleteType="name"
            textContentType="familyName"
            keyboardType="name-phone-pad"
            onFocus={() => setFullNameFocus(true)}
            onBlur={() => setFullNameFocus(false)}
            style={{
              backgroundColor: fullNameFocus ? '#FFFFFF' : '#EEEFEF',
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
            onBlur={() => setEmailFocus(false)}
            style={{
              backgroundColor: emailFocus ? '#FFFFFF' : '#EEEFEF',
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
            onBlur={() => setConfirmPasswordFocus(false)}
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

          <View style={styles.socialButtonsWrap}>
            <GoogleButton
              disabled={false}
              label="Continue with google"
              onPress={() => <></>}
            />
            <FacebookButton
              disabled={false}
              label="Continue with facebook"
              onPress={() => <></>}
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

  socialButtonsWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 23,
    marginBottom: 50,
  },
});
