/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  ActivityIndicator,
  //   TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import TextInputs from '../../components/TextInput';
import Back from '../../assets/svg/back.svg';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Noctivity from '../../assets/svg/noFile.svg';
import Card from '../../components/Card';
import DashboardCard from '../../components/DashboardCard';
import DashboardHeader from '../../components/DashboardHeader';
import {
  getUserIdService,
  getUserProfileService,
  listUserCardsService,
  updateUserProfileService,
} from '../../services/userService';
import {ScrollView} from 'react-native-gesture-handler';
import {PRIMARY_COLOR} from '../../core/color';
import {TextInput} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
let imgeBgUrl: string | null | undefined;
let avatarUrl: string | null | undefined;

const EditProfile = ({navigation}) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState({value: '', error: ''});
  const [firstName, setFirstName] = useState({value: '', error: ''});
  const [lName, setLName] = useState({value: '', error: ''});
  const [location, setLocation] = useState({value: '', error: ''});
  const [bio, setBio] = useState({value: '', error: ''});
  const [twitter, setTwitter] = useState({value: '', error: ''});
  const [facebook, setFacebook] = useState({value: '', error: ''});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserIdService()
      .then(id => {
        // console.log('Id is here', id);
        setUserId(id);
      })
      .catch(e => console.log(e));
  }, []);

  const getProfile = (id: any) => {
    getUserProfileService(id).then(profil => {
      // console.log('User profile', profil.data.getUserProfile?.userDetails);
      setUserProfile(profil.data.getUserProfile?.userDetails);
    });
  };

  useEffect(() => {
    getProfile(userId);
  }, [userId]);

  const handleChange = (text: string) => {
    setFullName({value: text, error: ''});
    const name = text.split(' ');
    setFirstName({value: name[0], error: ''});
    setLName({value: name[1], error: ''});
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const data = {
      id: userId,
      backgroundImage: !imgeBgUrl ? userProfile.backgroundImage : imgeBgUrl,
      avatar: !avatarUrl ? userProfile.avatar : avatarUrl,
      firstName: !firstName.value ? userProfile?.firstName : firstName.value,
      lastName: !lName.value ? userProfile.lastName : lName.value,
      location: !location.value ? userProfile?.location : location.value,
      twitter: !twitter.value ? userProfile?.twitter : twitter.value,
      facebook: !facebook.value ? userProfile?.facebook : facebook.value,
      biography: !bio.value ? userProfile?.biography : bio.value,
    };
    // console.log('profile data', data);
    await updateUserProfileService(data).then(res => {
      console.log(res.data);
      getProfile(userId);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      <DashboardHeader
        bgColor="#316F8A"
        titleColor="#FFFFFF"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        title="Edit Profile"
      />
      <ScrollView>
        <View style={styles.body}>
          <TextInputs
            label="Full Name"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder={
              userProfile?.firstName
                ? `${userProfile?.firstName} ${userProfile?.lastName}`
                : 'Charles Hudson'
            }
            value={fullName.value}
            onChangeText={text => handleChange(text)}
            // autoCapitalize="none"
            autoCompleteType="name"
            textContentType="familyName"
            keyboardType="name-phone-pad"
            style={{
              backgroundColor: '#EEEFEF',
              height: 50,
            }}
          />
          <TextInput
            label="Bio"
            multiline={true}
            numberOfLines={10}
            textAlignVertical="top"
            scrollEnabled={true}
            underlineColor="white"
            outlineColor="#000000"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder={
              userProfile?.biography ? userProfile?.biography : 'Falling Deep'
            }
            value={bio.value}
            onChangeText={text => setBio({value: text, error: ''})}
            style={{
              backgroundColor: '#EEEFEF',
              height: 120,
              borderColor: '#000000',
              borderWidth: 1,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
          <TextInputs
            label="Location"
            returnKeyType="next"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder={
              userProfile?.location ? userProfile?.location : 'Lagos Nigeria'
            }
            value={location.value}
            onChangeText={text => setLocation({value: text, error: ''})}
            // autoCapitalize="none"
            autoCompleteType="name"
            textContentType="familyName"
            keyboardType="name-phone-pad"
            style={{
              backgroundColor: '#EEEFEF',
              height: 50,
            }}
          />
        </View>
        <View style={{position: 'relative'}}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => onSubmit()}>
            {isLoading ? (
              <ActivityIndicator
                size={'small'}
                color={'white'}
                animating={true}
              />
            ) : (
              <Text style={styles.modalBtnText}>SAVE CHANGES</Text>
            )}
          </TouchableOpacity>
          {/* )} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: height / 4,
  },
  aboutText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 10,
  },
  modalButton: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    bottom: 0,
    borderRadius: 2,
  },
  modalButtonInactive: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 0,
    borderRadius: 2,
  },

  modalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
