/* eslint-disable prettier/prettier */
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

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
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';

const {width} = Dimensions.get('screen');

const deviceHeight = Dimensions.get('window').height;

const CreateCard = ({navigation}: Props) => {
  const [positionModal, setPositionModal] = useState(true);

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
              <Text style={styles.searchingNote}>
                Create card unique to a particular position to
              </Text>
              <Text style={styles.searchingNote}>
                easily connect with others.
              </Text>
            </View>

            <View style={styles.searchErrorLottie}></View>
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={() => null}>
            <Text style={styles.modalBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      {positionModal && selectPositionModal()}
      <Header
        title=""
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<More />}
        rightOnPress={() => null}
      />
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.categoriesView}></View>
          <View></View>
        </View>
        <View style={styles.bottomTab}>
          <TouchableOpacity
            style={styles.plusView}
            onPress={() => {
              //   navigation.navigate('CreateCard');
            }}>
            <View style={styles.plusContainer}>
              <Plus color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 6, marginRight: 20}}>
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
          <View style={styles.iconContainer}>
            <Tex width={20} height={20} />
            <Text style={styles.bottomText}>Text</Text>
          </View>
          <View style={styles.iconContainer}>
            <Social width={20} height={20} />
            <Text style={styles.bottomText}>Social</Text>
          </View>
          <View style={styles.iconContainer}>
            <Draft width={20} height={20} />
            <Text style={styles.bottomText}>Draft</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  categoriesView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
    height: 35,
    paddingHorizontal: 20,
  },
  bottomTab: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 10,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
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
    marginRight: 20,
  },
  bottomText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#333333',
  },

  // position modal
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modal: {
    width: '100%',
    height: 255,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  modalButton: {
    height: 73,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },

  modalContentWrap: {
    height: 182,
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
});
