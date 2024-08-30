import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import Donut from './Donut';

export default function AC2x2({ ACControllor, setScrollEnabled }) {
    function convertVolumeControl(value) {
        const minOld = 0;
        const maxOld = 100;
        const minNew = 15;
        const maxNew = 29;
        const newValue = minNew + ((value - minOld) / (maxOld - minOld)) * (maxNew - minNew);
        return newValue;
    }

    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
        <>
            <Text style={[fontstyles.home, { marginTop: -3, color: colorStyle.mainText }]}>Temprature</Text>
            <TouchableWithoutFeedback
                onPressIn={() => setScrollEnabled(false)}
                onPressOut={() => setScrollEnabled(true)}
            >
                <View className=' p-1'>
                    <View
                        // backgroundColor: colorStyle.diffBlue,
                        style={{
                            // backgroundColor: colorStyle.diffBlue,
                            shadowColor: colorStyle.diffBlue,
                            shadowOpacity: 0.3, // Shadow opacity
                            shadowRadius: 20, // Shadow blur radius
                            shadowOffset: { width: 0, height: 15 }, // Lift effect
                            elevation: 15,
                        }} className=' h-24 w-24 self-center justify-center rounded-full ' >
                        <View style={{ position: 'absolute', backgroundColor: colorStyle.subBg }} className='flex-row h-20 w-20 items-center justify-center self-center rounded-full' />
                        <Donut percentage={ACControllor} strokeWidth = {15} color={colorStyle.diffBlue} delay={0} max={100} radius={50}
                            innerContent={
                                <View className=' flex-row'>
                                    <Text style={[fontstyles.homebold, { fontSize: 27, marginTop: -11, color: colorStyle.mainText }]}>{convertVolumeControl(ACControllor).toFixed()}</Text>
                                    <Text style={[fontstyles.homebold, { fontSize: 20, marginTop: -8, color: colorStyle.subText }]}> °c</Text>
                                </View>
                            } />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}