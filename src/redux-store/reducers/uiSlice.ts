import { createSlice } from "@reduxjs/toolkit";
import UiStateInterface from "../../interfaces/state/UiStateInterface";

const initialState = {
  isDarkTheme: false
} as UiStateInterface

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toogleTheme: (state: UiStateInterface) => {
      state.isDarkTheme = !state.isDarkTheme
    }
  }
})

export const { toogleTheme } = uiSlice.actions

export default uiSlice.reducer