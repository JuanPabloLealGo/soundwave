import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCategorysPlaylists } from "../../api/playListApi"
import { ErrorType } from "../../types"
import ErrorInterface from "../../interfaces/ErrorInterface"
import CategoryByPlaylistInterface from "../../interfaces/CategoryByPlaylistInterface"

interface PlaylistPagePayload {
  categoryId: string
  limit: number
  offset: number
}

export const getPlaylistPage = createAsyncThunk<CategoryByPlaylistInterface, PlaylistPagePayload, { rejectValue: ErrorType }>(
  'playlist/getPlaylistPage',
  async ({ categoryId, limit, offset }: PlaylistPagePayload, thunkAPI) => {
    try {
      const response = await getCategorysPlaylists(categoryId, limit, offset)
      const categoryByPlaylist = {} as CategoryByPlaylistInterface
      categoryByPlaylist[categoryId] = response.data.playlists
      return categoryByPlaylist
    } catch (error) {
      const { message } = (error as ErrorInterface).error
      return thunkAPI.rejectWithValue(message)
    }
  }
)