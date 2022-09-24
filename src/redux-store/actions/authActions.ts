import { createAsyncThunk } from "@reduxjs/toolkit"
import { spotifyAuth } from "../../api/authApi"


export const spotifyAuthentication = createAsyncThunk(
  'authentication',
  async (code: string, thunkAPI) => {
    try {
      const response = await spotifyAuth({ code, grant_type: 'authorization_code' })
      return response.data
    } catch (error: any) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const refreshSpotifyToken = createAsyncThunk(
  'refreshToken',
  async (refreshToken: string, thunkAPI) => {
    try {
      const response = await spotifyAuth({ refresh_token: refreshToken, grant_type: 'refresh_token' })
      return response.data
    } catch (error: any) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)


/*

ACTION STRUCTURE IF IT WAS A SYNC ACTION

export const spotifyAuthentication = (code: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(spotifyLoginRequest())
    try {
      const response = await spotifyAuth({ code, grant_type: 'authorization_code' })
      dispatch(spotifyLoginSuccessful(response))
    } catch (error: any) {
      dispatch(spotifyLoginFailed(error))
    }
  }
}


export const refreshSpotifyToken = (refreshToken: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(refreshTokenRequest())
    try {
      const response = await spotifyAuth({ refresh_token: refreshToken, grant_type: 'refresh_token' })
      dispatch(refreshTokenSuccessful(response))
    } catch (error: any) {
      dispatch(refreshTokenFailed(error))
    }
  }
}

*/