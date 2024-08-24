import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import useColorStyle from '../Styles/ColorStyle';

export default function Grid1X2() {
    const colorStyle = useColorStyle();
  return (
    <View className='h-full' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, width: Dimensions.get('window').height * 0.44}}>

    </View>
  )
}