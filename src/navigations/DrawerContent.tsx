import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.drawerContainer}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContainer: {
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
});
