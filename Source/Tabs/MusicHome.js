import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import useColorStyle from "../Styles/ColorStyle";
import FontStyles from "../Styles/FontStyle";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FormatTime } from "../Components/FormatTime";
import TruncatedTextComponent from "../Components/TruncatedTextComponent";

const dummySongs = [
    {
        id: '1',
        filename: 'Song One',
        duration: 180,
        albumArt: require('../../assets/images/music.jpg'), // Ensure you have these images in your assets folder
    },
    {
        id: '2',
        filename: 'Song Two',
        duration: 210,
        albumArt: require('../../assets/images/music.jpg'),
    },
    {
        id: '3',
        filename: 'Song Three',
        duration: 240,
        albumArt: require('../../assets/images/music.jpg'),
    },
    {
        id: '3',
        filename: 'Song Three',
        duration: 240,
        albumArt: require('../../assets/images/music.jpg'),
    },
    {
        id: '3',
        filename: 'Song Three',
        duration: 240,
        albumArt: require('../../assets/images/music.jpg'),
    },
    // Add more dummy songs as needed
];

export const MusicHome = ({ setSelectedFolder }) => {
    const [selectedMusic, setSelectedMusic] = useState();
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
        <View style={{ backgroundColor: colorStyle.subBg }}>
            <FlatList
                // onScroll={handleScroll}
                onEndReachedThreshold={0.9}
                // onEndReached={loadMore}
                data={dummySongs}
                ListHeaderComponent={
                    <View className='mt-14' >
                        <Text style={[fontstyles.home, { color: colorStyle.mainText }]} className=' p-3 '>Favourites</Text>
                        <View style={{ backgroundColor: colorStyle.subBg }} className='flex-row items-center justify-between p-3'>
                            <View className='flex-row gap-4'>
                                <Image className=' w-24 h-24 rounded-lg' source={require('../../assets/images/music.jpg')} />
                                <Image className=' w-24 h-24 rounded-lg' source={require('../../assets/images/music.jpg')} />
                            </View>
                        </View>
                        <Text style={[fontstyles.home, { color: colorStyle.mainText }]} className=' p-3 '>Playlists</Text>
                    </View>
                }
                numColumns={2}
                keyboardDismissMode='on-drag'
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: colorStyle.subBg }} className='flex-row items-center justify-between p-3'>
                        <TouchableOpacity className='flex-row w-[47%] '>
                            <Image className=' w-14 h-14 rounded-lg' source={item.albumArt} />
                            <View className=' left-3'>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.home, { color: item.id === selectedMusic?.id ? colorStyle.diffBlue : colorStyle.mainText, marginBottom: -8 }]}>{TruncatedTextComponent(item.filename, 6)}</Text>
                                <Text style={[fontstyles.homesmall, { color: colorStyle.subText }]}>{FormatTime(item.duration)}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                // keyExtractor={(item, index) => {`${item.toString()}_${index.toString()}`}}
                keyExtractor={(item, index) => index.toString()}
            // showsVerticalScrollIndicator={false}
            // {...otherProps}
            />
        </View>
        // <View className=' h-full mt-14' style={{ backgroundColor: colorStyle.subBg }}>
        //     <Button title="Open Folder Rock" onPress={() => setSelectedFolder('Rock')} />
        //     <Button title="Open Folder Pop" onPress={() => setSelectedFolder('Pop')} />
        //     <Button title="Open Folder Jazzz" onPress={() => setSelectedFolder('Jazz')} />
        // </View>
    );
}