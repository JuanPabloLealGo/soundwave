import { createAsyncThunk } from "@reduxjs/toolkit";
import PlayerInterface from "../../interfaces/PlayerInterface";
import { getCurrentPlayingTrack, getPlaybackState, setPlayerState } from "../../api/playerApi";
import ErrorInterface from "../../interfaces/ErrorInterface";
import { PlayerStateEnum } from "../../enums/PlayerStateEnum";
import { ErrorType } from "../../types";

interface ChangePlayerStateProps {
  playerState: PlayerStateEnum
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

export const getCurrentTrack = createAsyncThunk<PlayerInterface>(
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
  async ({ playerState, uri, position = 0, progress = 0 }: ChangePlayerStateProps, thunkAPI) => {
    try {
      const response = await setPlayerState(playerState, uri, position, progress)
      return response.data
    } catch (error) {
      const { message } = (error as ErrorInterface).response.data.error
      return thunkAPI.rejectWithValue(message)
    }
  }
)