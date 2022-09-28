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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(spotifyAuthentication.pending, (state) => {
        state.isLoading = true
      })
      .addCase(spotifyAuthentication.fulfilled, (state, action: PayloadAction<AuthDataInterface>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(spotifyAuthentication.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
        state.data = null
      })
      .addCase(refreshSpotifyToken.fulfilled, (state, action: PayloadAction<AuthDataInterface>) => {
        state.data = action.payload
      })
      .addCase(refreshSpotifyToken.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
        state.data = null
      })
  }
})

export const authActions = authSlice.actions
export default authSlice.reducer

/*

SLICE STRUCTURE FOR SYNCRONOUS ACTIONS

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    spotifyLoginRequest: (state: AuthStateInterface) => {
      state.isLoading = true
    },
    spotifyLoginSuccessful: (state: AuthStateInterface, action: PayloadAction<AuthDataInterface>) => {
      state.authData = action.payload
      state.isLoggedIn = true
      state.isLoading = false
      state.isSuccessful = true
    },
    spotifyLoginFailed: (state: AuthStateInterface, action: PayloadAction<{}>) => {
      state.isSuccessful = false
      state.isLoggedIn = false
      // state.error = action.payload
    },
    refreshTokenRequest: (state: AuthStateInterface) => {
      state.isLoading = true
    },
    refreshTokenSuccessful: (state: AuthStateInterface, action: PayloadAction<AuthDataInterface>) => {
      state.authData = action.payload
      state.isLoggedIn = true
      state.isLoading = false
      state.isSuccessful = true
    },
    refreshTokenFailed: (state: AuthStateInterface, action: PayloadAction<{}>) => {
      state.isSuccessful = false
      state.isLoggedIn = false
      // state.error = action.payload
    }
  }
})

export const {
  spotifyLoginRequest,
  spotifyLoginSuccessful,
  spotifyLoginFailed,
  refreshTokenRequest,
  refreshTokenSuccessful,
  refreshTokenFailed
} = authSlice.actions

export default authSlice.reducer

*/