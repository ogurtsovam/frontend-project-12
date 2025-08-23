import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import activeChannelReducer from "../slices/activeChannelSlice"
import { channelsApi } from '../api/channelApi.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    active: activeChannelReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsApi.middleware),
})