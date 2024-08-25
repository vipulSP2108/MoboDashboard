import React, { useContext, useEffect, useRef, useState } from 'react';
import DrawerNavigator from './Source/Navigation/DrawerNavigator';
import GlobalStateProvider from './Source/Context/GlobalStateProvider';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { Provider } from 'react-redux';
import store from './Source/App/Store';

export default function App() {
  const [albums, setAlbums] = useState(null);
  // const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

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