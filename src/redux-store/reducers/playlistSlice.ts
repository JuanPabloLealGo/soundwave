import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import PlaylistStateInterface from "../../interfaces/state/PlaylistStateInterface"
import { ErrorType } from "../../types"
import { getPlaylist } from "../actions/playlistActions"
import PlaylistInterface from "../../interfaces/PlayListInterface"

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  currentUris: null,
} as PlaylistStateInterface

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    updateCurrentPlaylist: (
      state: PlaylistStateInterface,
      action: PayloadAction<string | string[]>
    ) => {
      state.currentUris = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlaylist.fulfilled, (state, { payload }: PayloadAction<PlaylistInterface>) => {
        state.isLoading = false
        state.data = payload
      })
      .addCase(getPlaylist.rejected, (state, action: PayloadAction<ErrorType>) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

const { actions, reducer } = playlistSlice

export const { updateCurrentPlaylist } = actions

export default reducer