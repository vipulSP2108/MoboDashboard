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

export const MusicTracks = ({ setSelectedFolder }) => {
    const [selectedMusic, setSelectedMusic] = useState();
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
        <>
            <FlatList
                // onScroll={handleScroll}
                onEndReachedThreshold={0.9}
                // onEndReached={loadMore}
                data={dummySongs}
                ListHeaderComponent={
                    <View style={{ backgroundColor: colorStyle.subBg }} className=' flex-row justify-between rounded-t-xl pt-14' />
                }
                keyboardDismissMode='on-drag'
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: colorStyle.subBg }}>
                        <Text style={[fontstyles.home, { color: colorStyle.mainText }]} className=' p-3 '>Track {item.id}</Text>
                        <FlatList
                            horizontal
                            // onScroll={handleScroll}
                            onEndReachedThreshold={0.9}
                            // onEndReached={loadMore}
                            data={dummySongs}
                            keyboardDismissMode='on-drag'
                            renderItem={({ item }) => (
                                <TouchableOpacity activeOpacity={1} className='h-28 flex-row items-center justify-between p-3'>
                                    <Image className=' w-28 h-28 rounded-xl' source={item.albumArt} />
                                </TouchableOpacity>
                            )}
                            // keyExtractor={(item, index) => {`${item.toString()}_${index.toString()}`}}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                // keyExtractor={(item, index) => {`${item.toString()}_${index.toString()}`}}
                keyExtractor={(item, index) => index.toString()}
            // showsVerticalScrollIndicator={false}
            // {...otherProps}
            />
        </>
    );
}