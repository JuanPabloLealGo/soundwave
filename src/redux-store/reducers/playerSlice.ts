import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PlayerStateInterface from "../../interfaces/state/PlayerStateInterface";
import { changePlayerShuffle, changeRepeatMode, getPlayerState, skipCurrentTrack } from "../actions/playerActions";
import { ErrorType } from "../../types";
import PlayerStatusDataInterface from "../../interfaces/PlayerStatusDataInterface";
import { repeatOptions } from "../../utils/constants";

const initialState = {
  currentUri: null,
  playerStatus: {
    data: null,
    isLoading: false,
    error: null,
  }
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

      .addCase(skipCurrentTrack.fulfilled, (state: PlayerStateInterface) => {
        state.playerStatus.isLoading = false
      })
      .addCase(skipCurrentTrack.rejected, (state: PlayerStateInterface, action: PayloadAction<ErrorType>) => {
        state.playerStatus.isLoading = false
        state.playerStatus.error = action.payload
      })

      .addCase(getPlayerState.pending, (state: PlayerStateInterface) => {
        state.playerStatus.isLoading = true
      })
      .addCase(getPlayerState.fulfilled, (state: PlayerStateInterface, action: PayloadAction<PlayerStatusDataInterface>) => {
        state.playerStatus.isLoading = false
        state.playerStatus.data = action.payload
      })
      .addCase(getPlayerState.rejected, (state: PlayerStateInterface, action: PayloadAction<ErrorType>) => {
        state.playerStatus.isLoading = false
        state.playerStatus.error = action.payload
      })

      .addCase(changePlayerShuffle.fulfilled, (state: PlayerStateInterface) => {
        const currentShuffleMode = state.playerStatus.data?.shuffle_state

        if (state.playerStatus && state.playerStatus.data) {
          state.playerStatus.data = {
            ...state.playerStatus.data,
            shuffle_state: !currentShuffleMode
          }
        }
      })
      .addCase(changeRepeatMode.fulfilled, (state: PlayerStateInterface) => {
        if (state.playerStatus && state.playerStatus.data) {
          const currentIndex = repeatOptions.indexOf(state.playerStatus.data.repeat_state)
          const nextIndex = (currentIndex + 1) % repeatOptions.length
          const nextRepeatMode = repeatOptions[nextIndex]

          state.playerStatus.data = {
            ...state.playerStatus.data,
            repeat_state: nextRepeatMode
          }
        }
      })
  }
})

const { actions, reducer } = playerSlice

export const { updateCurrentUri, resetCurrentUri } = actions

export default reducer