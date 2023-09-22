import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PlayerStateInterface from "../../interfaces/state/PlayerStateInterface";
import { changePlayerState, getCurrentTrack, skipCurrentTrack } from "../actions/playerActions";
import PlayerInterface from "../../interfaces/PlayerInterface";
import { ErrorType } from "../../types";

const initialState = {
  currentTrack: {
    data: null,
    isLoading: false,
    error: null,
  },
  playerState: {
    data: false,
    isLoading: false,
    error: null,
  },
  currentUri: null,
} as PlayerStateInterface

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateCurrentUri: (
      state: PlayerStateInterface,
      action: PayloadAction<null | string | string[]>
    ) => {
      state.currentUri = action.payload
    },
    resetCurrentUri: (state: PlayerStateInterface) => {
      state.currentUri = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentTrack.pending, (state: PlayerStateInterface,) => {
        state.currentTrack.isLoading = true
      })
      .addCase(getCurrentTrack.fulfilled, (state: PlayerStateInterface, { payload }: PayloadAction<PlayerInterface>) => {
        state.currentTrack.isLoading = false
        state.currentTrack.data = typeof payload === 'string' ? null : payload
        state.playerState.data = payload.is_playing
      })
      .addCase(getCurrentTrack.rejected, (state: PlayerStateInterface, action: PayloadAction<ErrorType>) => {
        state.playerState.isLoading = false
        state.playerState.error = action.payload
      })

      .addCase(changePlayerState.pending, (state: PlayerStateInterface,) => {
        state.playerState.isLoading = true
      })
      .addCase(changePlayerState.fulfilled, (state: PlayerStateInterface) => {
        state.playerState.isLoading = false
        state.playerState.data = !state.playerState.data
      })
      .addCase(changePlayerState.rejected, (state: PlayerStateInterface, action: PayloadAction<ErrorType>) => {
        state.playerState.isLoading = false
        state.playerState.error = action.payload
      })

      .addCase(skipCurrentTrack.fulfilled, (state: PlayerStateInterface) => {
        state.playerState.isLoading = false
      })
      .addCase(skipCurrentTrack.rejected, (state: PlayerStateInterface, action: PayloadAction<ErrorType>) => {
        state.playerState.isLoading = false
        state.playerState.error = action.payload
      })
  }
})

const { actions, reducer } = playerSlice

export const { updateCurrentUri, resetCurrentUri } = actions

export default reducer