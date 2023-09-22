import { createAsyncThunk } from "@reduxjs/toolkit";
import PlayerInterface from "../../interfaces/PlayerInterface";
import { getCurrentPlayingTrack, getPlaybackState, setPlayerState, skipTrack } from "../../api/playerApi";
import ErrorInterface from "../../interfaces/ErrorInterface";
import { PlayerControlType } from "../../enums/PlayerControlType";
import { ErrorType } from "../../types";

interface ChangePlayerStateProps {
  type: PlayerControlType
  uri: string | string[]
  position?: number
  progress?: number
}

export const getPlayerState = createAsyncThunk<PlayerInterface>(
  'player/getPlayerState',
  async (_, thunkAPI) => {
    try {
      const response = await getPlaybackState()
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