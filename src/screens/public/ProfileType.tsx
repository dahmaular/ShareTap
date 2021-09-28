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
import {UnauthenticatedRoutesParamsList} from '../../types';
import {BACKGROUND_COLOR} from '../../core/color';
import ProfileTypes from '../../mock/ProfileTypes';
import Button from '../../components/Button';

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
}

const ProfileType = ({navigation}: Props) => {
  const [profiles] = useState<ProfileTypeProps[]>(ProfileTypes);
  const [selectedProfile, setSelectedProfile] = useState<ProfileTypeProps>({
    title: '',
    description: '',
    image: '',
    id: null,
  });
  const [selectedProfileHash, setSelectedProfileHash] = useState<any>({
    title: '',
    description: '',
    image: '',
    id: '',
  });
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
            <Text style={styles.createText}>Profile type</Text>
            <Text style={styles.create}>Click on a profile type to select</Text>
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
                    <Text style={styles.title}>{k.title}</Text>
                    <Text style={styles.description}>{k.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.buttonView}>
            <Button
              disabled={selectedProfile.title == 'Business profile'}
              loading={false}
              label="NEXT"
              onPress={() => navigation.navigate('CreateAccount')}
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
  },

  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
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
});
