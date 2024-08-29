import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Fill from './Fill'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';

export default function Controllor({ volumeControl, setVolumeControl, controllorHeight, controllorWidth, controllorColor, slide, gradentUp, gradentDown }) {
    const { oneGap, oneCell } = useContext(GlobalStateContext);
    // const colorStyle = useColorStyle();
    // const fontstyles = FontStyles();
    return (
        <>
            <View className=' justify-end overflow-hidden' style={{ borderRadius: 12, backgroundColor: controllorColor, height: controllorHeight, width: controllorWidth }} >
                <LinearGradient
                    colors={[gradentUp, gradentDown]}
                    style={{ height: volumeControl + '%' }} className={`px-3 py-1 bg-white w-full rounded-2xl`} >
                    <View className=' h-1 rounded-full' style={{ backgroundColor: slide, opacity: 0.7 }} />
                </LinearGradient>
                {/* <Fill value={volumeControl} slide={slide} gradentUp={gradentUp} gradentDown={gradentDown}/> */}
            </View>
            {/* colorStyle.subBg */}
            <View className=' absolute opacity-0 items-center justify-center' style={{ borderRadius: 12, backgroundColor: 'black', height: controllorHeight, width: controllorWidth }}>
                <View style={{ width: controllorHeight, transform: [{ rotate: "-90deg" }] }}>
                    <Slider
                        style={{ height: 3 * oneCell + 2 * oneGap }}
                        onValueChange={(value) => setVolumeControl(value)}
                        vertical={true}
                        value={volumeControl}
                        minimumValue={0}
                        maximumValue={100}
                    />
                </View>
            </View>
        </>
    )
}