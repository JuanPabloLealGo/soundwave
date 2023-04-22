import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCategorysPlaylists } from "../../api/playListApi"
import { ErrorType } from "../../types"
import ErrorInterface from "../../interfaces/ErrorInterface"
import PlaylistByCategoryInterface from "../../interfaces/PlaylistByCategoryInterface"

interface PlaylistPagePayload {
  categoryId: string
  limit: number
  offset: number
}

export const getPlaylistPage = createAsyncThunk<PlaylistByCategoryInterface, PlaylistPagePayload, { rejectValue: ErrorType }>(
  'playlist/getPlaylistPage',
  async ({ categoryId, limit, offset }: PlaylistPagePayload, thunkAPI) => {
    try {
      const response = await getCategorysPlaylists(categoryId, limit, offset)
      const playlistByCategory = {} as PlaylistByCategoryInterface
      playlistByCategory[categoryId] = response.data.playlists
      return playlistByCategory
    } catch (error) {
      const { message } = (error as ErrorInterface).error
      return thunkAPI.rejectWithValue(message)
    }
  }
)