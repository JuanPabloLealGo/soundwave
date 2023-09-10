import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PlayerStateInterface from "../../interfaces/state/PlayerStateInterface";
import { changePlayerState, getCurrentTrack } from "../actions/playerActions";
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
  }
} as PlayerStateInterface

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentTrack.pending, (state) => {
        state.currentTrack.isLoading = true
      })
      .addCase(getCurrentTrack.fulfilled, (state, { payload }: PayloadAction<PlayerInterface>) => {
        state.currentTrack.isLoading = false
        state.currentTrack.data = payload
      })
      .addCase(getCurrentTrack.rejected, (state) => { })

      .addCase(changePlayerState.pending, (state) => {
        state.playerState.isLoading = true
      })
      .addCase(changePlayerState.fulfilled, (state) => {
        state.playerState.isLoading = false
        state.playerState.data = !state.playerState.data
      })
      .addCase(changePlayerState.rejected, (state, action: PayloadAction<ErrorType>) => {
        state.playerState.isLoading = false
        state.playerState.error = action.payload
      })
  }
})

const { reducer } = playerSlice

export default reducer