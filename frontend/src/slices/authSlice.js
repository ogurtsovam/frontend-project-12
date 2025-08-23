import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload
      localStorage.setItem("token", action.payload)
    },
    clearAuth: (state) => {
      state.token = null
      localStorage.removeItem("token")
    }
  }
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
export const selectToken = (state) => state.auth.token
