import React, {FC, useEffect} from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  Platform,
  LogBox,
  Linking,
} from 'react-native';
import {STATUS_BAR, PRIMARY_COLOR} from './src/core/color';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {RootSiblingParent} from 'react-native-root-siblings';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import rootReducer from './src/slices';
import {configureStore} from '@reduxjs/toolkit';
import SwitchNavigator from './src/navigations/SwitchNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR,
  },
};

const statusBarIOS = () => {
  if (Platform.OS === 'ios') {
    return <View style={{backgroundColor: STATUS_BAR, height: 50}} />;
  }

  return null;
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

const App: FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <RootSiblingParent>
            <View style={{flex: 1}}>
              {statusBarIOS()}
              <SafeAreaView style={{flex: 1}}>
                <StatusBar
                  backgroundColor={STATUS_BAR}
                  barStyle={'light-content'}
                />
                <SwitchNavigator />
              </SafeAreaView>
            </View>
          </RootSiblingParent>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default App;

LogBox.ignoreAllLogs(true);
