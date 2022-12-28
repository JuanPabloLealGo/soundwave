import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import AuthDataInterface from "../../interfaces/AuthDataInterface"
import AuthStateInterface from "../../interfaces/state/AuthStateInterface"
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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(spotifyAuthentication.pending, (state) => {
        state.isLoading = true
      })
      .addCase(spotifyAuthentication.fulfilled, (state, action: PayloadAction<AuthDataInterface>) => {
        state.isLoading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(spotifyAuthentication.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
        state.data = null
      })
      .addCase(refreshSpotifyToken.fulfilled, (state, action: PayloadAction<AuthDataInterface>) => {
        state.data = {
          ...action.payload,
          refresh_token: state.data?.refresh_token ?? ''
        }
        state.error = null
      })
      .addCase(refreshSpotifyToken.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
        state.data = null
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
