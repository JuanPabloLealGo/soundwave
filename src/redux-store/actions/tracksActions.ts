import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTracks } from "../../api/trackApi";

interface Props {
  playlistId: string
  limit: number
  offset: number
}

export const getTracksPage = createAsyncThunk(
  'traks',
  async ({ playlistId, limit, offset }: Props, thunkAPI) => {
    try {
      const response = await getAllTracks(playlistId, limit, offset)
      return response.data
    } catch (error: any) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)