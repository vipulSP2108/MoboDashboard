const BANNER_H = 200
import { View, Text, TouchableOpacity, FlatList, Image, Animated } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';

export default function MusicSongList({ songs, backBotton, folderName }) {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    const scrollA = useRef(new Animated.Value(0)).current;


    return (
        <>
            <Animated.View
                style={[
                    styles.headerbanner(scrollA),
                    {
                        height: 45, // Adjust this based on your header height
                        width: '100%',
                        position: 'absolute', // This ensures the header stays fixed at the top
                        top: 0,
                        left: 0,
                        zIndex: 10, // Ensure the header stays on top of other content
                        backgroundColor: colorStyle.diffBlue // Adjust as needed
                    }
                ]}
            >
                <View className='p-2 flex-row justify-between'>
                    <View className='flex-row items-center'>
                        <Ionicons onPress={backBotton} name='chevron-back' size={25} color={colorStyle.mainBg} />
                        <Text style={[fontstyles.homebig, { color: colorStyle.mainBg, marginBottom: -2 }]}> {folderName}</Text>
                    </View>
                    <View className='flex-row items-center'>
                        <Ionicons style={{ marginRight: 5 }} name='heart' size={25} color={colorStyle.mainBg} />
                        <Ionicons name='search' size={25} color={colorStyle.mainBg} />
                        <Ionicons name='ellipsis-vertical' size={25} color={colorStyle.mainBg} />
                    </View>
                </View>
            </Animated.View>
            <Animated.ScrollView
                // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}
            >

                <Animated.View
                    style={styles.banner(scrollA)}
                    className=' p-3 justify-between'>
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
                        <Text style={[fontstyles.homebig, { color: colorStyle.mainText }]}>{folderName}  </Text>
                        <Text style={[fontstyles.homesmall, { fontSize: 16, color: colorStyle.mainBg}]}>|  {songs.length} items</Text>
                    </View>
                    <Text style={[fontstyles.homesmall, { fontSize: 16, color: colorStyle.mainBg, marginBottom: -2 }]}>Home . Internal Storage . Folder Name</Text>
                </Animated.View>
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
            </Animated.ScrollView>
        </>
    )
}


const styles = {
    headerbanner: scrollA => ({
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [0, BANNER_H],
                    outputRange: [-45, 0],
                    extrapolate: 'clamp',
                }),
            },
        ],
        opacity: scrollA.interpolate({
            inputRange: [0, BANNER_H],
            outputRange: [0, 0.9], // Fade out as it scrolls up
        }),
    }),
    bannerContainer: {
        marginTop: -BANNER_H / 2,
        paddingTop: BANNER_H / 2,
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: BANNER_H,
        width: '200%',
        opacity: scrollA.interpolate({
            inputRange: [0, BANNER_H * 0.9],
            outputRange: [1, 0], // Fade out as it scrolls up
        }),
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.80, BANNER_H * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [1, 1, 1, 0.1],
                }),
            },
        ],
    }),
};