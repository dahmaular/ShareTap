/* eslint-disable react-hooks/exhaustive-deps */ /* eslint-disable prettier/prettier */
import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import TextInputs from '../../components/TextInput';
import {TextInput} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

import LottieView from 'lottie-react-native';
import Header from '../../components/Header';
import Back from '../../assets/svg/back.svg';
import More from '../../assets/svg/more.svg';
import Plus from '../../assets/svg/add_black_24dp (6) 1.svg';
import Dividers from '../../assets/svg/Line.svg';
import Delete from '../../assets/svg/coolicon.svg';
import Duplicate from '../../assets/svg/duplicate.svg';
import Tex from '../../assets/svg/text.svg';
import Social from '../../assets/svg/social.svg';
import Draft from '../../assets/svg/draft.svg';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import AngleDown from '../../assets/svg/angle_down.svg';
import Left from '../../assets/svg/left.svg';
import Center from '../../assets/svg/center.svg';
import Right from '../../assets/svg/right.svg';
import Play from '../../assets/svg/play.svg';
import Download from '../../assets/svg/download.svg';
import Suc from '../../assets/svg/suc.svg';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import RNPickerSelect from 'react-native-picker-select';
import Card from '../../components/Card';
import {userSlice} from '../../selectors';
import CardTemplate from '../../components/CardTemplate';
import CreateCardHeader from '../../components/CreateCardHeader';
import {
  createCardTemplateService,
  createUserCard,
  listCardsByBusinessProfileIdService,
} from '../../services/cardService';
import {
  createDraftService,
  getUserIdService,
  listDraftService,
  listUserBusinessProfilesService,
  listUserCardTemplateService,
} from '../../services/userService';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const deviceHeight = Dimensions.get('window').height;
let id: number;
let idColor: any;
let template: any;

interface profileProps {
  label: string;
  value: string;
}

interface bussinessPId {
  id: string;
}

const social = {
  websiteIcon: '',
  twitterIcon: '',
  facebookIcon: '',
  linkedInIcon: '',
};
const cardDetails = [
  {
    name: '',
    role: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    facebook: '',
    linkedIn: '',
    twitter: '',
    cardTemplateId: '',
  },
];

const CreateCard = ({navigation}: any) => {
  const animation = useRef<LottieView>(null);
  const [positionModal, setPositionModal] = useState(true);
  const [templateModal, setTemplateModal] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [position, setPosition] = useState('');
  const [editCard, setEditCard] = useState(false);
  const [socialModal, setSocialModal] = useState(false);
  const [textEditor, setTextEditor] = useState(false);
  const [cardSuccess, setCardSuccess] = useState(false);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 1;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = useRef(new Animated.ValueXY()).current;
  const user = useSelector(userSlice);

  const [website, setWebsite] = useState({value: '', error: ''});
  const [facebook, setFacebook] = useState({value: '', error: ''});
  const [twitter, setTwitter] = useState({value: '', error: ''});
  const [linkedIn, setLinkedIn] = useState({value: '', error: ''});

  const [websiteFocus, setWebsiteFocus] = useState(false);
  const [facebookFocus, setFacebookFocus] = useState(false);
  const [twitterFocus, setTwitterFocus] = useState(false);
  const [linkedInFocus, setLinkedInFocus] = useState(false);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [businessProfile, setBusinessProfile] = useState<profileProps[]>([]);
  const [bizProfi, setBizProfi] = useState<any>(null);
  const [templat, setTemplat] = useState<any>(null);
  const [drafts, setDrafts] = useState<any>(null);
  const [bussinessProfileId, setBussinesProfileId] = useState<bussinessPId>({
    id: '',
  });
  const [bottomColor, setBottomColor] = useState('');
  const [editDraft, setEditDraft] = useState(false);

  // useEffect(() => {
  //   getUserIdService()
  //     .then(id => {
  //       // console.log('Id is here', id);
  //       setUserId(id);
  //     })
  //     .catch(e => console.log(e));
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // setIsLoading(true);
      getUserIdService()
        .then(id => {
          // console.log('Id is here', id);
          setUserId(id);
          fetchBussinessProfile(id);
          listDraftService(id).then(draft => {
            console.log('Card drafts here', draft);
            setDrafts(draft.data);
          });
        })
        .catch(e => console.log(e));
      listUserCardTemplateService()
        .then(temp => {
          template = temp.data.listCardTemplates.cardTemplates;
          setTemplat(temp?.data?.listCardTemplates?.cardTemplates);
          // console.log('Template here', template);
        })
        .catch(e => console.log(e));
    }, []),
  );

  // useEffect(() => {
  //   listUserCardTemplateService()
  //     .then(temp => {
  //       template = temp.data.listCardTemplates.cardTemplates;
  //       setTemplat(temp?.data?.listCardTemplates?.cardTemplates);
  //       // console.log('Template here', template);
  //     })
  //     .catch(e => console.log(e));
  // }, []);

  const fetchBussinessProfile = async (id: any) => {
    await listUserBusinessProfilesService(id).then(bizProf => {
      // console.log('Bussiness profile', bizProf.data?.businessProfiles);
      // roles.push(bizProf.data?.businessProfiles);
      setBizProfi(bizProf.data?.businessProfiles);
      const warefa: any = bizProf.data?.businessProfiles?.map((item, i) => {
        return {
          label: item?.role,
          value: item?.role,
        };
      });
      setBusinessProfile(warefa);
    });
    // console.log('Bis profile', businessProfile);
  };

  // useEffect(() => {
  //   fetchBussinessProfile(userId);
  //   // cardTemplateService;
  // }, [userId]);

  // useEffect(() => {
  //   listDraftService(userId).then(draft => {
  //     console.log('Card drafts here', draft);
  //     setDrafts(draft.data);
  //   });
  // }, [userId, navigation]);

  const cardTemplateService = async () => {
    const data = {
      backgroundColor: 'white',
      borderBottomColor: '#219653',
    };
    await createCardTemplateService(data).then(res => console.log(res.data));
  };

  const submitSocial = () => {
    // social = true;
    if (website.value !== '') {
      social.websiteIcon = 'true';
      cardDetails[0].website = website.value;
    }
    if (twitter.value !== '') {
      social.twitterIcon = 'true';
      cardDetails[0].twitter = twitter.value;
    }
    if (facebook.value !== '') {
      social.facebookIcon = 'true';
      cardDetails[0].facebook = facebook.value;
    }
    if (linkedIn.value !== '') {
      social.linkedInIcon = 'true';
      cardDetails[0].linkedIn = linkedIn.value;
    }
    setSocialModal(false);
  };

  const onPlay = async () => {
    setLoading(true);
    const businessProfileId = bussinessProfileId?.id;
    // console.log(cardDetails[0]);
    const data = {...cardDetails[0], userId, businessProfileId};
    // console.log('This is input', data);
    await createUserCard(data)
      .then(userCard => {
        console.log(userCard.data?.card);
        setCardSuccess(true);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const onSaveDraft = async () => {
    setIsLoading(true);
    const businessProfileId = bussinessProfileId?.id;
    const color = bottomColor;
    // console.log(cardDetails[0]);
    const data = {...cardDetails[0], userId, businessProfileId, color};
    console.log('This is input', data);
    await createDraftService(data)
      .then(draft => {
        // console.log(userCard.data?.card);
        setCardSuccess(true);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const selectPositionModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.bottomModal}
        isVisible={positionModal}
        onBackdropPress={() => setPositionModal(false)}
        onBackButtonPress={() => setPositionModal(false)}>
        <TouchableOpacity
          onPress={() => setPositionModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.modal}>
          <View style={styles.modalContentWrap}>
            <View style={{marginTop: 23}}>
              <Text style={styles.modalTitle}>Create Card</Text>
            </View>

            <View style={{marginTop: 16}}>
              <Text style={styles.modalText}>
                Create card unique to a particular position to
              </Text>
              <Text style={styles.modalText}>easily connect with others.</Text>
            </View>
            <View style={{backgroundColor: '#EFEFEF', marginTop: 20}}>
              <RNPickerSelect
                onValueChange={value => {
                  console.log(value);
                  if (bizProfi) {
                    const pID = bizProfi?.filter(
                      (bId: {role: any}) => bId?.role === value,
                    );
                    setBussinesProfileId({id: pID[0]?.id});
                  }
                  setPosition(value);
                  cardDetails[0].role = value;
                }}
                placeholder={{
                  label: 'Select Position',
                  value: null,
                  color: '#8C8C8C',
                }}
                items={businessProfile ? businessProfile : []}
                useNativeAndroidPickerStyle={false}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                Icon={() => {
                  return (
                    <View
                      style={{
                        marginTop: 10,
                      }}>
                      <AngleDown width={12} height={12} />
                    </View>
                  );
                }}
              />
            </View>

            {/* <View style={styles.searchErrorLottie} /> */}
          </View>
          {position === '' || position === null ? (
            <TouchableOpacity style={styles.modalButtonInactive}>
              <Text style={styles.modalBtnText}>CONTINUE</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                // if (position !== '') {
                setPositionModal(false);
                setTemplateModal(true);
                // }
              }}>
              <Text style={styles.modalBtnText}>CONTINUE</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  };

  const selectTemplateModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.bottomModal}
        isVisible={templateModal}
        onBackdropPress={() => setTemplateModal(false)}
        onBackButtonPress={() => setTemplateModal(false)}>
        <TouchableOpacity
          onPress={() => setTemplateModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.templatemodal}>
          <View style={styles.templatemodalContentWrap}>
            <View style={styles.modalTitleText}>
              <Text style={styles.templatemodalTitle}>Templates</Text>
              <Text style={styles.existingCard}>Existing Cards</Text>
            </View>

            <View style={{marginTop: 16}}>
              <Text style={styles.modalText}>
                Select a template to create a card
              </Text>
            </View>
            {/* Flatlist here */}
            <View style={{height: 270}}>
              <FlatList
                data={templat}
                contentContainerStyle={{paddingVertical: 5}}
                contentInsetAdjustmentBehavior="never"
                snapToAlignment="center"
                decelerationRate="fast"
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item, index) => `${index}-${item}`}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{
                      ...styles.template4,
                      borderBottomColor: item.borderBottomColor,
                    }}
                    onPress={() => {
                      setTemplateModal(false);
                      setEditDraft(false);
                      setEditCard(true);
                      setBottomColor(item.borderBottomColor);
                      idColor = item.borderBottomColor;
                      cardDetails[0].cardTemplateId = item.id;
                    }}></TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const UserCardSlider = () => {
    return (
      <View style={styles.flatlistView}>
        <FlatList
          horizontal
          data={cardDetails}
          contentContainerStyle={{paddingVertical: 5}}
          contentInsetAdjustmentBehavior="never"
          snapToAlignment="center"
          decelerationRate="fast"
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          snapToInterval={boxWidth}
          contentInset={{
            left: halfBoxDistance,
            right: halfBoxDistance,
          }}
          contentOffset={{x: halfBoxDistance * -1, y: 0}}
          onLayout={e => {
            setScrollViewWidth(e.nativeEvent.layout.width);
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: pan.x}}}],
            {
              useNativeDriver: false,
            },
          )}
          onScrollEndDrag={() => console.log('Animation ended')}
          keyExtractor={(item, index) => `${index}-${item}`}
          renderItem={({item, index}) => (
            <CardTemplate
              item={item}
              index={index}
              boxWidth={boxWidth}
              halfBoxDistance={halfBoxDistance}
              pan={pan}
              idColor={idColor}
              social={social}
            />
          )}
        />
      </View>
    );
  };

  const DraftCard = () => {
    return (
      <View style={styles.flatlistView}>
        <FlatList
          horizontal
          data={drafts}
          contentContainerStyle={{paddingVertical: 5}}
          contentInsetAdjustmentBehavior="never"
          snapToAlignment="center"
          decelerationRate="fast"
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          snapToInterval={boxWidth}
          contentInset={{
            left: halfBoxDistance,
            right: halfBoxDistance,
          }}
          contentOffset={{x: halfBoxDistance * -1, y: 0}}
          onLayout={e => {
            setScrollViewWidth(e.nativeEvent.layout.width);
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: pan.x}}}],
            {
              useNativeDriver: false,
            },
          )}
          onScrollEndDrag={() => console.log('Animation ended')}
          keyExtractor={(item, index) => `${index}-${item}`}
          renderItem={({item, index}) => (
            <CardTemplate
              item={item}
              index={index}
              boxWidth={boxWidth}
              halfBoxDistance={halfBoxDistance}
              pan={pan}
              idColor={idColor}
              social={social}
            />
          )}
        />
      </View>
    );
  };

  const socialLinkModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.resultsBottomModal}
        isVisible={socialModal}
        onBackdropPress={() => setSocialModal(false)}
        onBackButtonPress={() => setSocialModal(false)}>
        <TouchableOpacity
          onPress={() => setSocialModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.resultsModal}>
          <View style={styles.modalHeader}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.searchResultText}>Socials </Text>
              <Text style={styles.optionalText}>(Optional)</Text>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={styles.searchResultNote}>
                Link any of your social account to your card
              </Text>
              <Text style={styles.searchResultNote}>
                to connect with others
              </Text>
            </View>
          </View>
          <TextInputs
            label="Website"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Add Website Link"
            autoCapitalize="none"
            value={website.value}
            onFocus={() => setWebsiteFocus(true)}
            onChangeText={text => {
              setWebsite({value: text, error: ''});
            }}
            style={styles.socialInputs}
          />
          <TextInputs
            label="Twitter"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Twitter Handle"
            value={twitter.value}
            onFocus={() => setTwitterFocus(true)}
            onChangeText={text => {
              setTwitter({value: text, error: ''});
            }}
            style={styles.socialInputs}
          />
          <TextInputs
            label="Facebook"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="Facebook Handle"
            value={facebook.value}
            onFocus={() => setFacebookFocus(true)}
            onChangeText={text => {
              setFacebook({value: text, error: ''});
            }}
            style={styles.socialInputs}
          />
          <TextInputs
            label="LinkedIn"
            placeholderTextColor="rgba(90, 89, 89, 0.55)"
            placeholder="LinkedIn Account"
            value={linkedIn.value}
            onFocus={() => setLinkedInFocus(true)}
            onChangeText={text => {
              setLinkedIn({value: text, error: ''});
            }}
            style={styles.socialInputs}
          />
          {website.value !== '' ||
          twitter.value !== '' ||
          facebook.value !== '' ||
          linkedIn.value !== '' ? (
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => submitSocial()}>
              <Text style={styles.modalBtnText}>CONTINUE</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.modalButtonInactive}>
              <Text style={styles.modalBtnText}>CONTINUE</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  };

  const textEditorModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.editorBottomModal}
        isVisible={textEditor}
        onBackdropPress={() => setTextEditor(false)}
        onBackButtonPress={() => setTextEditor(false)}>
        <View style={styles.editorModal}>
          <View style={styles.modalHeader}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.searchResultText}>Text </Text>
              <TouchableOpacity onPress={() => setTextEditor(false)}>
                <AngleDown
                  style={{alignSelf: 'center', marginLeft: width / 1.5}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                // margin: 15,
              }}>
              <TouchableOpacity
                style={{alignSelf: 'flex-start', marginRight: width / 4}}>
                <Left />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: width / 4}}>
                <Center />
              </TouchableOpacity>
              <TouchableOpacity>
                <Right />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const cardSuccessModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.successBottomModal}
        isVisible={cardSuccess}
        onBackdropPress={() => setCardSuccess(false)}
        onBackButtonPress={() => setCardSuccess(false)}>
        <TouchableOpacity
          onPress={() => setCardSuccess(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.successmodal}>
          <View style={styles.modalContentWrap}>
            <View style={{marginTop: 23}}>
              {/* <Text style={styles.modalTitle}>Create Card</Text> */}
            </View>

            <View style={{marginTop: 16, alignSelf: 'center'}}>
              <Suc width={80} height={80} />
            </View>
            <View
              style={{
                marginTop: 20,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.successmodalText}>
                Your Card has been Successfully
              </Text>
              <Text style={styles.successmodalText}> Saved</Text>
            </View>

            {/* <View style={styles.searchErrorLottie} /> */}
          </View>
          <TouchableOpacity
            style={styles.successmodalButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.modalBtnText}>GO BACK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const draftModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.bottomModal}
        isVisible={showDraft}
        onBackdropPress={() => setShowDraft(false)}
        onBackButtonPress={() => setShowDraft(false)}>
        <TouchableOpacity
          onPress={() => setShowDraft(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.draftModal}>
          <View style={styles.modalContentWrap}>
            <View style={{marginTop: 23}}>
              <Text style={styles.modalTitle}>Drafts</Text>
            </View>
            <View style={{height: 270}}>
              <FlatList
                data={drafts}
                contentContainerStyle={{paddingVertical: 5}}
                contentInsetAdjustmentBehavior="never"
                snapToAlignment="center"
                decelerationRate="fast"
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item, index) => `${index}-${item}`}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{
                      ...styles.template4,
                      borderBottomColor: item.color,
                    }}
                    onPress={() => {
                      setShowDraft(false);
                      setEditCard(false);
                      setEditDraft(true);
                      idColor = item.color;
                      cardDetails[0].cardTemplateId = item.id;
                    }}></TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      {positionModal && selectPositionModal()}
      {templateModal && selectTemplateModal()}
      {socialModal && socialLinkModal()}
      {textEditor && textEditorModal()}
      {cardSuccess && cardSuccessModal()}
      {showDraft && draftModal()}
      <CreateCardHeader
        bgColor="#316F8A"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        rightSvg1={
          loading ? (
            <ActivityIndicator
              color={'white'}
              size={'small'}
              animating={true}
            />
          ) : (
            <Play />
          )
        }
        rightSvg2={<Download />}
        rightSvg3={<More />}
        rightOnPress={() => onPlay()}
        rightSvg2OnPress={() => onSaveDraft()}
      />
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.categoriesView}>
            {editCard && <UserCardSlider />}
            {editDraft && <DraftCard />}
          </View>

          <View />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.bottomTab}>
          <TouchableOpacity
            style={styles.plusView}
            onPress={() => {
              // navigation.navigate('CreateCard');
              // cardTemplateService();
            }}>
            <View style={styles.plusContainer}>
              <Plus color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 6, marginRight: 20, marginLeft: 10}}>
            <Dividers />
          </View>
          <View style={styles.iconContainer}>
            <Delete />
            <Text style={styles.bottomText}>Delete</Text>
          </View>
          <View style={styles.iconContainer}>
            <Duplicate />
            <Text style={styles.bottomText}>Duplicate</Text>
          </View>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setTextEditor(true)}>
            <Tex width={20} height={20} />
            <Text style={styles.bottomText}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSocialModal(true)}>
            <Social width={20} height={20} />
            <Text style={styles.bottomText}>Social</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowDraft(true)}>
            <Draft width={20} height={20} />
            <Text style={styles.bottomText}>Draft</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateCard;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    color: '#000000',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%',

    height: 55,
    borderWidth: 1,
    borderColor: '#E0E6DD',
    backgroundColor: '#FFFFFF',
    // borderRadius: 10,
    paddingHorizontal: 20,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    color: '#000000',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%',

    height: 55,
    borderWidth: 1,
    borderColor: '#E0E6DD',
    backgroundColor: '#FFFFFF',
    // borderRadius: 10,
    paddingHorizontal: 20,
  },
  placeholder: {
    color: '#C7C9C7',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  categoriesView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: width / 4.7,
    height: 35,
    paddingHorizontal: 20,
  },
  bottomTab: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 10,
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  plusView: {
    marginRight: 10,
  },

  plusContainer: {
    width: 40,
    height: 40,
    borderRadius: 35,
    backgroundColor: '#316F8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  bottomText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#333333',
  },

  socialInputs: {
    backgroundColor: '#EEEFEF',
    marginBottom: -5,
    height: 43,
  },

  // position modal
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modal: {
    width: '100%',
    height: 300,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  draftModal: {
    width: '100%',
    height: 280,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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

  modalContentWrap: {
    height: 230,
    width: '100%',
    paddingHorizontal: 20,
    // alignItems: 'center',
  },

  modalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  modalCloseBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },

  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#316F8A',
  },
  modalText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#8C8C8C',
  },

  //card success
  successBottomModal: {
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },

  successmodal: {
    width: '100%',
    height: 300,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  successmodalButtonInactive: {
    height: 63,
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    opacity: 0.3,
    position: 'absolute',
    bottom: 0,
  },

  successmodalButton: {
    height: 63,
    width: width / 1.1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    bottom: 0,
  },

  successmodalContentWrap: {
    height: 230,
    width: '100%',
    paddingHorizontal: 20,
    // alignItems: 'center',
  },

  successmodalBtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  successmodalCloseBtn: {
    marginBottom: 24,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },

  successmodalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#316F8A',
  },
  successmodalText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#333333',
  },

  // template modal
  templatemodal: {
    width: '100%',
    height: 350,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  templatemodalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#316F8A',
    // marginRight: 30,
  },
  existingCard: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#316F8A',
    marginLeft: width / 3,
  },

  templatemodalContentWrap: {
    height: 230,
    width: '100%',
    paddingHorizontal: 20,
    // alignItems: 'center',
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 7,
    backgroundColor: '#219653',
  },
  bottomLine2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 7,
    backgroundColor: '#9B51E0',
  },
  bottomLine3: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 7,
    backgroundColor: '#F2C34A',
  },
  bottomLine4: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 7,
    backgroundColor: '#F2994A',
  },
  template1: {
    width: width / 2.5,
    marginRight: 10,
    height: 90,
    elevation: 5,
    borderColor: 'white',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 7,
  },
  template2: {
    width: width / 2.5,
    marginRight: 10,
    height: 90,
    elevation: 5,
    borderColor: 'rgba(49, 111, 138, 0.16)',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 7,
  },
  template3: {
    width: width / 2.5,
    marginRight: 10,
    height: 90,
    elevation: 5,
    borderColor: 'rgba(49, 111, 138, 0.16)',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 7,
  },
  template4: {
    width: width / 2.5,
    marginRight: 10,
    height: 90,
    elevation: 5,
    borderColor: 'rgba(49, 111, 138, 0.16)',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 7,
    marginBottom: 15,
  },
  modalTitleText: {
    marginTop: 23,
    flexDirection: 'row',
    alignContent: 'space-between',
    width: '100%',
  },

  ///////
  successModal: {
    width: '100%',
    height: 473,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  successModalContentWrap: {
    height: 300,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  flatlistView: {
    height: 200,
    width: '100%',
    // marginTop: 25,
  },

  /////
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

  resultsBottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  resultsModal: {
    width: '100%',
    height: 470,
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

  // editor modal
  editorBottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  editorModal: {
    width: '100%',
    height: 170,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 30,
  },
});
