import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import useColorStyle from '../Styles/ColorStyle';

export default function Grid2X2() {
    const colorStyle = useColorStyle();
  return (
    <View style={{ 
      flex: 1, 
      borderRadius: 12, 
      backgroundColor: colorStyle.subBg, 
      aspectRatio: 1 
    }}>
      {/* Your content here */}
    </View>
  
  )
}