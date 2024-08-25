import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import useColorStyle from '../Styles/ColorStyle';
import FontStyles from '../Styles/FontStyle';
import { useSelector } from 'react-redux';
import { FormatTime } from '../Components/FormatTime';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';

export default function MusicSongPlayer() {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    const selectedItem = useSelector((state) => state.queue.selectedItem);

    return (
        <>
        {console.log(selectedItem)}
            <Image
                source={require('./../../assets/images/music.jpg')}
                resizeMode='cover'
                blurRadius={4}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    opacity: 0.2,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                }}
            />
            <View className=' h-2/4 items-center justify-center'>
                <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: -2 }]}>{TruncatedTextComponent(selectedItem.filename, 21)}</Text>
                <Text style={[fontstyles.home, { color: colorStyle.subText }]}>{FormatTime(selectedItem.duration)}</Text>
            </View>
            <View className=' flex-row w-full items-center justify-center'>
                <Text style={[fontstyles.numsmall, { color: colorStyle.mainText }]}>-20:20</Text>
                <Slider
                    // className=' w-10/12'
                    style={{ width: 190 }}
                    minimumValue={0}
                    maximumValue={selectedItem.duration}
                    minimumTrackTintColor={colorStyle.mainText}
                    maximumTrackTintColor={colorStyle.mainText}
                />
                <Text style={[fontstyles.numsmall, { color: colorStyle.mainText }]}>{FormatTime(selectedItem.duration)}</Text>
            </View>
            <View className=' flex-row items-center justify-center gap-5'>
                <Ionicons name='shuffle' size={25} color={colorStyle.subText} />
                <Ionicons name='play-back' size={30} color={colorStyle.mainText} />
                <Ionicons name='play-circle' size={45} color={colorStyle.mainText} />
                <Ionicons name='play-forward' size={30} color={colorStyle.mainText} />
                <Ionicons name='repeat' size={25} color={colorStyle.subText} />
            </View>
        </>
    )
}