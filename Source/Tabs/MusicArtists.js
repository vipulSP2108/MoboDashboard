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

export const MusicArtists = ({ setSelectedFolder }) => {
    const [selectedMusic, setSelectedMusic] = useState();
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
        <>
            <View style={{ backgroundColor: colorStyle.subText }} className=' items-center absolute top-14 z-20 w-full flex-row justify-between rounded-b-xl px-3 pb-2 '>
                <View className=' flex-row items-center'>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.homesmall, { color: colorStyle.mainText, marginBottom: -2 }]}>Date added </Text>
                    <Ionicons name='chevron-down-outline' size={15} color={colorStyle.mainText} />
                </View>
                <View>
                    <Ionicons name='filter' size={15} color={colorStyle.mainText} />
                </View>
            </View>
            <FlatList
                // onScroll={handleScroll}
                onEndReachedThreshold={0.9}
                // onEndReached={loadMore}
                data={dummySongs}
                ListHeaderComponent={
                    <View style={{ backgroundColor: colorStyle.subBg }} className=' flex-row justify-between rounded-t-xl px-3 pt-24' />
                }
                keyboardDismissMode='on-drag'
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ backgroundColor: colorStyle.subBg }} className='flex-row items-center justify-between p-3'>
                        <View className='flex-row'>
                            <Image className=' w-14 h-14 rounded-lg' source={item.albumArt} />
                            <View className=' left-3'>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.home, { color: item.id === selectedMusic?.id ? colorStyle.diffBlue : colorStyle.mainText, marginBottom: -8 }]}>{TruncatedTextComponent(item.filename, 21)}</Text>
                                <Text style={[fontstyles.homesmall, { color: colorStyle.subText }]}>{FormatTime(item.duration)}</Text>
                            </View>
                        </View>
                        <Ionicons name='ellipsis-vertical' size={20} color={colorStyle.mainText} />
                    </TouchableOpacity>
                )}
                // keyExtractor={(item, index) => {`${item.toString()}_${index.toString()}`}}
                keyExtractor={(item, index) => index.toString()}
            // showsVerticalScrollIndicator={false}
            // {...otherProps}
            />
        </>
        // <View className=' h-full mt-14' style={{ backgroundColor: colorStyle.subBg }}>
        //     <Button title="Open Folder Rock" onPress={() => setSelectedFolder('Rock')} />
        //     <Button title="Open Folder Pop" onPress={() => setSelectedFolder('Pop')} />
        //     <Button title="Open Folder Jazzz" onPress={() => setSelectedFolder('Jazz')} />
        // </View>
    );
}