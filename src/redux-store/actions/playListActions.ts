import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCategorysPlayLists } from "../../api/playListApi"
import PlayListsPageInterface from "../../interfaces/PlayListsPageInterface"

interface Props {
  categoryId: string
  limit: number
  offset: number
}

export const getPlayListsPage = createAsyncThunk(
  'playlists',
  async ({ categoryId, limit, offset }: Props, thunkAPI) => {
    try {
      const response = await getCategorysPlayLists(categoryId, limit, offset)
      const categoryPlayLists = {} as { [key: string]: PlayListsPageInterface }
      categoryPlayLists[categoryId] = response.data.playlists
      return categoryPlayLists
    } catch (error: any) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)