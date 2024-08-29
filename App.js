import React, { useContext, useEffect, useRef, useState } from 'react';
import DrawerNavigator from './Source/Navigation/DrawerNavigator';
import GlobalStateProvider, { GlobalStateContext } from './Source/Context/GlobalStateProvider';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { Provider } from 'react-redux';
import store from './Source/App/Store';
import * as Location from 'expo-location';
import AppNavigator from './Source/Navigation/AppNavigator';

export default function App() {

  useEffect(() => {
    requestMediaPermissions();
    requestLocationPermissions();
    audioSetup();
  }, [])

  const requestMediaPermissions = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access media library was denied');
      status = (await MediaLibrary.requestPermissionsAsync()).status;
    }
  }

  const requestLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Permission to access grant location was denied");
      status = (await Location.requestForegroundPermissionsAsync()).status;
    }
  };

  const audioSetup = async () => {
    Audio.setAudioModeAsync({
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: true
    })
  }

  return (
    <Provider store={store}>
      <GlobalStateProvider>
        {/* <DrawerNavigator /> */}
        <AppNavigator />
      </GlobalStateProvider>
    </Provider>
  );
}