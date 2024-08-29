// npx expo install react-native-gesture-handler
// expo-location
// npx expo install expo-linear-gradient

const setGap = 2
const BANNER_W = Dimensions.get('window').height * 0.9;

import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Animated, Text, Dimensions, ImageBackground } from 'react-native';
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

const HomeScreen = () => {
    const { locationCoords, setLocationCoords, oneGap, setOneGap, oneCell, setOneCell } = useContext(GlobalStateContext);
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
                            <Watch ACControllor={ACControllor}/>
                        </View>
                    </Animated.View>
                </View>

                <View onLayout={handleLayout} ref={parentRef} style={{ margin: 14, columnGap: 12 }} className='flex-row justify-between'>
                    <View style={{ gap: oneGap, flexDirection: 'row' }}>
                        <AC randomness={randomness} ACControllor={ACControllor} setACControllor={setACControllor}/>
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