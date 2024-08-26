import React, { useContext, useEffect, useRef, useState } from 'react';
import DrawerNavigator from './Source/Navigation/DrawerNavigator';
import GlobalStateProvider, { GlobalStateContext } from './Source/Context/GlobalStateProvider';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { Provider } from 'react-redux';
import store from './Source/App/Store';
import * as Location from 'expo-location';

export default function App() {
  
  useEffect(() => {
    requestPermissions();
    audioSetup();
  }, [])

  const requestPermissions = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access media library was denied');
      status = (await MediaLibrary.requestPermissionsAsync()).status;
    }
    
    let { statusLocation } = await  Location.requestForegroundPermissionsAsync();
    if (statusLocation !== 'granted') {
      console.log("Please to access grant location was denied");
      status = (await Location.requestForegroundPermissionsAsync()).statusLocation;
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
        <DrawerNavigator />
      </GlobalStateProvider>
    </Provider>
  );
}