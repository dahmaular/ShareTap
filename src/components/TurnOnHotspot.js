// /* eslint-disable prettier/prettier */
// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   Image,
//   TextInput,
//   StatusBar,
//   Dimensions,
//   Button,
//   TouchableOpacity,
// } from 'react-native';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// // import Button from 'apsl-react-native-button';
// // import style from '../assets/styles/style';
// import {WifiWizard, HotspotWizard} from 'react-native-wifi-and-hotspot-wizard';
// import Toast from 'react-native-simple-toast';
// import {FlatList} from 'react-native-gesture-handler';

// let TurnOnHotspot = props => {
//   let win = Dimensions.get('window');
//   let [HotspotSSID, setHotspotSSID] = useState();
//   let [HotspotPassword, setHotspotPassword] = useState();
//   let showTurnOnHotspotModal = props.showTurnOnHotspotModal;
//   let [connected, setHotspotConnected] = useState(false);
//   return (
//     <View
//       style={{height: win.height / 2, backgroundColor: '#fff', padding: 10}}>
//       {connected ? (
//         <View style={{alignSelf: 'center', marginTop: 20}}>
//           <Icon
//             name="check-circle"
//             color="green"
//             size={150}
//             style={{alignSelf: 'center'}}
//           />
//           <Text style={{fontSize: 35, alignSelf: 'center'}}>
//             Hotspot Active{' '}
//           </Text>
//           {connected == 'success' ? (
//             <Text>Here are your credentials</Text>
//           ) : (
//             <Text>
//               Failed to set custom credentials. Here is the randomly generated
//               credentials.
//             </Text>
//           )}
//           <Text style={{fontSize: 20, textAlign: 'left', fontWeight: 'bold'}}>
//             SSID : {HotspotSSID}{' '}
//           </Text>
//           <Text style={{fontSize: 20, textAlign: 'left', fontWeight: 'bold'}}>
//             Password : {HotspotPassword}{' '}
//           </Text>
//         </View>
//       ) : (
//         <>
//           <Text style={styles.text}>Setup Hotspot </Text>
//           <Text />
//           <Text style={styles.text}>Hotspot Name</Text>
//           <TextInput
//             style={{borderBottomColor: '#212121', borderBottomWidth: 2}}
//             placeholder="SSID"
//             onChangeText={text => {
//               setHotspotSSID(text);
//             }}
//           />
//           <Text />
//           <Text style={styles.text}>Hotspot Password</Text>
//           <TextInput
//             secureTextEntry={true}
//             onChangeText={text => {
//               setHotspotPassword(text);
//             }}
//             style={{borderBottomColor: '#212121', borderBottomWidth: 2}}
//             placeholder="Password"
//           />
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#00e676',
//               width: '100%',
//               height: 50,
//               left: 12,
//               borderWidth: 0,
//               justifyContent: 'center',
//               alignItems: 'center',
//               position: 'absolute',
//               bottom: 60,
//             }}
//             onPress={() => {
//               Toast.show('Starting Hotspot... Please Wait');
//               connectToHotspot();
//             }}>
//             {/* Start Hotspot */}
//             <View>
//               <Text style={styles.headerText}> Start Hotspot </Text>
//             </View>
//           </TouchableOpacity>
//         </>
//       )}

//       <TouchableOpacity
//         style={{
//           backgroundColor: '#212121',
//           width: '100%',
//           height: 50,
//           left: 12,
//           justifyContent: 'center',
//           alignItems: 'center',
//           position: 'absolute',
//           bottom: 0,
//         }}
//         onPress={() => {
//           showTurnOnHotspotModal(false);
//         }}>
//         <View>
//           <Text style={styles.headerText}> Close </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );

//   function connectToHotspot() {
//     HotspotWizard.turnOnHotspot(HotspotSSID, HotspotPassword).then(data => {
//       if (data.status == 'success' || data.status == 'auth') {
//         setHotspotConnected(data.status);
//         if (data.status == 'auth') {
//           setHotspotPassword(data.password);
//           setHotspotSSID(data.SSID);
//         }
//       } else {
//         Toast.show('Something went wrong');
//       }
//     });
//   }
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#212121',
//     flexDirection: 'row',
//     elevation: 0.5,
//     alignItems: 'flex-end',
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 2,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 2,
//   },
// });

// export default TurnOnHotspot;
