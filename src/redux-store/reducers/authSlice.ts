import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import AuthDataInterface from "../../interfaces/AuthDataInterface"
import AuthStateInterface from "../../interfaces/state/AuthStateInterface"
import { ErrorType } from "../../types"
import { refreshSpotifyToken, spotifyAuthentication } from "../actions/authActions"

const initialState = {
  data: null,
  isLoading: false,
  error: null
} as AuthStateInterface

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthStateInterface) => {
      state.data = null
      state.error = null
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(spotifyAuthentication.pending, (state) => {
        state.isLoading = true
      })
      .addCase(spotifyAuthentication.fulfilled, (state, action: PayloadAction<AuthDataInterface>) => {
        state.isLoading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(spotifyAuthentication.rejected, (state, action: PayloadAction<ErrorType>) => {
        state.isLoading = false
        state.data = null
        state.error = action.payload
      })
      .addCase(refreshSpotifyToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(refreshSpotifyToken.fulfilled, (state, action: PayloadAction<AuthDataInterface>) => {
        state.data = {
          ...action.payload,
          refresh_token: state.data?.refresh_token ?? ''
        }
        state.error = null
      })
      .addCase(refreshSpotifyToken.rejected, (state, action: PayloadAction<ErrorType>) => {
        state.error = action.payload
        state.data = null
      })
  }
})

const { actions, reducer } = authSlice

export const { logout } = actions

export default reducer
