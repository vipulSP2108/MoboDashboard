import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import useColorStyle from '../Styles/ColorStyle';

export default function Grid1X1() {
    const colorStyle = useColorStyle();
  return (
    <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: Dimensions.get('window').height * 0.44, width: Dimensions.get('window').height * 0.44}}>

    </View> 
  )
}