import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTracks, getSavedTracks, removeSavedTrack, saveTrack } from "../../api/trackApi";
import TrackPageInterface from "../../interfaces/TrackPageInterface";
import { ErrorType } from "../../types";
import ErrorInterface from "../../interfaces/ErrorInterface";
import SavedTrackPageInterface from "../../interfaces/SavedTrackPageInterface";
import TrackItemInterface from "../../interfaces/TrackItemInterface";

interface TrackPageByPlaylistIdPayload extends TrackPagePayload {
  playlistId: string
}

interface TrackPagePayload {
  limit: number
  offset: number
}

export const getTrackPage = createAsyncThunk<TrackPageInterface, TrackPageByPlaylistIdPayload, { rejectValue: ErrorType }>(
  'track/getTrackPage',
  async ({ playlistId, limit, offset }: TrackPageByPlaylistIdPayload, thunkAPI) => {
    try {
      const response = await getAllTracks(playlistId, limit, offset)
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getLikedTracks = createAsyncThunk<SavedTrackPageInterface, TrackPagePayload, { rejectValue: ErrorType }>(
  'track/getLikedTracks',
  async ({ limit, offset }: TrackPagePayload, thunkAPI) => {
    try {
      const response = await getSavedTracks(limit, offset)
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const saveLikedTrack = createAsyncThunk<TrackItemInterface, TrackItemInterface, { rejectValue: ErrorType }>(
  'track/saveLikedTrack',
  async (track: TrackItemInterface, thunkAPI) => {
    try {
      await saveTrack(track.id)
      return track
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const removeLikedTrack = createAsyncThunk<string, string, { rejectValue: ErrorType }>(
  'track/removeLikedTrack',
  async (trackId: string, thunkAPI) => {
    try {
      await removeSavedTrack(trackId)
      return trackId
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)