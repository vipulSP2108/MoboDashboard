import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';

export default function AC2x2({ setScrollEnabled }) {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
        <>
            <Text style={[fontstyles.home, { marginTop: -3, color: colorStyle.mainText }]}>Temprature</Text>
            <TouchableWithoutFeedback
                onPressIn={() => setScrollEnabled(false)}
                onPressOut={() => setScrollEnabled(true)}
            >
                <View className=' bg-slate-50  p-1'>
                    <View
                        onPressIn={() => setScrollEnabled(false)}
                        onPressOut={() => setScrollEnabled(true)}
                        style={{ backgroundColor: colorStyle.diffBlue }} className=' h-24 w-24 self-center justify-center rounded-full ' >
                        <View style={{ backgroundColor: colorStyle.subBg }} className='flex-row h-16 w-16 items-center justify-center self-center rounded-full' >
                            <Text style={[fontstyles.homebold, { fontSize: 27, marginTop: -11, color: colorStyle.mainText }]}>25</Text>
                            <Text style={[fontstyles.homebold, { fontSize: 20, marginTop: -8, color: colorStyle.subText }]}> °c</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}