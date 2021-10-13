import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import Header from '../../components/Header';
import {
  AuthenticatedRoutesParamsList,
  ItemProps,
  TabNavigatorParamsList,
} from '../../types';
import {DrawerActions, CompositeNavigationProp} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import Menu from '../../assets/svg/menu.svg';
import Notification from '../../assets/svg/ion-ios-notifications.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {BACKGROUND_COLOR} from '../../core/color';
import Message from '../../components/Message';
import cards from '../../mock/CarouselList';
import Card from '../../components/Card';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabNavigatorParamsList, 'Home'>,
    StackNavigationProp<AuthenticatedRoutesParamsList>
  >;
};

const {width} = Dimensions.get('screen');

const Home = ({navigation}: Props) => {
  const [message, setMessage] = useState('');
  const [cardsList] = useState<ItemProps[]>(cards);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 1;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = useRef(new Animated.ValueXY()).current;

  return (
    <View style={{flex: 1}}>
      <Header
        title="HOME"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<Menu />}
        leftOnPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        rightSvg={
          <>
            <Notification />

            <Badge size={12} style={styles.badgeStyle}>
              0
            </Badge>
          </>
        }
        rightOnPress={() => <></>}
      />

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.homeContainer}>
            {message != '' && (
              <View style={styles.toastView}>
                <Message
                  message={message}
                  onHide={() => {
                    setMessage('');
                  }}
                />
              </View>
            )}
            <View style={styles.organize}>
              <View>
                <Text style={styles.organizeText}>Organize cards shared</Text>
                <Text style={styles.organizeText}>
                  with you in your Rolodex
                </Text>
              </View>

              <TouchableOpacity
                style={styles.viewButton}
                onPress={() =>
                  setMessage('Upgrade to premium to unlock full access.')
                }>
                <Text style={styles.viewButtonText}>View Rodolex</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.yourCards}>
              <Text style={styles.yourCardsText}>Your Cards (4)</Text>
              <Text style={styles.viewAll}>View all</Text>
            </View>

            <FlatList
              horizontal
              data={cardsList}
              style={{
                // height: 250,
                // width: '100%',
                marginTop: 25,
                marginBottom: 20,
              }}
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
              keyExtractor={(item, index) => `${index}-${item}`}
              renderItem={({item, index}) => (
                <Card
                  item={item}
                  index={index}
                  boxWidth={boxWidth}
                  halfBoxDistance={halfBoxDistance}
                  pan={pan}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: '#FF4E00',
    color: '#FFFFFF',
  },

  container: {
    flex: 1,
  },

  homeContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: width,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  organize: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 56,
  },

  viewButton: {
    width: 128,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#316F8A',
  },

  viewButtonText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
  },

  organizeText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(51, 51, 51, 0.55)',
  },

  toastView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  yourCards: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 52,
  },

  yourCardsText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
  },

  viewAll: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#316F8A',
    textDecorationLine: 'underline',
  },
});
