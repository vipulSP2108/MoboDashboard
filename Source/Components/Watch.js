import { View, Text, Image, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';

export default function Watch() {
    const date = new Date();
    const { fontFamilies } = useContext(GlobalStateContext);
    const fontstyles = FontStyles();

    if (!fontFamilies) {
        return null;
    }

    const getDay = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }
    const colorStyle = useColorStyle();

    return (
        <>
            <ImageBackground
                source={require('./../../assets/images/clock1.png')}
                resizeMode="cover"
                style={{
                    transform: [{ scale: 1.1 }, { rotate: '40deg' }],
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    opacity: 0.6,
                }}
            />
            <View className=' h-full py-16 items-center justify-between'>
                <View className=' items-center'>
                    <Text style={[fontstyles.home, { color: colorStyle.subText }]}>{date.getDate().toString().padStart(2, '0')} . {getDay()}</Text>
                    <View className=' flex-row items-center'>
                        <Text style={[fontstyles.clock, { color: colorStyle.mainText }]}>{date.getHours().toString().padStart(2, '0')}</Text>
                        <Text style={{ color: colorStyle.mainText }} className=' text-2xl'> : </Text>
                        <Text style={[fontstyles.clock, { color: colorStyle.mainText }]}>{date.getMinutes().toString().padStart(2, '0')}</Text>
                    </View>
                </View>
                <View className=' items-center'>
                    <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: -2 }]}>20*C</Text>
                    <Text style={[fontstyles.home, { color: colorStyle.subText }]}>Your Address</Text>
                    <Text style={[fontstyles.homebold, { color: colorStyle.subText }]}>Country</Text>
                </View>
            </View>
        </>
    )
}