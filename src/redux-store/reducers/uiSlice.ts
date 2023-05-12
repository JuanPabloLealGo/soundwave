import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UiStateInterface from "../../interfaces/state/UiStateInterface";

const initialState = {
  isDarkTheme: false,
  isDragging: false,
  errorMessage: null,
} as UiStateInterface

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    playerDragging: (state: UiStateInterface, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload
    },
    setErrorMessage: (state: UiStateInterface, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload
    },
    toogleTheme: (state: UiStateInterface) => {
      state.isDarkTheme = !state.isDarkTheme
    }
  }
})

const { actions, reducer } = uiSlice

export const { playerDragging, setErrorMessage, toogleTheme } = actions

export default reducer