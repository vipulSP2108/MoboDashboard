import { useColorScheme } from 'react-native';
import React from 'react';

function useColorStyle() {
    const darkMode = useColorScheme() === 'dark';
    const colors = {
        diffBlue: '#37FEF6',
        diffYellow: '#FFB364',
        mainBg: darkMode ? '#000000' : '#FFFFFF',
        subBg: '#1E2022',
        iconBg: '#131415',
        mainText: darkMode ? '#FFFFFF' : '#000000',
        subText: '#58595A',
    };

    return colors;
}

export default useColorStyle;
