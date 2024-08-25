import { View, Text } from 'react-native'
import React from 'react'

export function FormatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${minutes}:${secs}`;
    } else {
        return `${minutes}:${secs}`;
    }
}