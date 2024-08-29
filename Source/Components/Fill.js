import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function Fill({ value, slide, gradentUp, gradentDown }) {
    return (
        <LinearGradient
            colors={[gradentUp, gradentDown]}
            style={{ height: value+'%' }} className={`px-3 py-1 bg-white w-full rounded-2xl`} >
            <View className=' h-1 rounded-full' style={{backgroundColor: slide, opacity: 0.7}}/>
        </LinearGradient>
    )
}