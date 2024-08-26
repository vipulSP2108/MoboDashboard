import { Button, View } from "react-native";
// import RNFS from 'react-native-fs';
// import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
var RNFS = require('react-native-fs');

export const MusicFolders = ({ setSelectedFolder }) => (
    <View>
        <Button title="Open Folder Rock" onPress={() => setSelectedFolder('Rock')} />
        <Button title="Open Folder Pop" onPress={() => setSelectedFolder('Pop')} />
        <Button title="Open Folder Jazz" onPress={() => setSelectedFolder('Jazz')} />
    </View>
);