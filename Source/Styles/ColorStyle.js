import { useColorScheme } from 'react-native';
import React from 'react';

function useColorStyle() {
    const darkMode = useColorScheme() === 'dark';
    const colors = {
        diffBlue: '#37FEF6',
        diffYellow: '#FFB364',
        mainbg: darkMode ? '#000000' : '#FFFFFF',
        subbg: '#1E2022',
        textMain: darkMode ? '#FFFFFF' : '#000000',
    };

    return colors;
}

export default useColorStyle;
