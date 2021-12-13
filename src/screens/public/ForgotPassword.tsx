import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import Header from '../../components/Header';
import ArrowLeft from '../../assets/svg/thin_big_left.svg';
import {BACKGROUND_COLOR} from '../../core/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {UnauthenticatedRoutesParamsList} from '../../types/navigation';
import TextInputs from '../../components/TextInput';
import Button from '../../components/Button';
import {emailValidator, userNameValidator} from '../../core/utils';
import EmailModal from '../../components/EmailModal';
import {forgotPassword} from '../../services/authService';
import {hubDispatch} from '../../core/awsExports';

const {width} = Dimensions.get('screen');

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  UnauthenticatedRoutesParamsList,
  'ForgotPassword'
>;

type ForgotPasswordRouteProp = RouteProp<
  UnauthenticatedRoutesParamsList,
  'ForgotPassword'
>;

type Props = {
  navigation: ForgotPasswordNavigationProp;
  route: ForgotPasswordRouteProp;
};

const ForgotPassword = ({navigation}: Props) => {
  const [userName, setUserName] = useState({value: '', error: ''});
  const [userNameFocus, setUserNameFocus] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const _onRegisterPressed = async () => {
    try {
      const userNameError = userNameValidator(userName.value, 'User Name');

      if (userNameError) {
        setUserName({...userName, error: userNameError});
        return;
      }
      setLoading(true);
      await forgotPassword(userName.value);

      setModal(true);
    } catch (error: any) {
      hubDispatch('alert', {type: 'error', text: error.message});
    } finally {
      setLoading(false);
    }
  };

  const handleUserNameBlur = () => {
    setUserNameFocus(true);

    const validationError = userNameValidator(userName.value, 'Userame');
    setUserName({...userName, error: validationError});
  };

  return (
    <View style={{flex: 1}}>
      {modal && (
        <EmailModal
          visible={modal}
          onBackButtonPress={() => setModal(true)}
          onBackdropPress={() => setModal(true)}
          onClose={() => setModal(false)}
          navigation={navigation}
          userName={userName.value}
        />
      )} 
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
            <Text style={styles.createText}>Forgot password</Text>
            <Text style={styles.create}>Enter your username</Text>
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
            // autoCompleteType="email"
            // textContentType="emailAddress"
            // keyboardType="email-address"
            autoCompleteType='username'
            keyboardType='name-phone-pad'
            textContentType='nickname'
            onFocus={() => setUserNameFocus(true)}
            onBlur={handleUserNameBlur}
            style={{
              backgroundColor: userNameFocus ? '#FFFFFF' : '#EEEFEF',
              marginTop: 34,
            }}
          />

          <View style={styles.buttonView}>
            <Button
              disabled={false}
              loading={loading}
              label="CONTINUE"
              onPress={() => _onRegisterPressed()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ForgotPassword;

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

  buttonView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 200,
  },
});
