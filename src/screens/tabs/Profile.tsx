/* eslint-disable no-empty */ /* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  DrawerActions,
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {TextInput} from 'react-native-paper';

import Photo from '../../assets/svg/photo-camera.svg';
import Gallery from '../../assets/svg/image-gallery.svg';
import {
  AuthenticatedRoutesParamsList,
  TabNavigatorParamsList,
} from '../../types/navigation';
import TextInputs from '../../components/TextInput';
import Header from '../../components/Header';
import Menu from '../../assets/svg/menu.svg';
import Pencil from '../../assets/svg/pencil.svg';
import Settings from '../../assets/svg/settings.svg';
import Bggroup from '../../assets/svg/bg-group.svg';
import Camera from '../../assets/svg/camera.svg';
import PImageBg from '../../assets/svg/profile-image-bg.svg';
import Location from '../../assets/svg/location.svg';
import Twitter from '../../assets/svg/twitter-colored.svg';
import Facebook from '../../assets/svg/facebook.svg';
import TapLogo from '../../assets/svg/Tapiolla-Full-Icon.svg';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import DateSelect from '../../components/DatePicker';
import moment, {now} from 'moment';
import YearSelect from '../../components/ProfileYearPicker';
import {
  createUserBusinessProfile,
  getPresignedUrlUploadService,
  getUserIdService,
  getUserProfileService,
  listUserBusinessProfilesService,
  listUserCardsService,
  updateUserProfileService,
} from '../../services/userService';
import {userSlice} from '../../selectors';
import {Avatar} from 'react-native-paper';
import {CameraOptions, ImageLibraryOptions} from '../../types/imageTypes';
import {getS3presignedURL, uploadImageNew} from '../../services/storageService';
import Button from '../../components/Button';

const DEFAULT_OPTIONS: ImageLibraryOptions & CameraOptions = {
  mediaType: 'photo',
  quality: 0.5,
  maxWidth: 500,
  maxHeight: 500,
  includeBase64: true,
  cameraType: 'back',
  saveToPhotos: false,
};

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Profile'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

const {width, height} = Dimensions.get('screen');
let imgeBgUrl: string | null | undefined;
let avatarUrl: string | null | undefined;

interface profilePictureProps {
  uri: string | undefined;
  type: string | undefined;
}

const Profile = ({navigation}: Props) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [businessProfile, setBusinessProfile] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAv, setIsLoadingAv] = useState(false);
  const [isLoadingBg, setIsLoadingBg] = useState(false);
  const [userCards, setUserCards] = useState<any>([]);
  const [url, setUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [profileModal, setProfileModal] = useState(false);
  const [twitterModal, setTwitterModal] = useState(false);
  const [facebookModal, setFacebookModal] = useState(false);
  const [role, setRole] = useState({value: '', error: ''});
  const [twitter, setTwitter] = useState({value: '', error: ''});
  const [facebook, setFacebook] = useState({value: '', error: ''});
  const [organisation, setOrganisation] = useState({value: '', error: ''});
  const [bgImage, setBgImage] = useState({
    value: '',
    error: '',
  });
  const [avatar, setAvatar] = useState({value: '', error: ''});
  const [biography, setBiography] = useState({
    value: '',
    error: '',
  });
  const [firstName, setFirstName] = useState({value: '', error: ''});
  const [lName, setLName] = useState({value: '', error: ''});
  const [location, setLocation] = useState({value: '', error: ''});
  const [selectStartDate, setSelectedStartDate] = useState(
    moment(new Date()).format('l'),
  );
  const [selectEndDate, setSelectedEndDate] = useState(
    moment(new Date()).format('l'),
  );
  const [pickerModal, setPickerModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [imageDefault, setImageDefault] = useState('');
  const [defaultAvatar, setDefaultAvatar] = useState('');
  const [editBio, setEditBio] = useState(false);
  const [biographyFocus, setBiographyFocus] = useState(false);
  const [bioModal, setBioModal] = useState(false);

  const getProfile = (id: any) => {
    getUserProfileService(id).then(profil => {
      setUserProfile(profil.data.getUserProfile?.userDetails);
      setBusinessProfile(profil.data.getUserProfile?.userBusinessProfiles);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      // setIsLoading(true);
      getUserIdService()
        .then(id => {
          setUserId(id);
          getProfile(id);
          getUserCards(id);
        })
        .catch(e => {
          throw e;
        });
    }, []),
  );

  const getUserCards = (id: any) => {
    listUserCardsService(id)
      .then(card => {
        setUserCards(card.data?.cards);
      })
      .catch(e => {
        throw e;
      });
  };

  const dispatch = useDispatch();

  const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

  const onPress = async (type: any) => {
    await setPickerModal(false);
    if (Platform.OS == 'ios') {
      await delay(1000);
    }
    type === 'capture'
      ? launchCamera(DEFAULT_OPTIONS, async response => {
          if (response.didCancel) {
          } else if (response.errorCode) {
          } else if (response.assets) {
            await handleImageUpload(
              response.assets[0].uri as string,
              response.assets[0].type as string,
            );
          }
        })
      : launchImageLibrary(DEFAULT_OPTIONS, async response => {
          if (response.didCancel) {
          } else if (response.errorCode) {
          } else if (response.assets) {
            await handleImageUpload(
              response.assets[0].uri as string,
              response.assets[0].type as string,
            );
          }
        });
  };

  const onPressAvatar = async (type: any) => {
    await setAvatarModal(false);
    if (Platform.OS == 'ios') {
      await delay(1000);
    }
    type === 'capture'
      ? launchCamera(DEFAULT_OPTIONS, async response => {
          if (response.didCancel) {
          } else if (response.errorCode) {
          } else if (response.assets) {
            await handleImageUploadAvatar(
              response.assets[0].uri as string,
              response.assets[0].type as string,
            );
          }
        })
      : launchImageLibrary(DEFAULT_OPTIONS, async response => {
          if (response.didCancel) {
          } else if (response.errorCode) {
          } else if (response.assets) {
            await handleImageUploadAvatar(
              response.assets[0].uri as string,
              response.assets[0].type as string,
            );
          }
        });
  };

  const handleImageUpload = async (uri: string, type: string) => {
    setIsLoadingBg(true);
    const data = {
      key: new Date().getTime().toString(),
      type: type.replace('image/', ''),
    };

    const uploadPresignedUrl: any = await getS3presignedURL(data);
    const upload = {
      uri: uri,
    };

    const imageUrl = await uploadImageNew(uploadPresignedUrl, upload.uri, type);
    const imageStr = `${imageUrl.url.split('?')[0]}`;
    setImageDefault(imageStr);
    imgeBgUrl = imageStr;
    onSubmit();
  };

  const handleImageUploadAvatar = async (uri: string, type: string) => {
    setIsLoadingAv(true);
    const data = {
      key: new Date().getTime().toString(),
      type: type.replace('image/', ''),
    };

    const uploadPresignedUrl: any = await getS3presignedURL(data);
    const upload = {
      uri: uri,
    };

    const imageUrl = await uploadImageNew(uploadPresignedUrl, upload.uri, type);
    const imageStr = `${imageUrl.url.split('?')[0]}`;
    avatarUrl = imageStr;
    onSubmit();
  };

  const launchCameraModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.bottomModal}
        isVisible={pickerModal}
        onBackdropPress={() => setPickerModal(false)}
        onBackButtonPress={() => setPickerModal(false)}>
        <View style={styles.modal}>
          <View style={styles.cameraGallery}>
            <TouchableOpacity
              style={styles.centerColumn}
              onPress={() => onPress('library')}>
              <Gallery width={40} height={30} />
              <Text style={styles.textCam}>Library</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPress('capture')}
              style={styles.centerColumn}>
              <Photo width={40} height={30} />
              <Text style={styles.textCam}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const launchAvatarModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.bottomModal}
        isVisible={avatarModal}
        onBackdropPress={() => setAvatarModal(false)}
        onBackButtonPress={() => setAvatarModal(false)}>
        <View style={styles.modal}>
          <View style={styles.cameraGallery}>
            <TouchableOpacity
              style={styles.centerColumn}
              onPress={() => onPressAvatar('library')}>
              <Gallery width={40} height={30} />
              <Text style={styles.textCam}>Library</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPressAvatar('capture')}
              style={styles.centerColumn}>
              <Photo width={40} height={30} />
              <Text style={styles.textCam}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const chooseFile = () => {
    setPickerModal(true);
  };

  const chooseAvatar = () => {
    setAvatarModal(true);
  };

  const submitProfile = async () => {
    setIsLoading(true);
    const data = {
      companyName: organisation.value,
      role: role.value,
      category: 'Health',
      startDate: selectStartDate,
      endDate: selectEndDate,
      userId: userId,
    };
    await createUserBusinessProfile(data).then(res => {
      getProfile(userId);
      setIsLoading(false);
      setProfileModal(false);
      setRole({value: '', error: ''});
      setOrganisation({value: '', error: ''});
    });
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
      biography: !biography.value ? userProfile?.biography : biography.value,
    };
    await updateUserProfileService(data).then(res => {
      getProfile(userId);
      setIsLoading(false);
      setIsLoadingAv(false);
      setIsLoadingBg(false);
      setTwitterModal(false);
      setFacebookModal(false);
    });
  };

  const UserProfile = () => {
    return (
      <>
        {businessProfile?.map((item: any, index: number) => {
          const sep = item.startDate.split('/');
          const startYear = sep[2];
          const splt = item.endDate.split('/');
          const endYear = splt[2];
          const result = userCards?.filter(
            (uc: any) => uc.cardDetails.role === item?.role,
          );
          return (
            <View key={index}>
              <View style={styles.userProfile}>
                <View style={styles.profileRole}>
                  <TapLogo style={styles.logo} />
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.roleText}>{item.role}</Text>
                      <Text style={styles.roleCardNo}>
                        {result?.length +
                          `${result?.length > 1 ? ' cards' : ' card'}`}
                      </Text>
                    </View>
                    <Text style={styles.POrganText}>{item.companyName}</Text>
                    <Text style={styles.POrganText}>
                      {startYear}-{endYear}
                    </Text>
                  </View>
                </View>
                <View style={styles.btnView}>
                  <TouchableOpacity
                    style={styles.addCardBtn}
                    onPress={() => navigation.navigate('CreateCard')}>
                    <Text style={styles.profileBtnText}>Add card</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.line}></View>
            </View>
          );
        })}
      </>
    );
  };

  const addProfileModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.resultsBottomModal}
        isVisible={profileModal}
        onBackdropPress={() => setProfileModal(false)}
        onBackButtonPress={() => setProfileModal(false)}>
        <TouchableOpacity
          onPress={() => setProfileModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.resultsModal}>
          <View style={styles.modalHeader}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.searchResultText}>Add Position </Text>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={styles.searchResultNote}>
                Add more roles *********
              </Text>
            </View>
          </View>
          <TextInputs
            label="Role"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Add role"
            autoCapitalize="none"
            value={role.value}
            // onFocus={() => setWebsiteFocus(true)}
            onChangeText={text => {
              setRole({value: text, error: ''});
            }}
            style={styles.socialInputs}
          />
          <TextInputs
            label="Organization"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Add organization"
            value={organisation.value}
            // onFocus={() => setTwitterFocus(true)}
            onChangeText={text => {
              setOrganisation({value: text, error: ''});
            }}
            style={styles.socialInputs}
          />
          <View style={styles.dateView}>
            <View style={styles.startDate}>
              <Text style={styles.dateText}>Start Date</Text>
              <YearSelect
                name="doe"
                placeholder="Start date"
                dateValue={moment(selectStartDate).format('l')}
                onValueChange={(itemValue: any) => {
                  setSelectedStartDate(itemValue);
                }}
              />
            </View>
            <View style={styles.endDate}>
              <Text style={styles.dateText}>Present</Text>
              <YearSelect
                name="doe"
                placeholder="Present"
                dateValue={moment(selectEndDate).format('l')}
                onValueChange={(itemValue: any) => {
                  setSelectedEndDate(itemValue);
                }}
              />
            </View>
          </View>
          {role.value === '' || organisation.value === '' ? (
            <TouchableOpacity style={styles.modalButtonInactive}>
              <Text style={styles.modalBtnText}>CONFIRM</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => submitProfile()}>
              {isLoading ? (
                <ActivityIndicator
                  size={'small'}
                  color={'white'}
                  animating={true}
                />
              ) : (
                <Text style={styles.modalBtnText}>CONFIRM</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  };

  const addTwitterModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.resultsBottomModal}
        isVisible={twitterModal}
        onBackdropPress={() => setTwitterModal(false)}
        onBackButtonPress={() => setTwitterModal(false)}>
        <TouchableOpacity
          onPress={() => setTwitterModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.socialModalBody}>
          <View style={styles.modalHeader}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.searchResultText}>Link your Twitter </Text>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={styles.searchResultNoteSocial}>
                Link your Twitter profile to easily find people you follow on
                Tapiolla
              </Text>
            </View>
          </View>
          <TextInputs
            label="Twitter Handle"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Twitter Handle"
            autoCapitalize="none"
            value={twitter.value}
            // onFocus={() => setWebsiteFocus(true)}
            onChangeText={text => {
              setTwitter({value: text, error: ''});
            }}
            style={styles.socialInputs}
          />

          <TouchableOpacity
            style={
              twitter.value !== ''
                ? styles.modalButton
                : styles.modalButtonInactive
            }
            onPress={() => onSubmit()}>
            {isLoading ? (
              <ActivityIndicator
                size={'small'}
                color={'white'}
                animating={true}
              />
            ) : (
              <Text style={styles.modalBtnText}>LINK TWITTER</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const addFacebookModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.resultsBottomModal}
        isVisible={facebookModal}
        onBackdropPress={() => setFacebookModal(false)}
        onBackButtonPress={() => setFacebookModal(false)}>
        <TouchableOpacity
          onPress={() => setFacebookModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.socialModalBody}>
          <View style={styles.modalHeader}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.searchResultText}>Link your Facebook </Text>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={styles.searchResultNoteSocial}>
                Link your Facebook profile to easily find people you follow on
                Tapiolla
              </Text>
            </View>
          </View>
          <TextInputs
            label="Facebook Handle"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Facebook Handle"
            autoCapitalize="none"
            value={facebook.value}
            // onFocus={() => setWebsiteFocus(true)}
            onChangeText={text => {
              setFacebook({value: text, error: ''});
            }}
            style={styles.socialInputs}
          />

          <TouchableOpacity
            style={
              facebook.value !== ''
                ? styles.modalButton
                : styles.modalButtonInactive
            }
            onPress={() => onSubmit()}>
            {isLoading ? (
              <ActivityIndicator
                size={'small'}
                color={'white'}
                animating={true}
              />
            ) : (
              <Text style={styles.modalBtnText}>LINK FACEBOOK</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const AlertModal = () => {
    return (
      <View style={styles.alertModalView}>
        <View
          style={{
            backgroundColor: '#333333',
            width: '80%',
            height: 35,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Account added successfully</Text>
        </View>
      </View>
    );
  };

  const AlertErrorModal = () => {
    return (
      <View style={styles.alertModalView}>
        <View
          style={{
            backgroundColor: '#333333',
            width: '80%',
            height: 35,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Account added successfully</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {profileModal && addProfileModal()}
      {pickerModal && launchCameraModal()}
      {avatarModal && launchAvatarModal()}
      {twitterModal && addTwitterModal()}
      {facebookModal && addFacebookModal()}
      <Header
        title="PROFILE"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Menu />}
        leftOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        rightSvg={<Settings />}
        rightOnPress={() => <></>}
      />
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.profileContainer}>
            <View style={styles.rect}>
              {isLoadingBg ? (
                <ActivityIndicator
                  size={'small'}
                  color={'white'}
                  animating={true}
                />
              ) : (
                <>
                  {userProfile?.backgroundImage ? (
                    <Image
                      style={{width, height: 120}}
                      source={{
                        uri: userProfile?.backgroundImage,
                      }}
                    />
                  ) : (
                    <Bggroup />
                  )}
                </>
              )}

              <View style={styles.bgView}>
                <TouchableOpacity
                  style={styles.dashboardView}
                  onPress={() => navigation.navigate('Dashboard')}>
                  <Text style={styles.dashboardText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bgCamera} onPress={chooseFile}>
                  <Camera />
                </TouchableOpacity>
                <Text style={styles.bgText}>
                  {userProfile?.backgroundImage ? '' : 'Add background image'}
                </Text>
              </View>
            </View>
            <View style={styles.proImageView}>
              <View style={styles.pImageBg}>
                {userProfile?.avatar ? (
                  <>
                    {isLoadingAv ? (
                      <ActivityIndicator
                        size={'small'}
                        color={'white'}
                        animating={true}
                      />
                    ) : (
                      <Avatar.Image
                        size={98}
                        // style={{width, height: 120}}
                        source={{
                          uri: userProfile?.avatar,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {isLoadingAv ? (
                      <ActivityIndicator
                        size={'small'}
                        color={'white'}
                        animating={true}
                      />
                    ) : (
                      <PImageBg />
                    )}
                  </>
                )}
              </View>
              <TouchableOpacity
                style={styles.profCamera}
                onPress={chooseAvatar}>
                <Camera />
              </TouchableOpacity>
            </View>
            <View style={styles.name}>
              <Text style={styles.username}>
                {userProfile?.firstName ? userProfile?.firstName : 'Charles'}{' '}
                {userProfile?.lastName ? userProfile?.lastName : 'Hudson'}
              </Text>
              <View style={styles.locationView}>
                <Location />
                <Text style={styles.location}>
                  {userProfile?.location
                    ? userProfile?.location
                    : 'Lagos, Nigeria'}
                </Text>
              </View>
            </View>
            <View style={styles.locationView}>
              <TouchableOpacity
                style={styles.socialView}
                onPress={() => setTwitterModal(true)}>
                <Twitter />
                <Text
                  style={styles.twitter}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {userProfile?.twitter ? userProfile?.twitter : 'Add Twitter'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialView}
                onPress={() => setFacebookModal(true)}>
                <Facebook />
                <Text
                  style={styles.facebook}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {userProfile?.facebook
                    ? userProfile?.facebook
                    : 'Add Facebook'}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Bio /> */}
            <View style={styles.about}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.aboutHeading}>
                  About {userProfile?.firstName ? userProfile?.firstName : ''}
                </Text>
                <TouchableOpacity
                  onPress={() => setEditBio(!editBio)}
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 10,
                    width: 50,
                  }}>
                  <Pencil />
                </TouchableOpacity>
              </View>

              {editBio ? (
                <>
                  <View>
                    <TextInput
                      multiline={true}
                      numberOfLines={5}
                      value={biography.value}
                      autoFocus={true}
                      scrollEnabled={true}
                      textAlignVertical="top"
                      onFocus={() => setBiographyFocus(true)}
                      onChangeText={text => {
                        setBiography({value: text, error: ''});
                      }}
                      style={{
                        ...styles.aboutText,
                        height: 90,
                        backgroundColor: 'white',
                        borderWidth: 0,
                        borderBottomWidth: 0,
                      }}
                    />
                  </View>

                  <TouchableOpacity
                    style={{
                      width: 70,
                      height: 22,
                      // flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2.5,
                      borderWidth: 1,
                      borderColor: '#316F8A',
                    }}
                    onPress={() => {
                      onSubmit();
                      setEditBio(false);
                    }}>
                    <Text style={styles.profileBtnText}>Add Bio</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text style={styles.aboutText}>
                  {userProfile?.biography === ''
                    ? 'A eget phasellus maecenas vitae et ultrices non. Ilsa Praesent diam faucibus vel eget ipsum mus lacus.ilsa Proin volutpat urna, congue diam quam mi est ilsa pharetra. Dignissim tris.'
                    : userProfile?.biography}
                </Text>
              )}
            </View>
            <View style={styles.profileView}>
              <Text style={styles.profileText}>Profile</Text>
              <TouchableOpacity
                style={styles.addProfileBtn}
                onPress={() => setProfileModal(true)}>
                <Text style={styles.profileBtnText}>+ Add position</Text>
              </TouchableOpacity>
            </View>
            <UserProfile />
            {/* <AlertModal /> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  alertModalView: {
    // flex: 1,
    position: 'absolute',
    marginTop: 10,
    width,
  },
  profileContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    marginBottom: 70,
    // paddingHorizontal: 15,
  },
  rect: {
    marginTop: 15,
    backgroundColor: '#D1D1D1',
    width: '100%',
    height: 120,
  },
  bgView: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '93%',
  },
  dashboardView: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    padding: 7,
    marginTop: -10,
    position: 'absolute',
    borderRadius: 5,
  },
  dashboardText: {
    fontFamily: 'Poppins',
    color: 'white',
    fontSize: 12,
    margin: 3,
  },
  bgCamera: {
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 50,
  },
  bgText: {
    fontFamily: 'Poppins',
  },
  proImageView: {
    marginTop: height / 8.4,
    backgroundColor: '#D1D1D1',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profCamera: {
    left: 70,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 50,
    elevation: 2,
    position: 'absolute',
    top: 70,
  },
  pImageBg: {
    // marginTop: 5,
  },
  name: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: height / 12,
  },
  username: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    color: 'rgba(51, 51, 51, 0.51)',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    margin: 5,
  },
  twitter: {
    color: 'rgba(51, 51, 51, 0.51)',
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: 'normal',
    marginLeft: 5,
    width: 60,
  },
  facebook: {
    color: 'rgba(51, 51, 51, 0.51)',
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: 'normal',
    marginLeft: 5,
    width: 60,
  },
  socialView: {
    flexDirection: 'row',
    marginTop: 10,
    margin: 20,
    alignItems: 'center',
  },
  about: {
    padding: 20,
  },
  aboutHeading: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
  },
  aboutText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 10,
  },
  profileView: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  profileText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
  },
  addProfileBtn: {
    width: 90,
    height: 22,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: '#316F8A',
    marginLeft: width / 1.8,
  },
  profileBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },
  userProfile: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  profileRole: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 10,
  },
  roleText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  roleCardNo: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    color: '#316F8A',
    backgroundColor: '#E1EEF4',
    marginLeft: width / 4,
    padding: 2,
    position: 'absolute',
  },
  POrganText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(51, 51, 51, 0.51)',
    lineHeight: 15,
  },
  btnView: {
    width: 100,
    // padding: 10,
    position: 'absolute',
    marginLeft: width / 1.3,
  },
  addCardBtn: {
    width: 60,
    height: 22,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: '#316F8A',
    // position: 'relative',
  },
  line: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },

  //profile modal
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    color: '#292929',
    fontStyle: 'normal',
    marginTop: 10,
    textAlign: 'center',
  },

  dateView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
  },

  dateText: {
    padding: 5,
    color: 'rgba(90, 89, 89, 0.55)',
  },
  startDate: {width: '45%', marginRight: 30},
  endDate: {width: '45%'},

  resultsBottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modalCloseBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },

  resultsModal: {
    width: '100%',
    height: 400,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 30,
  },

  socialModalBody: {
    width: '100%',
    height: 280,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 30,
  },

  modalHeader: {
    width: '100%',
    marginTop: 23,
  },

  modalContent: {
    width: '100%',
  },

  searchResultText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#316F8A',
  },
  optionalText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'rgba(51, 51, 51, 0.51)',
  },

  searchResultNote: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#8C8C8C',
  },

  searchResultNoteSocial: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#8C8C8C',
    width: '80%',
    lineHeight: 18,
  },

  socialInputs: {
    backgroundColor: '#EEEFEF',
    marginBottom: -5,
    height: 43,
  },

  modalButtonInactive: {
    height: 63,
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 0,
  },

  modalButton: {
    height: 63,
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    bottom: 0,
  },

  modalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 22,
    marginBottom: 22,
    width: '100%',
    flexDirection: 'row',
  },

  connectLine: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  connect: {
    width: 86,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#316F8A',
    borderRadius: 2,
  },

  flatList: {width: '100%', marginBottom: 40, marginTop: 40},

  connectName: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
  },

  connectText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#316F8A',
  },
  eyeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modal: {
    width: '100%',
    height: 120,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderTopRightRadius: 23,
    borderTopLeftRadius: 23,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  cameraGallery: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  centerColumn: {flexDirection: 'column', alignItems: 'center'},

  textCam: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    color: '#A8A8A8',
    marginTop: 5,
  },
});
