import AsyncStorage from '@react-native-async-storage/async-storage';

export const SAVE_FCM_TOKEN = (data: string) => {
  AsyncStorage.setItem('token', data);
};

export const GET_FCM_TOKEN = async () => {
  const value = await AsyncStorage.getItem('token');
  return value || '';
};
