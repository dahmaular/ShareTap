import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import ArrowLeft from '../../assets/svg/thin_big_left.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BACKGROUND_COLOR} from '../../core/color';
import ProfileTypes from '../../mock/ProfileTypes';
import Button from '../../components/Button';
import { UnauthenticatedRoutesParamsList } from '../../types/navigation';

const {width} = Dimensions.get('screen');

type ProfileNavigationProp = NativeStackNavigationProp<
  UnauthenticatedRoutesParamsList, 
  'ProfileType'
>;

type Props = {
  navigation: ProfileNavigationProp;
};

interface ProfileTypeProps {
  id: number | null;
  title: string;
  description: string;
  image: any;
  comingSoon: boolean;
}

const ProfileType = ({navigation}: Props) => {
  const [profiles] = useState<ProfileTypeProps[]>(ProfileTypes);
  const [selectedProfile, setSelectedProfile] = useState<ProfileTypeProps>({
    title: '',
    description: '',
    image: '',
    id: null,
    comingSoon: false,
  });
  const [selectedProfileHash, setSelectedProfileHash] = useState<any>({
    title: '',
    description: '',
    image: '',
    id: '',
  });

  const goToCreateAccount = () => {
    navigation.navigate('CreateAccount', {item: selectedProfile});
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
          style={styles.profileContainer}
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.createView}>
            <Text style={styles.createText}>Account type</Text>
            <Text style={styles.create}>Click on a account type to select</Text>
          </View>

          <View style={styles.profileView}>
            {profiles.map((k, i) => {
              const active = selectedProfileHash[k.id as number];
              return (
                <TouchableOpacity
                  key={i}
                  style={{
                    ...styles.profile,
                    borderColor: active ? '#14B5CB' : 'rgba(0, 0, 0, 0.11)',
                  }}
                  onPress={() => {
                    setSelectedProfileHash({
                      [k.id as number]: !(
                        selectedProfileHash[k.id as number] || false
                      ),
                    });
                    const picked = profiles.find(x => x.id == k.id);
                    setSelectedProfile(picked as ProfileTypeProps);
                  }}>
                  <View style={styles.imageView}>
                    <Image style={styles.img} source={k.image} />
                  </View>

                  <View style={styles.detailsView}>
                    {k.comingSoon && (
                      <View style={styles.coming}>
                        <Text style={styles.comingSoon}>COMING SOON ????</Text>
                      </View>
                    )}
                    <Text
                      style={{
                        ...styles.title,
                        color: active ? '#316F8A' : '#333333',
                      }}>
                      {k.title}
                    </Text>
                    <Text style={styles.description}>{k.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.buttonView}>
            <Button
              disabled={selectedProfile.title === 'Business account'}
              loading={false}
              label="NEXT"
              onPress={() => goToCreateAccount()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileContainer: {
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

  profileView: {width: '100%', marginTop: 47},

  profile: {
    width: '100%',
    height: 142,
    marginBottom: 40,
    flexDirection: 'row',
    borderWidth: 1,
  },

  imageView: {
    flex: 1,
    height: 142,
  },

  img: {height: 141, width: '100%'},

  detailsView: {
    flex: 2,
    height: 142,
    justifyContent: 'center',
    paddingHorizontal: 15,
    position: 'relative',
  },

  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    marginBottom: 7,
  },

  description: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(51, 51, 51, 0.44)',
  },

  buttonView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 67,
    marginBottom: 50,
  },

  coming: {
    width: 100,
    height: 23,
    backgroundColor: 'rgba(51, 51, 51, 0.15)',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 8.5,
    right: 10,
    paddingHorizontal: 5
  },

  comingSoon: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#333333',
  },
});
