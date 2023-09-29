import { createAsyncThunk } from "@reduxjs/toolkit";
import PlayerInterface from "../../interfaces/PlayerInterface";
import { getCurrentPlayingTrack, getPlaybackState, setPlayerState, setRepeatMode, skipTrack, tooglePlaybackShuffle } from "../../api/playerApi";
import ErrorInterface from "../../interfaces/ErrorInterface";
import { PlayerControlType } from "../../enums/PlayerControlType";
import { ErrorType } from "../../types";
import PlayerStatusDataInterface from "../../interfaces/PlayerStatusDataInterface";

interface ChangePlayerStateProps {
  type: PlayerControlType
  uri: string | string[]
  position?: number
  progress?: number
}

export const getPlayerState = createAsyncThunk<PlayerStatusDataInterface, void, { rejectValue: ErrorType }>(
  'player/getPlayerState',
  async (_, thunkAPI) => {
    try {
      const response = await getPlaybackState()

      if (response.status === 204) {
        return null
      }

      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getCurrentTrack = createAsyncThunk<PlayerInterface, void, { rejectValue: ErrorType }>(
  'player/getCurrentTrack',
  async (_, thunkAPI) => {
    try {
      const response = await getCurrentPlayingTrack()
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const changePlayerState = createAsyncThunk<void, ChangePlayerStateProps, { rejectValue: ErrorType }>(
  'player/changePlayerState',
  async ({ type, uri, position = 0, progress = 0 }: ChangePlayerStateProps, thunkAPI) => {
    try {
      const response = await setPlayerState(type, uri, position, progress)
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const skipCurrentTrack = createAsyncThunk<void, PlayerControlType, { rejectValue: ErrorType }>(
  'player/skipCurrentTrack',
  async (type: PlayerControlType, thunkAPI) => {
    try {
      const response = await skipTrack(type)
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const changeRepeatMode = createAsyncThunk<void, string, { rejectValue: ErrorType }>(
  'player/changeRepeatMode',
  async (state: string, thunkAPI) => {
    try {
      const response = await setRepeatMode(state)
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const changePlayerShuffle = createAsyncThunk<void, boolean, { rejectValue: ErrorType }>(
  'player/changePlayerShuffle',
  async (state: boolean, thunkAPI) => {
    try {
      const response = await tooglePlaybackShuffle(state)
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)