import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import useColorStyle from '../Styles/ColorStyle';

export default function Grid3X2({ width }) {
    const colorStyle = useColorStyle();
  return (
    <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, width: width + Dimensions.get('window').height * 0.44}}>

    </View>
  )
}