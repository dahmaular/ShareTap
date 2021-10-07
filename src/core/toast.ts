import {
    ToastAndroid,
    Platform,
    Alert,
  } from 'react-native';
  
  const notifyMessage =(msg: any)=> {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG)
    } else {
        Alert.alert(msg);
    }
  }
  
  export default notifyMessage;