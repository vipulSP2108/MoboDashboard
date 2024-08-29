import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import reverseGeocode from './toAddress';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function Watch({ oneGap, oneCell }) {
    const [lastLocation, setLastLocation] = useState();
    const [Address, setAddress] = useState();
    const { fontFamilies, locationCoords, date, setDate } = useContext(GlobalStateContext);
    const fontstyles = FontStyles();

    function capitalize(sentence) {
        return sentence
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(' ');
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if (!fontFamilies) {
        return null;
    }

    const getDay = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }
    const colorStyle = useColorStyle();

    const reverseGeocode = async (locationCoords) => {
        const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
            longitude: locationCoords.coords.longitude,
            latitude: locationCoords.coords.latitude
        });
        setAddress(reverseGeocodedAddress);
    };

    if (locationCoords !== lastLocation) {
        console.log("Updating Address");
        setLastLocation(locationCoords);
        reverseGeocode(locationCoords);
        console.log(Address);
    }

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
            <View className=' h-full py-12 items-center justify-between'>
                <View className=' items-center'>
                    <Text style={[fontstyles.home, { color: colorStyle.subText }]}>{date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')} . {getDay()}</Text>
                    <View className=' flex-row items-center'>
                        <Text style={[fontstyles.clock, { color: colorStyle.mainText }]}>{date.getHours().toString().padStart(2, '0')}</Text>
                        <Text style={{ color: colorStyle.mainText }} className=' text-2xl'> : </Text>
                        <Text style={[fontstyles.clock, { color: colorStyle.mainText }]}>{date.getMinutes().toString().padStart(2, '0')}</Text>
                    </View>
                </View>
                {/* <View className=' items-center'>
                    <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: 1 }]}>20°C</Text>
                    {Address && Address.length > 0 && Address[0]?.formattedAddress && (
                        <>
                            <Text numberOfLines={2} className='text-center' style={[fontstyles.home, { marginBottom: -5, color: colorStyle.subText, lineHeight: 22 }]}>
                                {capitalize(Address[0]?.formattedAddress.replace(`, ${Address[0]?.country}`, ''))}
                            </Text>
                            <Text style={[fontstyles.homebold, { color: colorStyle.subText }]}>
                                {Address[0]?.country.toUpperCase()}
                            </Text>
                        </>
                    )}
                </View> */}
                <View className=' flex-row gap-4 top-6'>
                    <TouchableOpacity className=' h-14 w-[43%] rounded-xl justify-center px-2' style={{ backgroundColor: colorStyle.subBg }}>
                        <View className=' flex-row gap-2'>
                            <View className=' p-2 rounded-full'>
                                <Ionicons name={'bag'} size={20} color={colorStyle.mainText} />
                            </View>
                            <View>
                                <Text style={[fontstyles.home, { marginTop: -3, color: colorStyle.mainText }]}>mainText</Text>
                                <Text style={[fontstyles.homesmall, { marginTop: 4, color: colorStyle.subText }]}>subText</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className=' h-14 w-[43%] rounded-xl justify-center px-2' style={{ backgroundColor: colorStyle.subBg }}>
                        <View className=' flex-row gap-2'>
                            <View className=' p-2 rounded-full'>
                                <Ionicons name={'bulb'} size={20} color={colorStyle.mainText} />
                            </View>
                            <View>
                                <Text style={[fontstyles.home, { marginTop: -3, color: colorStyle.mainText }]}>Light</Text>
                                <Text style={[fontstyles.homesmall, { marginTop: 4, color: colorStyle.subText }]}>on</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}