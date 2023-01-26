import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ErrorMessageInterface from "../../interfaces/ErrorMessageInterface";
import UiStateInterface from "../../interfaces/state/UiStateInterface";

const initialState = {
  isDarkTheme: false,
  errorMessage: null
} as UiStateInterface

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toogleTheme: (state: UiStateInterface) => {
      state.isDarkTheme = !state.isDarkTheme
    },
    setErrorMessage: (state: UiStateInterface, action: PayloadAction<ErrorMessageInterface | null>) => {
      state.errorMessage = action.payload
    }
  }
})

export const { toogleTheme, setErrorMessage } = uiSlice.actions

export default uiSlice.reducer