import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
export const GlobalStateContext = createContext();
import { useFonts } from 'expo-font';

export default GlobalStateProvider = ({ children }) => {
    const [fontFamilies, setFontFamilies] = useState({});

  const [fontsLoaded] = useFonts({
    'Zain_Black': require('./../../assets/fonts/Zain/Zain-Black.ttf'),
    'Zain_ExtraBold': require('./../../assets/fonts/Zain/Zain-ExtraBold.ttf'),
    'Zain_Bold': require('./../../assets/fonts/Zain/Zain-Bold.ttf'),
    'Zain_Light': require('./../../assets/fonts/Zain/Zain-Light.ttf'),
    'Zain_ExtraLight': require('./../../assets/fonts/Zain/Zain-ExtraLight.ttf'),
    'Zain_Regular': require('./../../assets/fonts/Zain/Zain-Regular.ttf'),

    'Nunito_Black': require('./../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    'Nunito_ExtraBold': require('./../../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
    'Nunito_Bold': require('./../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'Nunito_Light': require('./../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    'Nunito_ExtraLight': require('./../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    'Nunito_Medium': require('./../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setFontFamilies({
        Zain_black: 'Zain_Black',
        Zain_extrabold: 'Zain_ExtraBold',
        Zain_bold: 'Zain_Bold',
        Zain_regular: 'Zain_Regular',
        Zain_light: 'Zain_Light',
        Zain_extralight: 'Zain_ExtraLight',

        Nunito_black: 'Nunito_Black',
        Nunito_extrabold: 'Nunito_ExtraBold',
        Nunito_bold: 'Nunito_Bold',
        Nunito_medium: 'Nunito_Medium',
        Nunito_light: 'Nunito_Light',
        Nunito_extralight: 'Nunito_ExtraLight',
      });
    }
  }, [fontsLoaded]);

  return (
    <GlobalStateContext.Provider value={{ fontsLoaded, fontFamilies }}>
      {children}
    </GlobalStateContext.Provider>
  )
}