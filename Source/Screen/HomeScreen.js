// npx expo install react-native-gesture-handler
// expo-location
// npx expo install expo-linear-gradient

const setGap = 2
const BANNER_W = Dimensions.get('window').height * 0.9;

import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Animated, Text, Dimensions } from 'react-native';
import Watch from '../Components/Watch';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import MusicSongPlayer from '../Tabs/MusicSongPlayer';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import Icons from '../Components/Icons';
import Fill from '../Components/Fill';

const HomeScreen = () => {
    const { locationCoords, setLocationCoords, oneGap, setOneGap, oneCell, setOneCell } = useContext(GlobalStateContext);

    const [parentHeight, setParentHeight] = useState(0);
    const parentRef = useRef(null);

    useEffect(() => {
        setOneGap(7 * setGap);
        setOneCell((parentHeight / 4) - (4 * setGap))
    }, [parentHeight, setGap, setOneGap, setOneCell]);

    useEffect(() => {
        const getLocation = async () => {
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocationCoords(currentLocation);
            console.log("Location Updated");
        };
        getLocation();
    }, []);

    const scrollA = useRef(new Animated.Value(0)).current;
    const colorStyle = useColorStyle();

    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setParentHeight(height);
    };

    const [volumeControl, setVolumeControl] = useState(0);
    return (
        <View>
            <Animated.ScrollView
                horizontal
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}
                style={{ backgroundColor: colorStyle.mainBg }}
            >
                <View style={styles.bannerContainer}>
                    <Animated.View style={styles.banner(scrollA)}>
                        <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').height * 0.9 }}>
                            <Watch />
                        </View>
                    </Animated.View>
                </View>

                <View onLayout={handleLayout} ref={parentRef} style={{ margin: 14, columnGap: 12 }} className='flex-row justify-between'>
                    <View style={{ gap: oneGap, flexDirection: 'row' }}>
                        <View className=' items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 3 * oneCell + 2 * oneGap, width: 1 * oneCell }}>
                            <View style={{ width: 3 * oneCell + 2 * oneGap, transform: [{ rotate: "-90deg" }] }}>
                                <Slider
                                    style={{ height: 3 * oneCell + 2 * oneGap, opacity: 1 }}
                                    onValueChange={(value) => setVolumeControl(value)}
                                    vertical={true}
                                    value={volumeControl}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor={colorStyle.mainText}
                                    maximumTrackTintColor={colorStyle.mainText}
                                />
                            </View>
                        </View>
                        <View className=' p-3 justify-between' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 4 * oneCell + 3 * oneGap, width: 2 * oneCell + 3 * oneGap }}>
                            <Icons iconName={'snow'} mainTextContent={'Air'} subTextContent={'mode | status'} />
                            <View className='items-end'>
                                <View className=' justify-end overflow-hidden' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg, height: (3 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
                                    <Fill value={volumeControl} gradentDown={colorStyle.diffBlue} gradentUp={colorStyle.diffYellow} slide='white' />
                                </View>
                                {/* colorStyle.subBg */}
                                <View className=' absolute opacity-0 items-center justify-center' style={{ borderRadius: 12, backgroundColor: 'black', height: (3 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }}>
                                    <View style={{ width: (3 * oneCell) * 0.7, transform: [{ rotate: "-90deg" }] }}>
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
                            </View>
                            <View className=' flex-row justify-between'>
                                <View className=' items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} />
                                <View className=' items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} />
                                <View className=' items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
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

export default HomeScreen;