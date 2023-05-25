import { createAsyncThunk } from "@reduxjs/toolkit"
import { spotifyAuth } from "../../api/authApi"
import AuthDataInterface from "../../interfaces/AuthDataInterface"
import AuthErrorInterface from "../../interfaces/AuthErrorInterface"
import { ErrorType } from "../../types"

export const spotifyAuthentication = createAsyncThunk<AuthDataInterface, string, { rejectValue: ErrorType }>(
  'auth/spotifyAuth',
  async (code: string, thunkAPI) => {
    try {
      const response = await spotifyAuth({ code, grant_type: 'authorization_code' })
      return response.data
    } catch (error) {
      const message = (error as AuthErrorInterface).error_description
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const refreshSpotifyToken = createAsyncThunk<AuthDataInterface, string, { rejectValue: ErrorType }>(
  'auth/refreshToken',
  async (refreshToken: string, thunkAPI) => {
    try {
      const response = await spotifyAuth({ refresh_token: refreshToken, grant_type: 'refresh_token' })
      return response.data
    } catch (error) {
      const message = (error as AuthErrorInterface).error_description
      return thunkAPI.rejectWithValue(message)
    }
  }
)
