import { createSlice } from '@reduxjs/toolkit';
import channelsApi from '../../services/channelsApi';

const initialState = {
  channels: {
    activeChannelId: '1',
    defaultChannelId: '1',
  },
};

const setActiveChannel = (state, { payload: { id } }) => {
  state.channels.activeChannelId = id;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      setActiveChannel,
    );
    builder.addMatcher(
      channelsApi.endpoints.deleteChannel.matchFulfilled,
      (state, { payload: { id } }) => {
        if (state.channels.activeChannelId === id) {
          state.channels.activeChannelId = state.channels.defaultChannelId;
        }
      },
    );
  },
});

export const { actions } = uiSlice;

export default uiSlice.reducer;