import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../core/color';
import Close from '../../assets/svg/phone-verif-close-icon.svg';
import Phone from '../../assets/svg/phone.svg';
import Empty from '../../assets/svg/empty.svg';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import {ConnectProps} from '../../types/navigation';
import connects from '../../mock/Connects';

const {width} = Dimensions.get('screen');

const Search = () => {
  const animation = useRef<LottieView>(null);

  const [finish, setFinish] = useState(false);

  const [errorModal, setErrorModal] = useState(false);

  const [successModal, setSuccessModal] = useState(false);

  const [resultsModal, setResultsModal] = useState(false);

  const [transferring, setTransferring] = useState(true);

  const [results] = useState<ConnectProps[]>(connects);

  const handleFinish = () => {
    setFinish(false);
  };

  const retryButton = () => {
    setErrorModal(false);
  };

  const proceedToContinue = () => {
    setSuccessModal(false);
  };

  useEffect(() => {
    if (animation && animation.current) {
      animation.current.play();
    }
  }, []);

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
              <Text style={styles.successText}>cards with Ashley Maryjane</Text>
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
                data={results}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={ListEmptyView}
                style={styles.flatList}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={({item, index}) => (
                  <View style={{width: '100%'}} key={index}>
                    <View style={styles.connectLine}>
                      <Text style={styles.connectName}>Andrea Kingsley</Text>
                      <TouchableOpacity style={styles.connect}>
                        <Text style={styles.connectText}>CONNECT</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.border}></View>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      {errorModal && searchErrorModal()}
      {successModal && shareSuccessModal()}
      {resultsModal && searchResultsModal()}
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
                setResultsModal(true);
              }}>
              <Close />
            </TouchableOpacity>
            {transferring ? (
              <>
                <View style={{marginTop: 32}}>
                  <Text style={styles.searchingText}>Sharing with Ashley</Text>
                  <Text style={styles.searchingText}>Maryjane</Text>
                </View>
                <View style={{marginTop: 16}}>
                  <Text style={styles.searchingNote}>
                    Make sure both devices are close for stronger
                  </Text>

                  <Text style={styles.searchingNote}>connection</Text>
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
              </>
            ) : (
              <>
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
});
