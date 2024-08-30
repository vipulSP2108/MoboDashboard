import { View, Text, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icons from './Icons'
import useColorStyle from '../Styles/ColorStyle';
import FontStyles from '../Styles/FontStyle';

export default Light2X2 = ({lightStatus}) => {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
        <View>
            <Icons
                iconName={'bulb'}
                mainTextContent={'Light'}
                subTextContent={lightStatus?'On':'Off'}
            />
            <View className=' w-full h-4/5 items-center justify-center'>
            <ImageBackground
                source={require('./../../assets/images/Light.png')}
                resizeMode='contain'
                style={{
                    transform: [{ scale: 1 }],
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    opacity: lightStatus ? 1 : 0.2,
                }}
            />
            </View>
        </View>
    )
}