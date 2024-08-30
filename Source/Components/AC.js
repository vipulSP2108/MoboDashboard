import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Icons from './Icons'
import Controllor from './Controllor'
import { Ionicons } from '@expo/vector-icons'
import useColorStyle from '../Styles/ColorStyle'
import FontStyles from '../Styles/FontStyle'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function AC({ oneCell, randomness, ACControllor, setACControllor }) {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();

    function convertVolumeControl(value) {
        const minOld = 0;
        const maxOld = 100;
        const minNew = 15;
        const maxNew = 29;
        const newValue = minNew + ((value - minOld) / (maxOld - minOld)) * (maxNew - minNew);
        return newValue;
    }

    const [fanSpeed, setFanSpeed] = useState(0);
    const [ACmode, setACmode] = useState(1);
    const [active, setActive] = useState(true);

    return (
<>
            <Icons
                iconName={'snow'}
                mainTextContent={'Air'}
                subTextContent={`${(ACmode % 2 === 0 ? 'Panel' : '')}${(ACmode % 3 === 0 ? 'Floor' : '')}${(ACmode % 3 !== 0 && ACmode % 2 !== 0 ? 'Off' : '')} | Fan x${fanSpeed}`}
            />
            {
                randomness <= 6?
                    <>
                        <ImageBackground
                            source={require('./../../assets/images/AC3.png')}
                            resizeMode="cover"
                            style={{
                                top: 70,
                                // transform: [{ scale: 1.1 }, { rotate: '40deg' }],
                                width: '75%',
                                height: '75%',
                                position: 'absolute',
                                opacity: active ? 0.45 : 1
                            }}
                        />
                        <View style={{opacity: active ? 0.45 : 1}} className={` items-end `}>
                            <View className=' absolute left-6 top-10 flex-row'>
                                <Text style={[fontstyles.numsmall, { color: colorStyle.diffBlue }]}>{convertVolumeControl(ACControllor).toFixed()}</Text>
                                <Text style={[fontstyles.homesmall, { marginTop: 2, color: colorStyle.diffBlue }]}>°c</Text>
                            </View>
                            <Controllor volumeControl={ACControllor} setVolumeControl={setACControllor} controllorHeight={(3 * oneCell) * 0.7} controllorWidth={(1 * oneCell) * 0.7} controllorColor={colorStyle.iconBg}
                                slide={'white'} gradentUp={colorStyle.diffYellow} gradentDown={colorStyle.diffBlue} />
                        </View>
                    </>
                    :
                    <View className={` items-center gap-3 -mt-7 ${active && 'opacity-10'}`}>
                        <View className=' flex-row items-end justify-end'>
                            <Text style={[fontstyles.homebold, { fontSize: 39, color: colorStyle.mainText }]}>{ACControllor}</Text>
                            <Text style={[fontstyles.homebold, { fontSize: 30, marginBottom: -10, color: colorStyle.subText }]}> °c</Text>
                        </View>
                        <LinearGradient
                            // start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            colors={[colorStyle.diffYellow, colorStyle.diffBlue]}
                            className=' w-28 h-28 bg-slate-200 rounded-full items-center justify-center'
                        >
                            <View style={{ backgroundColor: colorStyle.mainText }} className=' w-6 h-6 rounded-full' />
                        </LinearGradient>
                    </View>
            }
            <View className=' flex-row justify-between'>
                <TouchableOpacity onPress={() => setActive(!active)} className='items-center justify-center' style={{ borderRadius: 12, backgroundColor: active ? colorStyle.iconBg : 'red', height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
                    <Ionicons name={'power'} size={29} color={colorStyle.mainText} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setACmode(ACmode < 3 ? ACmode + 1 : 0)} className=' items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
                    <ImageBackground
                        source={require('./../../assets/images/Seating.png')}
                        resizeMode='contain'
                        className={`w-6 h-7 ${ACmode != 1 && '-right-1'}`}
                    />
                    <Ionicons style={{ position: 'absolute', top: 5, left: 12, opacity: ACmode % 2 == 0 ? 1 : 0 }} name={'arrow-forward'} size={19} color={colorStyle.mainText} />
                    <Ionicons style={{ position: 'absolute', top: 15, left: 2, opacity: ACmode % 3 == 0 ? 1 : 0 }} name={'arrow-down'} size={19} color={colorStyle.mainText} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFanSpeed(fanSpeed < 4 ? fanSpeed + 1 : 0)} className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
                    <Ionicons style={{ transform: [{ rotate: fanSpeed * 25 + 'deg' }] }} name={'medical'} size={29} color={colorStyle.mainText} />
                    <View style={{ height: `${fanSpeed * 25}%`, backgroundColor: colorStyle.subText }} className={`absolute -z-30 w-full bottom-0`} />
                </TouchableOpacity>
            </View>
            </>
    )
}