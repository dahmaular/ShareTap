import React, {useEffect, useState, useRef, MutableRefObject} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {BACKGROUND_COLOR} from '../../core/color';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('screen');

const Search = () => {
  const animation = useRef<LottieView>(null);

  const [finish, setFinish] = useState(false);

  const handleFinish = () => {
    setFinish(false);
  };


  useEffect(() => {
    if (animation && animation.current) {
      animation.current.play();
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.closeView}>
              <Close />
            </TouchableOpacity>

            <View style={{marginTop: 32}}>
              <Text style={styles.searchingText}>Searching</Text>
            </View>
            <View style={{marginTop: 16}}>
              <Text style={styles.searchingNote}>
                Make sure the receiver’s hotspot is active and
              </Text>
              <Text style={styles.searchingNote}>
                keep your devices close to establish a
              </Text>
              <Text style={styles.searchingNote}>connection</Text>
            </View>

            <View style={styles.lottieView}>
              <LottieView
                source={require('../../assets/json/searching.json')}
                style={{width: 300, height: 300}}
                loop={true}
                autoPlay={true}
                ref={animation}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  closeView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 50,
  },

  searchingText: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },

  searchingNote: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#8C8C8C',
    textAlign: 'center',
  },

  lottieView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 22,
  },
});
