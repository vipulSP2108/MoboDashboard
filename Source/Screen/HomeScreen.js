import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import useColorStyle from '../Styles/ColorStyle';

export default function HomeScreen() {
    const colorStyle = useColorStyle();
    return (
        <ScrollView horizontal style={{ backgroundColor: colorStyle.mainbg }}>
            <View >

            </View>
            <View style={{ width: 800, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Hello</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Hello</Text>
            </View>
        </ScrollView>
    )
}