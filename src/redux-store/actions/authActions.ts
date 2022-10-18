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
