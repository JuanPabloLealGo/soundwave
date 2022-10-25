import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCategorysPlaylists } from "../../api/playListApi"
import PlaylistsPageInterface from "../../interfaces/PlaylistPageInterface"

interface Props {
  categoryId: string
  limit: number
  offset: number
}

export const getPlaylistsPage = createAsyncThunk(
  'playlists',
  async ({ categoryId, limit, offset }: Props, thunkAPI) => {
    try {
      const response = await getCategorysPlaylists(categoryId, limit, offset)
      const categoryPlaylists = {} as { [key: string]: PlaylistsPageInterface }
      categoryPlaylists[categoryId] = response.data.playlists
      return categoryPlaylists
    } catch (error: any) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)