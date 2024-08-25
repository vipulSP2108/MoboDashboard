import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import useColorStyle from '../Styles/ColorStyle';
import FontStyles from '../Styles/FontStyle';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
// albumId	:	-1762193519
// creationTime	:	17230045380002024-08-07T04:22:18.000Z
// duration	:	82.025
// filename	:	Call recording Aappaji_240807_095055.m4a
// height	:	0
// id	:	1000138167
// mediaType	:	audio
// modificationTime	:	17230045380002024-08-07T04:22:18.000Z
// uri	:	file:///storage/emulated/0/Recordings/Call/Call recording Aappaji_240807_095055.m4a
// width	:	0

export default function SongList({ songs, ...otherProps }) {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
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
                <TouchableOpacity style={{ backgroundColor: colorStyle.subBg }} className='flex-row items-center justify-between p-3'>
                    <View className='flex-row'>
                        <Image className=' w-14 h-14 rounded-lg' source={item.albumArt} />
                        <View className=' left-3'>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.home, { color: colorStyle.mainText, marginBottom: -8 }]}>{TruncatedTextComponent(item.filename, 21)}</Text>
                            <Text style={[fontstyles.homesmall, { color: colorStyle.subText }]}>{item.artist}</Text>
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