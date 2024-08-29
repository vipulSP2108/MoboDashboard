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
            <ImageBackground
                source={require('./../../assets/images/Light.png')}
                resizeMode='contain'

                style={{
                    top: 70,
                    right: 5,
                    transform: [{ scale: 2 }],
                    width: '105%',
                    height: '105%',
                    position: 'absolute',
                    opacity: lightStatus ? 1 : 0.2,
                }}
            />
        </View>
    )
}