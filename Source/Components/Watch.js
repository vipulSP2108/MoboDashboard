import { View, Text, Image, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import reverseGeocode from './toAddress';
import * as Location from 'expo-location';

export default function Watch() {
    const [date, setDate] = useState(new Date());
    const [lastLocation, setLastLocation] = useState();
    const [Address, setAddress] = useState();
    const { fontFamilies, locationCoords } = useContext(GlobalStateContext);
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
                <View className=' items-center'>
                    {/* {console.log(Address)} */}
                    {/* <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: 1 }]}>20°C</Text> */}
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
                </View>
            </View>
        </>
    )
}