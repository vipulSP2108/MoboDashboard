import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import useColorStyle from '../Styles/ColorStyle';
import FontStyles from '../Styles/FontStyle';
import { useDispatch, useSelector } from 'react-redux';
import { FormatTime } from '../Components/FormatTime';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { Audio } from 'expo-av';
import { setAudioState, setCurrentPlayingAudio, setSelectedMusic, setSound } from '../Fetures/Queue/QueueSlice';

export default function MusicSongPlayer() {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    const selectedMusic = useSelector((state) => state.queue.selectedMusic);
    const assets = useSelector((state) => state.queue.assets);
    const queue = useSelector((state) => state.queue.queue);
    const shuffleMode = useSelector((state) => state.queue.shuffleMode);
    const audioState = useSelector((state) => state.queue.audioState);
    const currentPlayingAudio = useSelector((state) => state.queue.currentPlayingAudio);
    const sound = useSelector((state) => state.queue.sound);
    const dispatch = useDispatch()

    useEffect(() => {
        if (
            currentPlayingAudio == undefined ||
            currentPlayingAudio.id !== selectedMusic.id
        ) {
            initAudio();
        }
        dispatch(setCurrentPlayingAudio(selectedMusic))
    }, [selectedMusic, currentPlayingAudio])

    const initAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            dispatch(setAudioState({
                state: 'paused',
                isloop: false,
                position: 0,
            }))
        }
        const soundObject = await Audio.Sound.createAsync(
            { uri: selectedMusic.uri },
            { shouldPlay: true },
            (playbackStatus) => {
                if (playbackStatus.isLoaded) {
                    dispatch( setAudioState({
                            ...audioState,
                            state: playbackStatus.isPlaying ? 'playing' : 'paused',
                            isloop: playbackStatus.isLooping,
                            position: Math.floor(playbackStatus.positionMillis / 1000),
                        }))
                }
            }
        )
        dispatch(setSound(soundObject.sound));
        dispatch(setAudioState({
            ...audioState,
            state: 'playing',
        }));
    };

    const togglePlayPause = async () => {
        if (audioState.state == 'playing') {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    const seek = async(value) => {
        await sound.setPositionAsync(value * 1000)
    }

    const findCurrentSongIndex = () => {
        return queue.findIndex((track) => track.id == selectedMusic.id);
    }
    const skipForwordSong = async() => {
        const currentSongIndex = findCurrentSongIndex();
        if(currentSongIndex !== -1){
            const nextSong = currentSongIndex === queue.length - 1 ? queue[0] : queue[currentSongIndex + 1]
            console.log(nextSong)
            dispatch(setSelectedMusic(nextSong))
        }
    }

    const skipBackwordSong = async() => {
        const currentSongIndex = findCurrentSongIndex();
        if(currentSongIndex !== -1){
            const nextSong = currentSongIndex === 0 ? queue[queue.length - 1] : queue[currentSongIndex - 1]
            console.log(nextSong)
            dispatch(setSelectedMusic(nextSong))
        }
    }
    
    if (selectedMusic == undefined) {
        return (
            <Text>Select Music Bro!</Text>
        )
    }
    return (
        <>
            <Image
                source={require('./../../assets/images/music.jpg')}
                resizeMode='cover'
                blurRadius={4}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    opacity: 0.2,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                }}
            />
            <View className=' h-2/4 items-center justify-center'>
                <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: -2 }]}>{TruncatedTextComponent(selectedMusic.filename, 21)}</Text>
                <Text style={[fontstyles.home, { color: colorStyle.subText }]}>{FormatTime(selectedMusic.duration)}</Text>
            </View>
            <View className=' flex-row w-full items-center justify-center'>
                <Text style={[fontstyles.numsmall, { color: colorStyle.mainText }]}>{FormatTime(audioState.position)}</Text>
                <Slider
                    // className=' w-10/12'
                    style={{ width: 190 }}
                    value={audioState.position}
                    minimumValue={0}
                    maximumValue={selectedMusic.duration}
                    minimumTrackTintColor={colorStyle.mainText}
                    maximumTrackTintColor={colorStyle.mainText}
                    onSlidingComplete={seek}
                />
                <Text style={[fontstyles.numsmall, { color: colorStyle.mainText }]}>{FormatTime(selectedMusic.duration)}</Text>
            </View>
            <View className=' flex-row items-center justify-center gap-5'>
                <Ionicons name='shuffle' size={25} color={colorStyle.subText} />
                <Ionicons onPress={skipBackwordSong} name='play-back' size={30} color={colorStyle.mainText} />
                <Ionicons onPress={togglePlayPause} name={audioState.state == 'playing' ? 'pause-circle' : 'play-circle'} size={45} color={colorStyle.mainText} />
                <Ionicons onPress={skipForwordSong} name='play-forward' size={30} color={colorStyle.mainText} />
                <Ionicons name='repeat' size={25} color={audioState.isloop ? colorStyle.mainText : colorStyle.subText} />
            </View>
        </>
    )
}