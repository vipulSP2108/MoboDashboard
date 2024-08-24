import { View, Dimensions } from 'react-native';
import React from 'react';
import useColorStyle from '../Styles/ColorStyle';

export default function Grid2X1({ width }) {
  const colorStyle = useColorStyle();

  return (
    <View style={{ width: width, borderRadius: 12, backgroundColor: colorStyle.subBg, height: Dimensions.get('window').height * 0.44 }} >

    </View>
  );
}
