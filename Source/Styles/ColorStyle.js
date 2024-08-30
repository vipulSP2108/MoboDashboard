import { useColorScheme } from 'react-native';
import React from 'react';

function useColorStyle() {
    const darkMode = useColorScheme() === 'dark';
    const colors = {
        // pink 662D8C ED1E79
        diffBlue: '#37FEF6',
        diffYellow: '#f28500', //FFB364
        diffRed: '#ff2400',
        diffGreen: '#0FFF50',
        mainBg: darkMode ? '#000000' : '#FFFFFF',
        subBg: '#1E2022',
        iconBg: '#131415',
        mainText: darkMode ? '#FFFFFF' : '#000000',
        subText: '#58595A',
    };

    return colors;
}

export default useColorStyle;
