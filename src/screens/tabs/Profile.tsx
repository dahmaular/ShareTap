/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {DrawerActions, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  AuthenticatedRoutesParamsList,
  TabNavigatorParamsList,
} from '../../types/navigation';
import NotificationModal from '../../components/NotificationModal';
import Header from '../../components/Header';
import Menu from '../../assets/svg/menu.svg';
import Settings from '../../assets/svg/settings.svg';
import Bggroup from '../../assets/svg/bg-group.svg';
import Camera from '../../assets/svg/camera.svg';
import PImageBg from '../../assets/svg/profile-image-bg.svg';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Home'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

const {width, height} = Dimensions.get('screen');

const Profile = ({navigation}: Props) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const _onNotificationPressed = () => {
    setModal(true);
  };

  return (
    <View style={styles.container}>
      {modal && (
        <NotificationModal
          visible={modal}
          onBackButtonPress={() => setModal(true)}
          onBackdropPress={() => setModal(true)}
          onClose={() => setModal(false)}
        />
      )}
      <Header
        title="PROFILE"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Menu />}
        leftOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        rightSvg={<Settings onPress={_onNotificationPressed} />}
        rightOnPress={() => <></>}
      />
      <View style={styles.rect}>
        <Bggroup />
        <View style={styles.bgView}>
          <TouchableOpacity style={styles.bgCamera}>
            <Camera />
          </TouchableOpacity>
          <Text style={styles.bgText}>Add background image</Text>
        </View>
      </View>
      <View style={styles.proImageView}>
        <View
          style={{
            // alignSelf: 'center',
            // alignItems: 'center',
            // justifyContent: 'center',
            marginTop: 20,
          }}>
          <PImageBg />
        </View>
        <View style={styles.profCamera}>
          <Camera />
        </View>
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
  rect: {
    marginTop: 15,
    backgroundColor: '#D1D1D1',
    width: '100%',
    height: 120,
  },
  bgView: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 20,
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
    marginTop: height / 4.4,
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
    left: 30,
    // top: 8,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 50,
    elevation: 2,
  },
});
