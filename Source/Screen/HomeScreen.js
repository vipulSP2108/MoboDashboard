// import { View, Text, ScrollView, Dimensions, ImageBackground, Image } from 'react-native'
// import React from 'react'
// import useColorStyle from '../Styles/ColorStyle';

// export default function HomeScreen() {
//     return (
//         <ScrollView horizontal style={{ backgroundColor: colorStyle.mainBg }}>
//             <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').height * 0.9 }}>
//                 <Watch/>
//             </View>
//         </ScrollView>
//     )
// }
import React, { useRef, useState } from 'react';
import { View, Animated, Text, Dimensions } from 'react-native';
import Watch from '../Components/Watch';
import useColorStyle from '../Styles/ColorStyle';
import Grid1X1 from '../Components/Grid1X1';
import Grid1X2 from '../Components/Grid1X2';
import Grid2X2 from '../Components/Grid2X2';
import Grid3X2 from '../Components/Grid3X2';
import Grid2X1 from '../Components/Grid2X1';

const BANNER_W = Dimensions.get('window').height * 0.9; // Adjust the banner width to your preference

const HomeScreen = () => {
    const scrollA = useRef(new Animated.Value(0)).current;
    const colorStyle = useColorStyle();

    const [parentHeight, setParentHeight] = useState(0);
    const parentRef = useRef(null);

    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setParentHeight(height);
    };

    return (
        <View>
            {console.log(parentHeight, Dimensions.get('window').height)}
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
                    <Grid1X1 />
                    <Grid1X2 />
                    <Grid2X1 width={parentHeight} />
                    <Grid2X2 />
                    <Grid3X2 width={parentHeight} />
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