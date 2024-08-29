import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import { Ionicons } from '@expo/vector-icons';

export default function Icons({iconName, mainTextContent, subTextContent}) {
    const { oneGap, oneCell } = useContext(GlobalStateContext);
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();

    return (
        <View className=' flex-row gap-3'>
            <View className=' items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg, height: (1 * oneCell) * 0.6, width: (1 * oneCell) * 0.6 }}>
                <Ionicons name={iconName} size={0.35 * oneCell} color={colorStyle.diffBlue} />
            </View>
            <View>
                <Text style={[fontstyles.homebig, { color: colorStyle.mainText }]}>{mainTextContent}</Text>
                <Text style={[fontstyles.homesmall, {  marginTop: 2, color: colorStyle.subText }]}>{subTextContent}</Text>
            </View>
        </View>
    )
}