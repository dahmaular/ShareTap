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
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {UnauthenticatedRoutesParamsList} from '../../types';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Message from '../../assets/svg/message-icon.svg';
import TextInputs from '../../components/TextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-paper';
import Button from '../../components/Button';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';
import Modal from 'react-native-modal';
import EmailModal from '../../components/EmailModal';

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

const ForgotPassword = ({navigation, route}: Props) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [emailFocus, setEmailFocus] = useState(false);
  const [modal, setModal] = useState(false);

  const _onRegisterPressed = () => {
    setModal(true);
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
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
          email={email.value}
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
            <Text style={styles.create}>Enter your email address</Text>
          </View>

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
              marginTop: 34,
            }}
          />

          <View style={styles.buttonView}>
            <Button
              disabled={false}
              loading={false}
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
