import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, username } = action.payload
      state.token = token
      state.username = username
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
    },
    clearAuth: (state) => {
      state.token = null
      state.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer

export const selectToken = state => state.auth.token
export const selectUsername = state => state.auth.username
