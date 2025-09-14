import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mainLanguage: 'ru',
}

const langSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setMainLanguage: (state, action) => {
      state.mainLanguage = action.payload
    },
  },
})

export const { setMainLanguage } = langSlice.actions
export default langSlice.reducer
export const selectMainLanguage = state => state.languages.mainLanguage
