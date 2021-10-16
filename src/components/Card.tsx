import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Share,
} from 'react-native';

import {CardProps} from '../types';
import {Menu} from 'react-native-paper';
import Link from '../assets/svg/link_02.svg';
import Facebook from '../assets/svg/facebook.svg';
import Twitter from '../assets/svg/twitter.svg';
const {width} = Dimensions.get('window');

const Card = ({item, index, boxWidth, halfBoxDistance, pan}: CardProps) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: item.email,
      });
      console.log('Result', result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };

  return (
    <Animated.View
      style={{
        ...styles.animatedCard,
        transform: [
          {
            scale: pan.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
              ],
              outputRange: [0.8, 1, 0.8], // scale down when out of scope
              extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={styles.menu}
        anchor={
          <TouchableOpacity
            style={{...styles.touchable, width: boxWidth}}
            onLongPress={openMenu}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.profession}>{item.profession}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <View style={styles.telSocial}>
              <View>
                <Text style={styles.telephone}>{item.phone}</Text>
              </View>

              <View style={styles.rowCenter}>
                <TouchableOpacity style={{marginRight: 10}} onPress={onShare}>
                  <Link />
                </TouchableOpacity>

                <TouchableOpacity style={{marginRight: 10}} onPress={onShare}>
                  <Facebook />
                </TouchableOpacity>

                <TouchableOpacity style={{marginRight: 10}} onPress={onShare}>
                  <Twitter />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        }>
        <Menu.Item titleStyle={styles.text} onPress={() => {}} title="Share" />
        <Menu.Item titleStyle={styles.text} onPress={() => {}} title="Edit" />
        <Menu.Item
          titleStyle={styles.deleteText}
          onPress={() => {}}
          title="Delete"
        />
      </Menu>
      <View style={styles.bottomLine}></View>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  animatedCard: {
    height: 191,
    width: width,
    borderWidth: 1,
    borderColor: 'rgba(49, 111, 138, 0.16)',
    backgroundColor: '#FFFFFF',
    marginRight: -25,
  },

  touchable: {
    height: 184,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },

  bottomLine: {width: '100%', height: 7, backgroundColor: '#219653'},

  telSocial: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  rowCenter: {flexDirection: 'row', alignItems: 'center'},

  name: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#219653',
  },
  profession: {
    fontFamily: 'Poppins',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#cccccc',
  },

  email: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#333333',
  },

  telephone: {
    fontFamily: 'Poppins',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#333333',
  },

  deleteText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#EB5757',
  },

  text: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    color: '#333333',
  },

  menu: {position: 'absolute', top: 460, left: 280, width: 100, height: 112},
});