import { createAsyncThunk } from "@reduxjs/toolkit"
import { getPlaylistById } from "../../api/playListApi"
import { ErrorType } from "../../types"
import ErrorInterface from "../../interfaces/ErrorInterface"
import PlaylistInterface from "../../interfaces/PlaylistInterface"

export const getPlaylist = createAsyncThunk<PlaylistInterface, string, { rejectValue: ErrorType }>(
  'playlist/getPlaylist',
  async (playlistId: string, thunkAPI) => {
    try {
      const response = await getPlaylistById(playlistId)
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)