// npm i @react-native-community/slider
// npx expo install expo-av
// npx expo install expo-media-library
// npm install @reduxjs/toolkit
// npm install react-redux
// expo-music-library
// npx expo install expo-media-library
// react-native-fs
// npx expo install expo-document-picke
// "android": "expo run:android",
// "ios": "expo run:ios",    
// "expo": "^51.0.31",    
// "react-native-fs": "^2.20.0",

import React, { useContext, useRef, useState } from 'react';
import { View, Animated, Text, Dimensions, ScrollView, ImageBackground, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import { Ionicons } from '@expo/vector-icons';
import FontStyles from '../Styles/FontStyle';

import { Songs } from '../Data/Songs';
import MusicSongList from '../Tabs/MusicSongList';
import MusicSongPlayer from '../Tabs/MusicSongPlayer';
import { MusicFolders } from '../Tabs/MusicFolders';

const BANNER_W = Dimensions.get('window').height * 0.9; // Adjust the banner width to your preference

const MusicScreen = () => {
    const { oneGap, oneCell } = useContext(GlobalStateContext);
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    const [selectedFolder, setSelectedFolder] = useState(null);

    const backBotton = () => {
        setSelectedFolder(null);
    };

    return (
        <View style={{ backgroundColor: colorStyle.mainBg, height: Dimensions.get('window').height }}>
            {/* <ScrollView
                horizontal

            > */}
            <View style={{ margin: 12, flexDirection: 'row', gap: oneGap }}>
                <View style={{ gap: oneGap }}>
                    <View style={{ overflow: 'hidden', borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 4 * oneCell + 3 * oneGap }} >
                        <MusicSongPlayer />
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
                        {selectedFolder ? <MusicSongList songs={Songs[selectedFolder]} backBotton={backBotton} folderName={selectedFolder} /> : <MusicFolders setSelectedFolder={setSelectedFolder} />}
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