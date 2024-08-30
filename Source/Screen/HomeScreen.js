// npx expo install react-native-gesture-handler
// expo-location
// npx expo install expo-linear-gradient
// npx expo install expo-battery
// expo install expo-file-system

const setGap = 2
const BANNER_W = Dimensions.get('window').height * 0.9;

import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Animated, Text, Dimensions, ImageBackground, AppState, TouchableWithoutFeedback } from 'react-native';
import Watch from '../Components/Watch';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import MusicSongPlayer from '../Tabs/MusicSongPlayer';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import Icons from '../Components/Icons';
import Fill from '../Components/Fill';
import Controllor from '../Components/Controllor';
import FontStyles from '../Styles/FontStyle';
import { Ionicons } from '@expo/vector-icons';
import AC from '../Components/AC';
import AC2x2 from '../Components/AC2x2';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Light2X2 from '../Components/Light2X2';
import { useBatteryLevel, useBatteryState } from 'expo-battery';
import Recording from '../Components/Recording';


const HomeScreen = ({ navigation }) => {
    const batteryLevel = useBatteryLevel();
    const batteryState = useBatteryState();

    const { lightStatus, setLightStatus, date, locationCoords, setLocationCoords, oneGap, setOneGap, oneCell, setOneCell } = useContext(GlobalStateContext);
    // const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    const [parentHeight, setParentHeight] = useState(0);
    const parentRef = useRef(null);
    const [randomness, setRandomness] = useState(Math.floor(Math.random() * 7));

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

    const [ACControllor, setACControllor] = useState(20);

    const getDay = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }

    const inactivityTimer = useRef(null);
    const appState = useRef(AppState.currentState);

    // Function to reset inactivity timer
    const resetInactivityTimer = () => {
        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
        }
        inactivityTimer.current = setTimeout(() => {
            navigation.navigate('InActiveScreen');
        }, 300000); // 30 seconds
    };

    useEffect(() => {
        // Set up the inactivity timer when the component mounts
        resetInactivityTimer();

        // Listen to app state changes
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            // Cleanup the timer when the component unmounts
            if (inactivityTimer.current) {
                clearTimeout(inactivityTimer.current);
            }
            // Remove app state change listener
            subscription.remove();
        };
    }, []);

    // Handle app state change to reset timer on foreground
    const handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            resetInactivityTimer();
        }
        appState.current = nextAppState;
    };

    const [scrollEnabled, setScrollEnabled] = useState(true);

    return (

        <View
            style={styles.container}
            onStartShouldSetResponder={() => {
                resetInactivityTimer();
                return false; // Indicates this responder doesn't block touches to other components
            }}
        >
            <Animated.ScrollView
                scrollEnabled={scrollEnabled}
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
                            <Watch oneCell={oneCell} oneGap={oneGap} ACControllor={ACControllor} />
                        </View>
                    </Animated.View>
                </View>

                <View onLayout={handleLayout} ref={parentRef} style={{ margin: 14, columnGap: 12 }} className='flex-row justify-between'>
                    <View style={{ gap: oneGap, flexDirection: 'row' }}>
                        <View className='p-3 justify-between' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 4 * oneCell + 3 * oneGap, width: 2 * oneCell + 3 * oneGap }}>
                            <AC oneCell={oneCell} randomness={randomness} ACControllor={ACControllor} setACControllor={setACControllor} />
                        </View>
                        <View style={{ gap: oneGap }}>
                            <View style={{ overflow: 'hidden', borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 4 * oneCell + 1 * oneGap }} >
                                <MusicSongPlayer randomness={1} />
                            </View>
                            <View style={{ gap: oneGap }} className=' flex-row'>
                                <TouchableOpacity onPress={() => setLightStatus(!lightStatus)} className='p-2 justify-between' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 2 * oneCell }}>
                                    <Light2X2 lightStatus={lightStatus} />
                                </TouchableOpacity>
                                <View style={{ gap: oneGap }} >
                                    <TouchableOpacity className=' flex-row overflow-hidden p-2 justify-center items-start' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: (1 * oneCell), width: (2 * oneCell) }}>
                                        <Text className=' z-30 self-center' style={[fontstyles.clock, { marginTop: -10, color: colorStyle.mainText }]}>20</Text>
                                        <Text style={[fontstyles.homebig, { zIndex: 20, marginTop: 20, color: colorStyle.mainText }]}> °c</Text>
                                        <View className=' absolute -bottom-4 left-2'>
                                            <Ionicons name={'cloud'} size={0.85 * oneCell} color={colorStyle.diffBlue} />
                                        </View>
                                        <View className=' absolute -top-4 right-2 rotate-180'>
                                            <Ionicons name={'cloudy'} size={0.85 * oneCell} color={colorStyle.diffYellow} />
                                        </View>
                                    </TouchableOpacity>
                                    <View className=' flex-row' gap={oneGap}>
                                        <TouchableOpacity onPress={() => navigation.navigate('InActiveScreen')} className='p-2 justify-end' style={{ borderRadius: 12, backgroundColor: colorStyle.diffYellow, height: 1 * oneCell, width: (1 * oneCell) - (0.5 * oneGap) }}>
                                            <Ionicons name={'moon'} size={0.35 * oneCell} color={colorStyle.mainBg} />
                                            <View className=' flex-row'>
                                                <Text style={[fontstyles.homebold, { marginBottom: -7, zIndex: 20, fontSize: 20, color: colorStyle.mainBg }]}>Sleep</Text>
                                                {/* <Text style={[fontstyles.homesmall, { marginTop: 2, color: colorStyle.subBg }]}>Sleep</Text> */}
                                            </View>
                                        </TouchableOpacity>
                                        <Recording />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ gap: oneGap }}>
                            <View className='p-3' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 2 * oneCell }}>
                                <View className=' flex-row gap-x-1 items-center'>
                                    <Ionicons name={'calendar'} size={0.30 * oneCell} color={colorStyle.mainText} />
                                    <Text style={[fontstyles.home, { marginTop: -10, color: colorStyle.mainText }]}> Calendar</Text>
                                </View>
                                <View className=' h-4/5 w-full items-center justify-center'>
                                    <Text style={[fontstyles.clock, { color: colorStyle.mainText }]}>{date.getDate().toString().padStart(2, '0')}</Text>
                                    <Text style={[fontstyles.home, { marginTop: -10, color: colorStyle.subText }]}>{getDay()}</Text>
                                    {/* {date.getDay().toString().padStart(2, '0')} */}
                                </View>
                            </View>
                            <View className='p-3 justify-between' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 2 * oneCell }}>
                                <View className=' flex-row gap-x-1 items-center'>
                                    <Ionicons name={'time'} size={0.30 * oneCell} color={colorStyle.mainText} />
                                    <Text style={[fontstyles.home, { marginTop: -10, color: colorStyle.mainText }]}> Clock</Text>
                                </View>
                                <View className=' h-4/5 w-full items-center justify-center'>
                                    <Text style={[fontstyles.homebold, { fontSize: 45, color: colorStyle.diffBlue }]}>{date.getHours().toString().padStart(2, '0')}</Text>
                                    <Text style={[fontstyles.homebold, { fontSize: 45, marginTop: -10, color: colorStyle.diffYellow }]}>{date.getMinutes().toString().padStart(2, '0')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ gap: oneGap }}>

                            <View style={{ gap: oneGap }} className=' flex-row'>
                                <View className=' overflow-hidden justify-end' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 1 * oneCell }}>
                                    {/* <View className=' items-center justify-center p-2' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg }}>
                                        <Ionicons name={'call'} size={0.45 * oneCell} color={colorStyle.diffBlue} />
                                    </View> */}
                                    <View className=' top-32 right-5'>
                                        <Ionicons name={'cloud'} size={80} color={batteryLevel * 100 <= 10.5 ? colorStyle.diffRed : colorStyle.diffGreen} />
                                    </View>
                                    <View className=' top-14 left-4'>
                                        <Ionicons name={'cloud'} size={80} color={batteryLevel * 100 <= 10.5 ? colorStyle.diffRed : colorStyle.diffGreen} />
                                    </View>
                                    <View style={{ backgroundColor: batteryLevel * 100 <= 10.5 ? colorStyle.diffRed : colorStyle.diffGreen, height: `${(batteryLevel * 100).toString()}%` }} className={` w-full items-center justify-end p-2`} />
                                    <View className=' absolute left-5'>
                                        {batteryState == 1 ?
                                            <Text style={[fontstyles.homebold, { marginBottom: -1, zIndex: 20, color: colorStyle.mainBg }]}>{(batteryLevel * 100).toFixed()}%</Text>
                                            : <Ionicons name={'battery-charging-outline'} size={33} color={colorStyle.mainBg} />
                                        }
                                    </View>

                                </View>
                                <View style={{ gap: oneGap }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('ToolsScreen')} className='p-2 justify-end' style={{ borderRadius: 12, backgroundColor: colorStyle.diffYellow, height: 1 * oneCell, width: 1 * oneCell }}>
                                        <Ionicons name={'speedometer'} size={0.35 * oneCell} color={colorStyle.mainBg} />
                                        <View className=' flex-row'>
                                            <Text style={[fontstyles.homebold, { marginBottom: -7, zIndex: 20, fontSize: 20, color: colorStyle.mainBg }]}>2221</Text>
                                            <Text style={[fontstyles.homesmall, { marginTop: 2, color: colorStyle.subBg }]}>kms</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('ToolsScreen')} className='p-2 justify-end' style={{ borderRadius: 12, backgroundColor: colorStyle.diffBlue, height: 1 * oneCell, width: 1 * oneCell }}>
                                        <Ionicons name={'leaf'} size={0.35 * oneCell} color={colorStyle.mainBg} />
                                        <View className=' flex-row'>
                                            <Text style={[fontstyles.homebold, { marginBottom: -7, zIndex: 20, fontSize: 20, color: colorStyle.mainBg }]}>22.1</Text>
                                            <Text style={[fontstyles.homesmall, { marginTop: 2, color: colorStyle.subBg }]}>km/l</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View className='p-3 justify-between' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 2 * oneCell + 1 * oneGap }}>
                                <AC2x2 ACControllor={ACControllor} setScrollEnabled={setScrollEnabled} />
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