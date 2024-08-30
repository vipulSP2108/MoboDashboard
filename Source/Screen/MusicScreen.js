// npm i @react-native-community/slider
// npx expo install expo-av
// npx expo install expo-media-library
// npm install @reduxjs/toolkit
// npm install react-redux
// npx expo install expo-media-library
// @react-navigation/bottom-tabs

import React, { useContext, useRef, useState } from 'react';
import { View, Animated, Text, Dimensions, ScrollView, ImageBackground, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import { Ionicons } from '@expo/vector-icons';
import FontStyles from '../Styles/FontStyle';

import MusicSongList from '../Tabs/MusicSongList';
import MusicSongPlayer from '../Tabs/MusicSongPlayer';
import { MusicFolders } from '../Tabs/MusicFolders';
import Controllor from '../Components/Controllor';
import TopTabNavigator from '../Navigation/TopTabNavigator';
import Donut from '../Components/Donut';

const BANNER_W = Dimensions.get('window').height * 0.9; // Adjust the banner width to your preference

const MusicScreen = () => {
    const { oneGap, oneCell } = useContext(GlobalStateContext);
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [randomness, setRandomness] = useState(Math.floor(Math.random() * 2));
    // } ={setVolumeControl
    const backBotton = () => {
        setSelectedFolder(null);
    };

    const [muteVolume, setMuteVolume] = useState(false)
    const [levelVolume, setLevelVolume] = useState(2)

    const renderVolumeIcon = () => {
        if (muteVolume) {
            return <Ionicons name='volume-mute' size={0.45 * oneCell} color={colorStyle.diffBlue} />;
        } else if (levelVolume === 0) {
            return <Ionicons name='volume-off' size={0.45 * oneCell} color={colorStyle.diffBlue} />;
        } else if (levelVolume <= 33.33) {
            return <Ionicons name='volume-low' size={0.45 * oneCell} color={colorStyle.diffBlue} />;
        } else if (levelVolume <= 66.66) {
            return <Ionicons name='volume-medium' size={0.45 * oneCell} color={colorStyle.diffBlue} />;
        } else if (levelVolume <= 100) {
            return <Ionicons name='volume-high' size={0.45 * oneCell} color={colorStyle.diffBlue} />;
        }
        return null;
    };

    return (
        <View style={{ backgroundColor: colorStyle.mainBg, height: Dimensions.get('window').height }}>
            {/* <ScrollView
                horizontal

            > */}
            <View style={{ margin: 12, flexDirection: 'row', gap: oneGap }}>
                <View style={{ gap: oneGap }}>
                    <View style={{ overflow: 'hidden', borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 4 * oneCell + 3 * oneGap }} >
                        <MusicSongPlayer randomness={0} />
                    </View>
                    <View style={{ gap: oneGap, flexDirection: 'row' }}>
                        <ScrollView horizontal contentContainerStyle={{ alignItems: 'center' }} style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 2 * oneCell + 1 * oneGap }} >
                            <View className='flex-row p-1 justify-center'>
                                <Donut percentage={64} color={colorStyle.diffGreen} delay={0} max={100} radius={oneCell / 2.1}
                                    innerContent={<Ionicons name="phone-portrait-outline" size={25} color={colorStyle.mainText} />} />
                                <Donut percentage={77} color={colorStyle.diffGreen} delay={0} max={100} radius={oneCell / 2.1}
                                    innerContent={<Ionicons name="watch-outline" size={25} color={colorStyle.mainText} />} />
                                <Donut percentage={19} color={19 < 20 ? colorStyle.diffRed : colorStyle.diffGreen} delay={0} max={100} radius={oneCell / 2.1}
                                    innerContent={<Ionicons name="headset-outline" size={25} color={colorStyle.mainText} />} />
                            </View>
                        </ScrollView>
                        {/* <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }} /> */}
                        <TouchableOpacity className='p-2 justify-center items-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: (1 * oneCell), width: (1 * oneCell) - (0.5 * oneGap) }}>
                            <View className=' items-center justify-center p-2' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg }}>
                                <Ionicons name={'bluetooth'} size={0.45 * oneCell} color={colorStyle.diffBlue} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='p-2 justify-center items-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: (1 * oneCell), width: (1 * oneCell) - (0.5 * oneGap) }}>
                            <View className=' items-center justify-center p-2' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg }}>
                                <Ionicons name={'radio'} size={0.45 * oneCell} color={colorStyle.diffBlue} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ gap: oneGap, transform: [{ rotate: "90deg" }] }}>
                        <View style={{ opacity: muteVolume ? 0.45 : 1 }}>
                            <Controllor volumeControl={levelVolume} setVolumeControl={setLevelVolume} controllorHeight={3 * oneCell + 2 * oneGap}
                                controllorWidth={1 * oneCell} controllorColor={colorStyle.subBg} slide={'white'} gradentUp={colorStyle.diffYellow} gradentDown={colorStyle.diffBlue} />
                        </View>
                        <TouchableOpacity onLongPress={() => setLevelVolume(levelVolume < 70 ? levelVolume + 33 : 0)} onPress={() => setMuteVolume(!muteVolume)} className='p-2 justify-center items-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }}>
                            <View className=' items-center justify-center p-2' style={{ transform: [{ rotate: "-90deg" }], borderRadius: 12, backgroundColor: colorStyle.iconBg }}>
                                {renderVolumeIcon()}
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 4 * oneCell + 3 * oneGap }} /> */}
                </View>
                <View style={{ gap: oneGap }}>
                    <View className='overflow-hidden' style={{ borderRadius: 12, backgroundColor: colorStyle.subText, height: 4 * oneCell + 3 * oneGap, width: 4 * oneCell + 3 * oneGap }} >
                        {/* {selectedFolder ? <MusicSongList backBotton={backBotton} folderName={selectedFolder} /> : <MusicFolders setSelectedFolder={setSelectedFolder} />} */}
                        <TopTabNavigator />
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