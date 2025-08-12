import { createSlice } from '@reduxjs/toolkit';

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
});

export const { actions } = uiSlice;

export default uiSlice.reducer;