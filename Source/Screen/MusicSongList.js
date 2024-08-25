import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import { Songs } from '../Data/Songs';

export default function MusicSongList({ songs, backBotton, folderName }) {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
        <>
            {/* <View className=' p-3 flex-row justify-between'>
                <View className=' flex-row items-center'>
                    <Ionicons onPress={backBotton} name='chevron-back-outline' size={25} color={colorStyle.mainText} />
                    <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: -2 }]}> {folderName}</Text>
                </View>
                <View className=' flex-row items-center'>
                    <Ionicons style={{ marginRight: 5 }} name='heart-outline' size={25} color={colorStyle.mainText} />
                    <Ionicons name='search-outline' size={25} color={colorStyle.mainText} />
                    <Ionicons name='ellipsis-vertical' size={25} color={colorStyle.mainText} />
                </View>
            </View> */}
            <View className=' p-3 justify-between'>
                <View className='flex-row justify-between'>
                    <Ionicons style={{ backgroundColor: colorStyle.subBg, borderRadius: 4, padding: 2, alignItems: 'center' }} onPress={backBotton} name='chevron-back-outline' size={20} color={colorStyle.mainText} />
                    {/* <Ionicons name='' size={25} color={colorStyle.mainText} />  */}
                    <Ionicons style={{ backgroundColor: colorStyle.subBg, borderRadius: 4, padding: 2, alignItems: 'center' }} onPress={backBotton} name='search' size={20} color={colorStyle.mainText} />
                </View>
                <Image
                    className=' w-14 h-14 rounded-lg mt-7'
                    source={require('./../../assets/images/music.jpg')}
                />
                <View className='flex-row items-center -mb-1'>
                    <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: -2 }]}>{folderName}  </Text>
                    <Text style={[fontstyles.homesmall, { fontSize: 16, color: colorStyle.subBg, marginBottom: -2 }]}>|  {songs.length} items</Text>
                </View>
                <Text style={[fontstyles.homesmall, { fontSize: 16, color: colorStyle.subBg, marginBottom: -2 }]}>Home . Internal Storage . Folder Name</Text>
            </View>
            <View>
                <FlatList
                    data={songs}
                    ListHeaderComponent={
                        <View style={{ backgroundColor: colorStyle.subBg }} className='flex-row justify-between rounded-t-xl px-3 pt-3'>
                            <View className=' flex-row items-center'>
                                <Text style={[fontstyles.homesmall, { color: colorStyle.mainText, marginBottom: -2 }]}>Date added </Text>
                                <Ionicons name='chevron-down-outline' size={15} color={colorStyle.mainText} />
                            </View>
                            <View>
                                <Ionicons name='filter' size={15} color={colorStyle.mainText} />
                            </View>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={{ height: 52, backgroundColor: colorStyle.subBg }} />
                    }
                    keyboardDismissMode='on-drag'
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ backgroundColor: colorStyle.subBg }} className='flex-row items-center justify-between p-3'>
                            <View className='flex-row'>
                                <Image className=' w-14 h-14 rounded-lg' source={item.albumArt} />
                                <View className=' left-3'>
                                    <Text style={[fontstyles.home, { color: colorStyle.mainText, marginBottom: -8 }]}>{item.title}</Text>
                                    <Text style={[fontstyles.homesmall, { color: colorStyle.subText }]}>{item.artist}</Text>
                                </View>
                            </View>
                            <Ionicons name='ellipsis-vertical' size={20} color={colorStyle.mainText} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    )
}