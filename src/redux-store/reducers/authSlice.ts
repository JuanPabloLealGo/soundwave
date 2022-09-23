import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthDataInterface } from "../../interfaces/AuthDataInterface"
import { AuthStateInterface } from "../../interfaces/state/AuthStateInterface"

const initialState = {
  authData: {},
  isLoading: false,
  isSuccessful: false,
  error: {}
} as AuthStateInterface

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    spotifyLoginRequest: (state: AuthStateInterface) => {
      state.isLoading = true
    },
    spotifyLoginSuccessful: (state: AuthStateInterface, action: PayloadAction<AuthDataInterface>) => {
      state.authData = action.payload
      state.isLoading = false
      state.isSuccessful = true
    },
    spotifyLoginFailed: (state: AuthStateInterface, action: PayloadAction<{}>) => {
      state.isSuccessful = false
      // state.error = action.payload
    }
  }
})

export const {
  spotifyLoginRequest,
  spotifyLoginSuccessful,
  spotifyLoginFailed
} = authSlice.actions

export default authSlice.reducer