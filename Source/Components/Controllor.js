import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Fill from './Fill'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import Slider from '@react-native-community/slider';

export default function Controllor({volumeControl, setVolumeControl, controllorHeight, controllorWidth, controllorColor}) {
    const { oneGap, oneCell } = useContext(GlobalStateContext);
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
        <>
            <View className=' justify-end overflow-hidden' style={{ borderRadius: 12, backgroundColor: controllorColor, height: controllorHeight, width: controllorWidth }} >
                <Fill value={volumeControl} gradentDown={colorStyle.diffBlue} gradentUp={colorStyle.diffYellow} slide='white' />
            </View>
            {/* colorStyle.subBg */}
            <View className=' absolute opacity-0 items-center justify-center' style={{ borderRadius: 12, backgroundColor: 'black', height: controllorHeight, width: controllorWidth }}>
                <View style={{ width: controllorHeight, transform: [{ rotate: "-90deg" }] }}>
                    <Slider
                        style={{ height: 3 * oneCell + 2 * oneGap, opacity: 1 }}
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