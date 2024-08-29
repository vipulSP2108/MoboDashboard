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
import { setAudioState, setCurrentPlayingAudio, setQueue, setSelectedMusic, setShuffleMode, setSound } from '../Fetures/Queue/QueueSlice';
import Shuffle from '../Components/Shuffle';

export default function MusicSongPlayer({randomness}) {
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

    /// <-------------- Why ADD this -------------->
    useEffect(() => {
        let interval;
        if (audioState.state === 'playing') {
            interval = setInterval(async () => {
                if (sound) {
                    const status = await sound.getStatusAsync();
                    if (status.isLoaded) {
                        dispatch(setAudioState({
                            ...audioState,
                            position: Math.floor(status.positionMillis / 1000),
                        }));
                    }
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [audioState.state, sound]);


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
                isLooping: false,
                position: 0,
            }));
        }
        const soundObject = await Audio.Sound.createAsync(
            { uri: selectedMusic.uri },
            { shouldPlay: true },
            (playbackStatus) => {
                if (playbackStatus.isLoaded) {
                    dispatch(setAudioState({
                        ...audioState,
                        state: playbackStatus.isPlaying ? 'playing' : 'paused',
                        isLooping: playbackStatus.isLooping,
                        position: Math.floor(playbackStatus.positionMillis / 1000),
                    }))
                }
                if (playbackStatus.didJustFinish) {
                    if (!playbackStatus.isLooping) {
                        skipForwordSong();
                    }
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

    const seek = async (value) => {
        await sound.setPositionAsync(value * 1000)
    }

    const findCurrentSongIndex = () => {
        return queue.findIndex((track) => track.id == selectedMusic.id);
    }
    const skipForwordSong = async () => {
        const currentSongIndex = findCurrentSongIndex();
        if (currentSongIndex !== -1) {
            const nextSong = currentSongIndex === queue.length - 1 ? queue[0] : queue[currentSongIndex + 1]
            dispatch(setSelectedMusic(nextSong))
        }
    }

    const skipBackwordSong = async () => {
        const currentSongIndex = findCurrentSongIndex();
        if (currentSongIndex !== -1) {
            const nextSong = currentSongIndex === 0 ? queue[queue.length - 1] : queue[currentSongIndex - 1]
            dispatch(setSelectedMusic(nextSong))
        }
    }
    const toggleLoop = async () => {
        await sound.setIsLoopingAsync(!audioState.isLooping);
    }

    useEffect(() => {
        dispatch(setQueue(shuffleMode ? Shuffle(queue) : assets))
    }, [shuffleMode])

    const toggleSuffle = async () => {
        dispatch(setShuffleMode(!shuffleMode));
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
            {randomness < 1 ?
                <>
                    <View className=' h-2/4 items-center justify-center'>
                        <Text style={[fontstyles.homebig, { color: colorStyle.mainText, marginBottom: -2 }]}>{TruncatedTextComponent(selectedMusic.filename, 21)}</Text>
                        <Text style={[fontstyles.home, { color: colorStyle.subText }]}>{FormatTime(selectedMusic.duration)}</Text>
                    </View>
                    <View className={`flex-row w-full items-center justify-between ${selectedMusic.duration >= 3600 ? 'px-10' : 'px-8'}`}>
                        <Text style={[fontstyles.numsmall, { color: colorStyle.mainText }]}>{FormatTime(audioState.position)}</Text>
                        <View className='w-44' style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: [{ translateX: -50 }, { translateY: -8 }]
                        }}>
                            <Slider
                                value={audioState.position}
                                minimumValue={0}
                                maximumValue={selectedMusic.duration}
                                minimumTrackTintColor={colorStyle.mainText}
                                maximumTrackTintColor={colorStyle.mainText}
                                onSlidingComplete={seek}
                            />
                        </View>
                        <Text style={[fontstyles.numsmall, { color: colorStyle.mainText }]}>{FormatTime(selectedMusic.duration)}</Text>
                    </View>
                    <View className=' flex-row items-center justify-center gap-5'>
                        <Ionicons onPress={toggleSuffle} name='shuffle' size={25} color={shuffleMode ? colorStyle.mainText : colorStyle.subText} />
                        <Ionicons onPress={skipBackwordSong} name='play-back' size={30} color={colorStyle.mainText} />
                        <Ionicons onPress={togglePlayPause} name={audioState.state == 'playing' ? 'pause-circle' : 'play-circle'} size={45} color={colorStyle.mainText} />
                        <Ionicons onPress={skipForwordSong} name='play-forward' size={30} color={colorStyle.mainText} />
                        <Ionicons onPress={toggleLoop} name='repeat' size={25} color={audioState.isLooping ? colorStyle.mainText : colorStyle.subText} />
                    </View>
                </>
                :
                <View className=' p-3 h-full'>
                    <Text style={[fontstyles.homebold, { color: colorStyle.mainText, marginBottom: -6 }]}>{TruncatedTextComponent(selectedMusic.filename, 21)}</Text>
                    <View className=' flex-row'>
                        <Text style={[fontstyles.homesmall, { color: colorStyle.mainText }]}>{FormatTime(audioState.position)}</Text>
                        <Text style={[fontstyles.homesmall, { color: colorStyle.subText }]}>  / {FormatTime(selectedMusic.duration)}</Text>
                    </View>
                    <View className=' pt-7 flex-row items-center justify-center gap-5'>
                        <Ionicons onPress={toggleSuffle} name='shuffle' size={23} color={shuffleMode ? colorStyle.mainText : colorStyle.subText} />
                        <Ionicons onPress={skipBackwordSong} name='play-back' size={25} color={colorStyle.mainText} />
                        <View className=' rounded-xl p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <Ionicons onPress={togglePlayPause} name={audioState.state == 'playing' ? 'pause' : 'play'} size={28} color={colorStyle.mainText} />
                        </View>
                        <Ionicons onPress={skipForwordSong} name='play-forward' size={25} color={colorStyle.mainText} />
                        <Ionicons onPress={toggleLoop} name='repeat' size={23} color={audioState.isLooping ? colorStyle.mainText : colorStyle.subText} />
                    </View>
                </View>
            }
        </>
    )
}