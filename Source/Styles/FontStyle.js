// styles/TextStyles.js
import { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { GlobalStateContext } from '../Context/GlobalStateProvider';

const FontStyles = () => {
  const { fontFamilies } = useContext(GlobalStateContext);

  if (!fontFamilies) {
    return null;
  }

  const fontSizes = {
    verysmall: 10, //
    small: 12, //
    regular: 14, //
    medium: 16, //
    xmedium: 18,
    large: 20, //
    xlarge: 22,
    xxlarge: 26,
    xxxlarge: 28, //
  };

  const fontWeights = {
    regular: '400',
    bold: '700',
  };

  return StyleSheet.create({
    home: {
      fontFamily: fontFamilies.Zain_bold, fontSize: 21, marginBottom: -12
    },
    homebig: {
      fontFamily: fontFamilies.Zain_bold, fontSize: 24, marginBottom: -12
    },
    homebold: {
      fontFamily: fontFamilies.Zain_black, fontSize: 21, marginBottom: -14
    },
    clock: {
      fontFamily: fontFamilies.Nunito_black, fontSize: 52,
    },

    // entryUpper: {
    //   marginBottom: -1, fontFamily: fontFamilies.Zain_bold, textTransform: 'uppercase', fontSize: 24
    // },
    // h1: {
    //   marginBottom: -8, fontFamily: fontFamilies.Zain_black, fontSize: 38
    // },
    // blackh2: {
    //   marginBottom: -10, fontFamily: fontFamilies.Zain_black, fontSize: 26,
    // },
    // boldh2: {
    //   fontFamily: fontFamilies.Zain_bold, fontSize: 26,
    // },
    // h3: {
    //   marginBottom: -8, fontFamily: fontFamilies.Zain_bold, fontSize: 24,
    // },
    // h4: {
    //   fontFamily: fontFamilies.Zain_regular, fontSize: 22, 
    // },

    // h5: {
    //   fontFamily: fontFamilies.Zain_regular, fontSize: 20, marginBottom: -6, 
    // },
    // h6: {
    //   fontFamily: fontFamilies.Zain_regular, fontSize: 16, marginBottom: -6, 
    // },

    // h7: {
    //   fontFamily: fontFamilies.Zain_regular, fontSize: 18, marginBottom: -6, 
    // },
  });
};

export default FontStyles;
