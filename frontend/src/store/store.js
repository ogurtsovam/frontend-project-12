import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import activeChannelReducer from '../slices/activeChannelSlice'
import { channelsApi } from '../api/channelsApi.js'
import { messagesApi } from '../api/messagesApi.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    active: activeChannelReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(channelsApi.middleware, messagesApi.middleware),
})
