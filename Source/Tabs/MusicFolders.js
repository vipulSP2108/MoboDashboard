import { Button, View } from "react-native";

export const MusicFolders = ({ setSelectedFolder }) => (
    <View>
        <Button title="Open Folder Rock" onPress={() => setSelectedFolder('Rock')} />
        <Button title="Open Folder Pop" onPress={() => setSelectedFolder('Pop')} />
        <Button title="Open Folder Jazz" onPress={() => setSelectedFolder('Jazz')} />
    </View>
);