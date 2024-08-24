import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import useColorStyle from '../Styles/ColorStyle';

export default function Grid2X1() {
    const colorStyle = useColorStyle();
  return (
    <View 
// Asign width as total height awailable
    style={{ borderRadius: 12, backgroundColor: colorStyle.subBg}}>

    </View>
  )
}