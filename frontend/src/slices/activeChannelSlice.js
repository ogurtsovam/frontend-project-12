import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeChannel: null,
}

const activeChannelSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeChannel = action.payload
    },
  },
})

export const { setActive } = activeChannelSlice.actions
export default activeChannelSlice.reducer
export const selectActiveChannel = state => state.active.activeChannel
