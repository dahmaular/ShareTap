import messaging from '@react-native-firebase/messaging';
import { GET_FCM_TOKEN, SAVE_FCM_TOKEN } from '../core/storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let checkToken = await GET_FCM_TOKEN();
  console.log('Device FCM Token', checkToken);
  if (!checkToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log('FCM Token', fcmToken);
      if (!!fcmToken) {
        await SAVE_FCM_TOKEN(fcmToken);
      }
    } catch (error) {}
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {});

  messaging().onMessage(async (remoteMessage) => {});

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
      }
    });
};
