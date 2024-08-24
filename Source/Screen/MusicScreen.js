import React, { useContext, useRef, useState } from 'react';
import { View, Animated, Text, Dimensions, ScrollView } from 'react-native';
import useColorStyle from '../Styles/ColorStyle';
import Grid2X2 from '../Components/Grid2X2';
import Grid2X1 from '../Components/Grid2X1';
import { GlobalStateContext } from '../Context/GlobalStateProvider';

const BANNER_W = Dimensions.get('window').height * 0.9; // Adjust the banner width to your preference

const MusicScreen = () => {
    const { oneGap, oneCell } = useContext(GlobalStateContext);
    const colorStyle = useColorStyle();
    return (
        <View>
            <ScrollView
                horizontal
                style={{ backgroundColor: colorStyle.mainBg, height: Dimensions.get('window').height }}
            >
                <View style={{ margin: 14, flexDirection: 'row', gap: oneGap }}>
                    <View style={{ gap: oneGap }}>
                        <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 2 * oneCell + 1 * oneGap, width: 4 * oneCell + 3 * oneGap }} />
                        <View style={{ gap: oneGap, flexDirection: 'row' }}>
                            <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }} />
                            <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }} />
                            <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }} />
                            <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 1 * oneCell }} />
                        </View>
                        <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 1 * oneCell, width: 4 * oneCell + 3 * oneGap }} />
                    </View>
                    <View style={{ gap: oneGap }}>
                        <View style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: 4 * oneCell + 3 * oneGap, width: 4 * oneCell + 3 * oneGap }} />
                    </View>
                </View>
            </ScrollView>
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