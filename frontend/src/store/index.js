import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import channelsApi from '../services/channelsApi';
import messagesApi from '../services/messagesApi';


const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([channelsApi.middleware, messagesApi.middleware]),
});

export default store;