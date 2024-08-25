// {
// 	"albumId": "-1762193519",
// 	"creationTime": 1724581146000,
// 	"duration": 266.684,
// 	"filename": "Call recording Home Minister_240825_154438.m4a",
// 	"height": 0,
// 	"id": "1000156675",
// 	"mediaType": "audio",
// 	"modificationTime": 1724581146000,
// 	"uri": "file:///storage/emulated/0/Recordings/Call/Call recording Home Minister_240825_154438.m4a",
// 	"width": 0
// }

import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import useColorStyle from '../Styles/ColorStyle';
import FontStyles from '../Styles/FontStyle';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMusic } from '../Fetures/Queue/QueueSlice';
import { FormatTime } from '../Components/FormatTime';

export default function SongList({ songs, ...otherProps }) {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    const dispatch = useDispatch();
    const selectedItem = useSelector((state) => state.queue.selectedItem);

    const handleItemPress = (item) => {
        dispatch(setSelectedMusic(item)); // Dispatch action to update selected item
    };

    return (
        <FlatList
            data={songs}
            ListHeaderComponent={
                <View style={{ backgroundColor: colorStyle.subBg }} className='flex-row justify-between rounded-t-xl px-3 pt-3'>
                    <View className=' flex-row items-center'>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.homesmall, { color: colorStyle.mainText, marginBottom: -2 }]}>Date added </Text>
                        <Ionicons name='chevron-down-outline' size={15} color={colorStyle.mainText} />
                    </View>
                    <View>
                        <Ionicons name='filter' size={15} color={colorStyle.mainText} />
                    </View>
                </View>
            }
            keyboardDismissMode='on-drag'
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item)} style={{ backgroundColor: item.id === selectedItem?.id ? 'red' : colorStyle.subBg }} className='flex-row items-center justify-between p-3'>
                    <View className='flex-row'>
                        <Image className=' w-14 h-14 rounded-lg' source={item.albumArt} />
                        <View className=' left-3'>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.home, { color: colorStyle.mainText, marginBottom: -8 }]}>{TruncatedTextComponent(item.filename, 21)}</Text>
                            <Text style={[fontstyles.homesmall, { color: colorStyle.subText }]}>{FormatTime(item.duration)}</Text>
                        </View>
                    </View>
                    <Ionicons name='ellipsis-vertical' size={20} color={colorStyle.mainText} />
                </TouchableOpacity>
            )}
            keyExtractor={(_, index) => index.toString()}
            // showsVerticalScrollIndicator={false}
            {...otherProps}
        />
    )
}