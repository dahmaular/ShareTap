import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
import {AuthenticatedRoutesParamsList} from '../../types';
import Back from '../../assets/svg/back.svg';
import More from '../../assets/svg/more.svg';
import Plus from '../../assets/svg/plus.svg';
import {BACKGROUND_COLOR} from '../../core/color';
import cats from '../../mock/Categories';

type RolodexProps = NativeStackNavigationProp<
  AuthenticatedRoutesParamsList,
  'Rolodex'
>;

type RolodexRouteProp = RouteProp<AuthenticatedRoutesParamsList, 'Rolodex'>;

type Props = {
  navigation: RolodexProps;
  route: RolodexRouteProp;
};

const {width} = Dimensions.get('screen');

const Rolodex = ({navigation}: Props) => {
  const [categories] = useState(cats);
  return (
    <View style={{flex: 1}}>
      <Header
        title="Rolodex"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Back />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<More />}
        rightOnPress={() => <></>}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.rolodexContainer}>
            <View style={styles.categoriesView}>
              {/* <TouchableOpacity style={[styles.addNewChip, {width: 87}]}>
                <Plus />
                <Text style={styles.addNewText}>Add New</Text>
              </TouchableOpacity> */}
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {categories.map((k, i) => {
                  return (
                    <TouchableOpacity
                      style={{...styles.addNewChip, width: 70}}
                      key={i}>
                      <Text style={styles.addNewText}>{k.catName}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Rolodex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  rolodexContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  categoriesView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
    height: 35,
  },

  addNewChip: {
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#316F8A',
    borderRadius: 30,
    marginRight: 10
  },

  addNewText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(51, 51, 51, 0.51)',
  },
});
