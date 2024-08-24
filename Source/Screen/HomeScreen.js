import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import useColorStyle from '../Styles/ColorStyle';

export default function HomeScreen() {
    const colorStyle = useColorStyle();
    return (
        <ScrollView horizontal style={{ backgroundColor: colorStyle.mainbg }}>
            <View className='items-center justify-center' style={{ height: Dimensions.get('window').height * 1, width: Dimensions.get('window').height * 0.9 }}>
                <View className=" rotate-12 flex-row">
                    <View style={{ height: Dimensions.get('window').height * 0.8, width: Dimensions.get('window').height * 0.4 }} className='overflow-hidden'>
                        <View style={{ height: Dimensions.get('window').height * 0.8, width: Dimensions.get('window').height * 0.8 }} className=' rounded-full bg-slate-200'>

                        </View>
                    </View>
                    <View style={{ height: Dimensions.get('window').height * 0.8, width: Dimensions.get('window').height * 0.4 }} className='rotate-180 overflow-hidden'>
                        <View style={{ height: Dimensions.get('window').height * 0.8, width: Dimensions.get('window').height * 0.8 }} className=' rounded-full bg-slate-500'>

                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}