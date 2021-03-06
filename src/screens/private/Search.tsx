/* eslint-disable no-shadow */ /* eslint-disable prettier/prettier */
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  PermissionsAndroid,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';

import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Phone from '../../assets/svg/phone.svg';
import Empty from '../../assets/svg/empty.svg';
import {ConnectProps} from '../../types/navigation';
import connects from '../../mock/Connects';
import TextInputs from '../../components/TextInput';
import {TextInput} from 'react-native-paper';
import {NetworkInfo} from 'react-native-network-info';
import TcpSocket from 'react-native-tcp-socket';
import Card from '../../components/Card';

const {width, height} = Dimensions.get('screen');

interface WIFIUSER {
  BSSID: string;
  SSID: string;
}

let sent: boolean;
let exchange: boolean;

const Search = ({route}: any) => {
  const animation = useRef<LottieView>(null);

  const [finish, setFinish] = useState(false);

  const [errorModal, setErrorModal] = useState(false);

  const [successModal, setSuccessModal] = useState(false);
  const [cardSuccessModal, setCardSuccessModal] = useState(false);

  const [resultsModal, setResultsModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);

  const [password, setPassword] = useState({value: '', error: ''});

  const [show, setShow] = useState(false);

  const [passwordEntry, setPasswordEntry] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [textInputs, setTextInputs] = useState<[]>([]);

  const [transferring, setTransferring] = useState(false);

  const [results] = useState<ConnectProps[]>(connects);
  const navigation = useNavigation();

  const [connected, setConnected] = useState({
    connected: false,
    ssid: 'Tapiolla-share',
  });
  const [ssid, setSsid] = useState('');
  const passwords = 'damola-123';
  const [available, setAvailable] = useState<WIFIUSER[]>([]);

  const [server, setServer] = useState(null);
  const [chats, setChats] = useState([]);
  const [card, setCard] = useState<any>([]);
  const [ip, setIp] = useState('');
  const [start, setStart] = useState<boolean>(false);

  const [client, setClient] = useState(null);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 1;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = useRef(new Animated.ValueXY()).current;
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    if (route.params) {
      const {cardd} = route.params;
      card.push(cardd);
    }
  }, []);

  const createServer = (card: any, setCard: any) => {
    const server = TcpSocket.createServer(socket => {

      socket.on('data', data => {
        let response = JSON.parse(data);
        setCard(response);
        setCardSuccessModal(true);
        if (exchange === true) {
          socket.write(JSON.stringify(card));
        }
      });

      socket.on('error', error => {
      });

      socket.on('close', error => {
      });
    }).listen({port: 6666, host: '0.0.0.0'}, () => {
    });

    server.on('error', error => {
    });

    server.on('close', () => {
    });

    return server;
  };

  const createClient = (ip: any) => {
    const client = TcpSocket.createConnection({port: 6666, host: ip}, () => {
      // client.write('Hello, server! Love, Client.');
    });

    client.on('data', data => {
      let response = JSON.parse(data);
      // setCard([...card, {id: card.length + 1, msg: data}]);
      setCard(response);
      setSuccessModal(false);
      exchange = true;
      setCardSuccessModal(true);
      // client.destroy(); // kill client after server's response
      // this.server.close();
    });

    client.on('error', error => {
    });

    client.on('close', () => {
    });
    return client;
  };

  const startClient = async () => {
    let ip = await NetworkInfo.getGatewayIPAddress();
    // setClient(createClient(ip));

    return () => {};
  };

  const retryButton = () => {
    setErrorModal(false);
    scanExample();
  };

  const proceedToContinue = () => {
    setSuccessModal(false);
    setTransferring(false);
    if (server) {
      server.close();
      setServer(null);
    }
    setCard([]);
    navigation.navigate('Home');
  };

  const proceedToHome = () => {
    setCardSuccessModal(false);
    if (client) {
      client.destroy();
      setClient(null);
    }
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (animation && animation.current) {
      animation.current.play();
    }
  }, []);

  const initWifi = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      setSsid(ssid);
    } catch (error) {
      setSsid('Cannot get current SSID!' + error.message);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Tapiolla App Permission',
          message:
            'Location permission is required to connect with or scan for Wifi networks. ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        initWifi();
        // enableWifi();
        listAvailableWifi();
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const connectWithWifi = async (hotspot: string) => {
    // WifiManager.disconnect();
    try {
      const data = await WifiManager.connectToProtectedSSID(
        hotspot,
        password.value,
        false,
      );
      setConnected({connected: true, ssid: hotspot});
      setResultsModal(false);
      setTransferring(true);
      // startServer();
    } catch (error) {
      setConnected({connected: false, error: error.message});
    }
  };

  const startServer = async () => {
    if (!server) {
      setServer(createServer(card, setCard));
    }
    try {
      let temp_ip = await NetworkInfo.getIPV4Address();
      setIp(temp_ip);
    } catch (e) {
    }
  };

  const listAvailableWifi = async () => {
    try {
      const data = await WifiManager.loadWifiList();
      if (data.length > 0) {
        setAvailable(data);
        setResultsModal(true);
      } else {
        // setResultsModal(false);
        setErrorModal(true);
      }
    } catch (error) {
      // setConnected({connected: false, error: error.message});
    }
  };

  const enableWifi = async () => {
    // const enabled = await WifiManager.isEnabled();
    WifiManager.setEnabled(true);
    const ip = await WifiManager.getIP();
    // return WifiManager.setEnabled(false);
  };

  const scanExample = async () => {
    try {
      const data = await WifiManager.reScanAndLoadWifiList();
      setAvailable(data);
    } catch (error) {
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      requestLocationPermission();
    });
    return unsubscribe;
  }, [navigation]);

  const ListEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyView}>
          <Empty height={50} width={51} />
          <Text style={styles.emptyText}>Nothing here!</Text>
        </View>
      </View>
    );
  };

  const searchErrorModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.bottomModal}
        isVisible={errorModal}
        onBackdropPress={() => setErrorModal(false)}
        onBackButtonPress={() => setErrorModal(false)}>
        <TouchableOpacity
          onPress={() => setErrorModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.modal}>
          <View style={styles.modalContentWrap}>
            <View style={{marginTop: 23}}>
              <Text style={styles.sorryText}>Sorry, No User Found</Text>
            </View>

            <View style={{marginTop: 16}}>
              <Text style={styles.searchingNote}>
                Ensure the recipient has clicked on the
              </Text>
              <Text style={styles.searchingNote}>
                tap to share button to establish a
              </Text>
              <Text style={styles.searchingNote}>connection </Text>
            </View>

            <View style={styles.searchErrorLottie}>
              <LottieView
                source={require('../../assets/json/share_error.json')}
                style={{width: 300, height: 300}}
                loop={true}
                autoPlay={true}
                ref={animation}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => retryButton()}>
            <Text style={styles.modalBtnText}>RETRY</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const shareSuccessModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.successBottomModal}
        isVisible={successModal}
        onBackdropPress={() => setSuccessModal(false)}
        onBackButtonPress={() => setSuccessModal(false)}>
        <TouchableOpacity
          onPress={() => setSuccessModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.successModal}>
          <View style={styles.successModalContentWrap}>
            <View style={styles.searchErrorLottie}>
              <LottieView
                source={require('../../assets/json/success.json')}
                style={{width: 150, height: 150}}
                loop={true}
                autoPlay={true}
                ref={animation}
              />
            </View>

            <View style={{marginTop: 20}}>
              <Text style={styles.successText}>
                You have sucessfully exchanged
              </Text>
              <Text style={styles.successText}>
                cards with {connected.ssid}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.successModalButton}
            onPress={() => proceedToContinue()}>
            <Text style={styles.modalBtnText}>BACK TO HOME</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const shareCardSuccessModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.successBottomModal}
        isVisible={cardSuccessModal}
        onBackdropPress={() => setCardSuccessModal(false)}
        onBackButtonPress={() => setCardSuccessModal(false)}>
        <TouchableOpacity
          onPress={() => setCardSuccessModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.cardSuccessModal}>
          <View style={styles.cardSuccessModalContentWrap}>
            <View>
              <FlatList
                horizontal
                data={card}
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
                onScrollEndDrag={() => {}}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  return (
                    <Card
                      item={item}
                      index={index}
                      boxWidth={boxWidth}
                      halfBoxDistance={halfBoxDistance}
                      pan={pan}
                    />
                    // <></>
                  );
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.cardSuccessModalButton}
            onPress={() => proceedToHome()}>
            <Text style={styles.modalBtnText}>BACK TO HOME</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const acceptExchangeModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.acceptBottomModal}
        isVisible={acceptModal}
        onBackdropPress={() => setAcceptModal(false)}
        onBackButtonPress={() => setAcceptModal(false)}>
        <TouchableOpacity
          onPress={() => setAcceptModal(false)}
          style={styles.modalCloseBtn}>
          <Close />
        </TouchableOpacity>
        <View style={styles.acceptModal}>
          {/* <View style={styles.acceptModalContentWrap}> */}
          <View style={{marginTop: 40}}>
            <Text style={styles.acceptText}>
              {connected.ssid} wants to exchange
            </Text>
            <Text style={styles.acceptText}>cards with you</Text>
          </View>
          {/* </View> */}
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.acceptModalButton}
              onPress={async () => {
                exchange = false;
                if (!server) {
                  setServer(createServer(card, setCard));
                }
                try {
                  let temp_ip = await NetworkInfo.getIPV4Address();
                  setIp(temp_ip);
                  setAcceptModal(false);
                } catch (e) {
                }
                // setAcceptModal(false);
              }}>
              <Text style={styles.modalBtnText}>ACCEPT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptModalButton1}
              onPress={async () => {
                if (!server) {
                  setServer(createServer(card, setCard));
                }
                try {
                  let temp_ip = await NetworkInfo.getIPV4Address();
                  setIp(temp_ip);
                  exchange = true;
                  setAcceptModal(false);
                } catch (e) {
                }
              }}>
              <Text style={styles.modalBtnText}>EXCHANGE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const searchResultsModal = () => {
    return (
      <Modal
        avoidKeyboard
        propagateSwipe={true}
        style={styles.resultsBottomModal}
        isVisible={resultsModal}
        onBackdropPress={() => setResultsModal(false)}
        onBackButtonPress={() => setResultsModal(false)}>
        <View style={styles.resultsModal}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.searchResultText}>Search Result</Text>
            </View>

            <View style={{marginTop: 16}}>
              <Text style={styles.searchResultNote}>
                Ensure the recipient has clicked on the tap to
              </Text>
              <Text style={styles.searchResultNote}>share button on</Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            <View style={styles.modalContent}>
              <FlatList
                data={available}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={ListEmptyView}
                style={styles.flatList}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={({item, index}) => (
                  <View style={{width: '100%'}} key={index}>
                    <View style={styles.connectLine}>
                      <Text style={styles.connectName}>{item.SSID}</Text>
                      <TouchableOpacity
                        style={styles.connect}
                        onPress={async () => {
                          await connectWithWifi(item.SSID);
                          setTimeout(() => {
                            setShow(true);
                          }, 5000);
                        }}>
                        <Text style={styles.connectText}>CONNECT</Text>
                      </TouchableOpacity>
                    </View>
                    {/* {item.SSID} */}
                    {/* {showPass ? ( */}
                    <TextInputs
                      label="Password"
                      placeholderTextColor="rgba(90, 89, 89, 0.55)"
                      placeholder="Enter your password"
                      // value={textInputs[index]}
                      onFocus={() => setPasswordFocus(true)}
                      onChangeText={text => {
                        setPassword({value: text, error: ''});
                      }}
                      secureTextEntry={passwordEntry}
                      style={{
                        backgroundColor: passwordFocus ? '#FFFFFF' : '#EEEFEF',
                      }}
                      right={
                        <TextInput.Icon
                          name={() => (
                            <TouchableOpacity
                              style={styles.eyeView}
                              onPress={() => setPasswordEntry(prev => !prev)}>
                              <Ionicons
                                name={
                                  passwordEntry
                                    ? 'eye-outline'
                                    : 'eye-off-outline'
                                }
                                size={17}
                                color="#000000"
                              />
                            </TouchableOpacity>
                          )}
                        />
                      }
                    />
                    {/* ) : (
                      <></>
                    )} */}

                    <View style={styles.border} />
                  </View>
                )}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => retryButton()}>
            <Text style={styles.modalBtnText}>RESCAN</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      {errorModal && searchErrorModal()}
      {successModal && shareSuccessModal()}
      {resultsModal && searchResultsModal()}
      {acceptModal && acceptExchangeModal()}
      {cardSuccessModal && shareCardSuccessModal()}
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.closeView}
              onPress={() => {
                // setErrorModal(true);
                // setSuccessModal(true);
                // setResultsModal(true);
                navigation.goBack();
                // setAcceptModal(true);
              }}>
              <Close />
            </TouchableOpacity>

            {transferring ? (
              <>
                <View style={{marginTop: 32}}>
                  <Text style={styles.searchingText}>
                    Sharing with {connected.ssid}
                  </Text>
                  {/* <Text style={styles.searchingText}>Maryjane</Text> */}
                </View>
                <View style={{marginTop: 16}}>
                  <Text style={styles.searchingNote}>
                    Make sure both devices are close for stronger
                  </Text>

                  <Text style={styles.searchingNote}>connection</Text>
                  {/* {startClient()} */}
                </View>
                <View style={styles.phonesView}>
                  <Phone />
                  <LottieView
                    source={require('../../assets/json/dots.json')}
                    style={{width: 100, height: 100}}
                    loop={true}
                    autoPlay={true}
                    ref={animation}
                  />
                  <Phone />
                </View>

                {show === true && (
                  <TouchableOpacity
                    style={styles.connect}
                    onPress={() => {
                      startClient();

                      if (client) {
                        client.write(JSON.stringify(card));
                        sent = true;
                      }
                      if (sent === true) {
                        setSuccessModal(true);
                        setCard([]);
                      }
                    }}>
                    <Text style={styles.connectText}>Send </Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <>
                {/* {client ? (
                  setAcceptModal(true)
                ) : ( */}
                <>
                  {/* {show === true && (
                    <Text style={styles.searchingText}>show me {show}</Text>
                  )} */}
                  <View style={{marginTop: 32}}>
                    <Text style={styles.searchingText}>Searching </Text>
                  </View>
                  <View style={{marginTop: 16}}>
                    <Text style={styles.searchingNote}>
                      Make sure the receiver???s hotspot is active and
                    </Text>
                    <Text style={styles.searchingNote}>
                      keep your devices close to establish a
                    </Text>
                    <Text style={styles.searchingNote}>connection</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.connect}
                    onPress={async () => {
                      setAcceptModal(true);
                    }}>
                    <Text style={styles.connectText}>RECEIVE</Text>
                  </TouchableOpacity>

                  <View style={styles.lottieView}>
                    <LottieView
                      source={require('../../assets/json/searching.json')}
                      style={{width: 500, height: 500}}
                      loop={true}
                      autoPlay={true}
                      ref={animation}
                    />
                  </View>
                </>
              </>
            )}
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
    textAlign: 'center',
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

  phonesView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
  },

  // Error Modal

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modal: {
    width: '100%',
    height: 515,
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
    height: 442,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
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

  sorryText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#316F8A',
  },

  searchErrorLottie: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Error Modal

  // Successfull Exchange Modal

  successBottomModal: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  successModal: {
    width: '100%',
    height: 373,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  successModalButton: {
    height: 73,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },

  successModalContentWrap: {
    height: 300,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  successText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },

  // acceptExchange Modal
  acceptModal: {
    width: '100%',
    height: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // borderTopLeftRadius: 10,
  },
  acceptBottomModal: {
    justifyContent: 'flex-end',
    paddingBottom: height / 8,
  },

  acceptText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },

  acceptModalButton: {
    height: 43,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    backgroundColor: '#000',
  },

  acceptModalButton1: {
    height: 43,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    backgroundColor: PRIMARY_COLOR,
  },

  acceptModalContentWrap: {
    height: 300,
    width: '100%',
    // paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
  },

  //card success
  cardSuccessModal: {
    width: '100%',
    height: 250,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  cardSuccessModalButton: {
    height: 53,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },

  cardSuccessModalContentWrap: {
    height: 200,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  // Results List Modal

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
    height: 450,
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
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#316F8A',
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
});
