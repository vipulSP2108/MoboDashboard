// npm i @react-native-community/slider
const songs = [
    {
        id: '1',
        title: 'Wake Up',
        artist: 'Rise Against The Machine',
        albumArt: require('./../../assets/images/music.jpg')
    },
    {
        id: '2',
        title: 'Another Song',
        artist: 'Another Artist',
        albumArt: require('./../../assets/images/music.jpg')
    }, {
        id: '3',
        title: 'Another Song',
        artist: 'Another Artist',
        albumArt: require('./../../assets/images/music.jpg')
    }, {
        id: '4',
        title: 'Another Song',
        artist: 'Another Artist',
        albumArt: require('./../../assets/images/music.jpg')
    }, {
        id: '5',
        title: 'Another Song',
        artist: 'Another Artist',
        albumArt: require('./../../assets/images/music.jpg')
    },
];

import React, { useContext, useRef, useState } from 'react';
import { View, Animated, Text, Dimensions, ScrollView, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native';
import useColorStyle from '../Styles/ColorStyle';
import Grid2X2 from '../Components/Grid2X2';
import Grid2X1 from '../Components/Grid2X1';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import FontStyles from '../Styles/FontStyle';

const BANNER_W = Dimensions.get('window').height * 0.9; // Adjust the banner width to your preference

const MusicScreen = () => {
    const { oneGap, oneCell } = useContext(GlobalStateContext);
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();

    return (
        <View style={{ backgroundColor: colorStyle.mainBg, height: Dimensions.get('window').height }}>
            {/* <ScrollView
                horizontal

            > */}
            <View style={{ margin: 12, flexDirection: 'row', gap: oneGap }}>
                <View style={{ gap: oneGap }}>
                    <View style={{ overflow: 'hidden', borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 4 * oneCell + 3 * oneGap }} >
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
                            <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: -2 }]}>Wake Up</Text>
                            <Text style={[fontstyles.home, { color: colorStyle.subText }]}>Rise Against The Machine</Text>
                        </View>
                        <View className=' flex-row w-full items-center justify-center'>
                            <Text style={[fontstyles.numsmall, { color: colorStyle.mainText }]}>-20:20</Text>
                            <Slider
                                // className=' w-10/12'
                                style={{ width: 190 }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor={colorStyle.mainText}
                                maximumTrackTintColor={colorStyle.mainText}
                            />
                            <Text style={[fontstyles.numsmall, { color: colorStyle.mainText }]}>-20:20</Text>
                        </View>
                        <View className=' flex-row items-center justify-center gap-5'>
                            <Ionicons name='shuffle' size={25} color={colorStyle.subText} />
                            <Ionicons name='play-back' size={30} color={colorStyle.mainText} />
                            <Ionicons name='play-circle' size={45} color={colorStyle.mainText} />
                            <Ionicons name='play-forward' size={30} color={colorStyle.mainText} />
                            <Ionicons name='repeat' size={25} color={colorStyle.subText} />
                        </View>
                    </View>

                    <View style={{ gap: oneGap, flexDirection: 'row' }}>
                        <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }} />
                        <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }} />
                        <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }} />
                        <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }} />
                    </View>
                    <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 4 * oneCell + 3 * oneGap }} />
                </View>
                <View style={{ gap: oneGap }}>
                    <View className='overflow-hidden' style={{ borderRadius: 12, backgroundColor: colorStyle.subText, height: 4 * oneCell + 3 * oneGap, width: 4 * oneCell + 3 * oneGap }} >
                        <View className=' p-3 flex-row justify-between'>
                            <View className=' flex-row items-center'>
                                <Ionicons name='chevron-back-outline' size={25} color={colorStyle.mainText} />
                                <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: -2 }]}> Folder Name</Text>
                            </View>
                            <View className=' flex-row items-center'>
                                <Ionicons style={{ marginRight: 5 }} name='heart-outline' size={25} color={colorStyle.mainText} />
                                <Ionicons name='search-outline' size={25} color={colorStyle.mainText} />
                                <Ionicons name='ellipsis-vertical' size={25} color={colorStyle.mainText} />
                            </View>
                        </View>
                        <View>
                            {/* <View> */}
                            <FlatList
                                data={songs}
                                ListHeaderComponent={
                                    <View style={{backgroundColor: colorStyle.subBg}} className='flex-row justify-between rounded-t-2xl px-3 pt-3'>
                                        <View className=' flex-row items-center'>
                                            <Text style={[fontstyles.home, { color: colorStyle.mainText, marginBottom: -2 }]}>Folder Name </Text>
                                            <Ionicons name='chevron-down-outline' size={20} color={colorStyle.mainText} />
                                        </View>
                                        <View>
                                            <Ionicons name='filter' size={20} color={colorStyle.mainText} />
                                        </View>
                                    </View>
                                }
                                ListFooterComponent={
                                    <View style={{height: 52, backgroundColor: colorStyle.subBg}}/>
                                }
                                keyboardDismissMode='on-drag'
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{backgroundColor: colorStyle.subBg}} className='flex-row items-center justify-between p-3'>
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
                                contentContainerStyle={styles.listContainer}
                            />
                            {/* <View className=' flex-row items-center'>
                                    <Text style={[fontstyles.home, { color: colorStyle.mainText, marginBottom: -2 }]}>Folder Name </Text>
                                    <Ionicons name='chevron-down-outline' size={20} color={colorStyle.mainText} />
                                </View>
                                <View>
                                    <Ionicons name='filter' size={20} color={colorStyle.mainText} />
                                </View> */}
                            {/* </View> */}
                        </View>
                    </View>
                </View>
            </View>
            {/* </ScrollView> */}
        </View>
    );
};

const styles = {
    bannerContainer: {
        marginLeft: -1000,
        paddingLeft: 1000,
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: '100%',
        width: BANNER_W,
        transform: [
            {
                translateX: scrollA.interpolate({
                    inputRange: [-BANNER_W, 0, BANNER_W, BANNER_W + 1],
                    outputRange: [-BANNER_W / 2, 0, BANNER_W * 0.75, BANNER_W * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-BANNER_W, 0, BANNER_W, BANNER_W + 1],
                    outputRange: [2, 1, 0.5, 0.5],
                }),
            },
        ],
    }),
};

export default MusicScreen;