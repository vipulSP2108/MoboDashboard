import { View, Text, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SplashScreen() {
    const { date, } = useContext(GlobalStateContext);
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();

    const getDay = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }
    
    return (
        <TouchableOpacity activeOpacity={1} className=' flex-row h-full w-full' style={{ backgroundColor: colorStyle.mainBg }}>
            <View className=' mr-5'>
                <Text style={[fontstyles.clock, { color: colorStyle.diffBlue }]}>{date.getHours().toString().padStart(2, '0')}</Text>
                <Text style={[fontstyles.home, { color: colorStyle.subText }]}>{date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}</Text>
            </View>

            <View>
                <Text style={[fontstyles.clock, { color: colorStyle.diffBlue }]}>{date.getMinutes().toString().padStart(2, '0')}</Text>
                <Text style={[fontstyles.home, { color: colorStyle.subText }]}>{getDay()}</Text>
            </View>
        </TouchableOpacity>
    )
}