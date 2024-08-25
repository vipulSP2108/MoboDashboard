import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    queue: [],
    shuffleMode: false,
    sound: undefined,
    currentPlayingAudio: undefined,
    audioState: {
        state: 'playing',
        isloop: false,
        position: 0,
    },
    assets: [],
    selectedMusic: null,
}
export const queueSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setQueue: (state, action) => {
            state.queue = action.payload
        },
        setShuffleMode: (state, action) => {
            state.shuffleMode = action.payload
        },
        setSound: (state, action) => {
            state.sound = action.payload
        },
        setCurrentPlayingAudio: (state, action) => {
            state.currentPlayingAudio = action.payload
        },
        setAudioState: (state, action) => {
            state.audioState = action.payload
        },
        setAssets: (state, action) => {
            state.assets = action.payload
        },
        setSelectedMusic: (state, action) => { // Add this reducer
            state.selectedMusic = action.payload;
        },
    }
})

export const {
    setQueue, setShuffleMode,
    setSound, setCurrentPlayingAudio,
    setAudioState, setAssets,
    setSelectedMusic
} = queueSlice.actions

export default queueSlice.reducer;