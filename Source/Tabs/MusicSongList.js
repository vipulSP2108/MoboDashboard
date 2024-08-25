const BANNER_H = 160
import { View, Text, TouchableOpacity, FlatList, Image, Animated, ActivityIndicator } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import useMusicLibrary from '../Hooks/useMusicLabrary';
import SongList from './SongList';

export default function MusicSongList({ songs, backBotton, folderName }) {
    const { assets, isLoadingMore, loadMore } = useMusicLibrary()
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
                    <View className=' flex-row items-center gap-2'>
                        <Image
                            className=' w-24 h-24 rounded-lg'
                            source={require('./../../assets/images/music.jpg')}
                        />
                        <View style={{ flex: 1 }}>
                            <View className='flex-row items-center mb-2'>
                                <Text style={[fontstyles.homebig, { fontSize: 38, color: colorStyle.mainText }]}>{folderName}  </Text>
                                <Text style={[fontstyles.home, { color: colorStyle.mainBg }]}>|  {assets.length} items</Text>
                            </View>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={[fontstyles.homesmall, { lineHeight: 20, color: colorStyle.mainBg, marginBottom: -2 }]}>Home . Internal Storage . Folder Name. Home . </Text>
                        </View>
                    </View>
                </Animated.View>
                <View>
                    <SongList
                        songs={assets}
                        // onEndReachedThreshold={0.8}
                        // onEndReached={loadMore}
                        ListFooterComponent={() => isLoadingMore ?
                            <ActivityIndicator size={'large'} color={'red'} />
                            : null
                        }
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
        width: '100%',
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