import { configureStore } from "@reduxjs/toolkit";
import queueReducer from "../Fetures/Queue/QueueSlice";

const store = configureStore({
    reducer: {
        queue: queueReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
