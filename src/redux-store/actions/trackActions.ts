import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTracks } from "../../api/trackApi";
import TrackPageInterface from "../../interfaces/TrackPageInterface";
import { ErrorType } from "../../types";
import ErrorInterface from "../../interfaces/ErrorInterface";

interface TrackPagePayload {
  playlistId: string
  limit: number
  offset: number
}

export const getTrackPage = createAsyncThunk<TrackPageInterface, TrackPagePayload, { rejectValue: ErrorType }>(
  'track/getTrackPage',
  async ({ playlistId, limit, offset }: TrackPagePayload, thunkAPI) => {
    try {
      const response = await getAllTracks(playlistId, limit, offset)
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).error
      return thunkAPI.rejectWithValue(message)
    }
  }
)