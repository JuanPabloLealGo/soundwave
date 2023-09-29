import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import PlaylistStateInterface from "../../interfaces/state/PlaylistStateInterface"
import { ErrorType } from "../../types"
import { getPlaylist } from "../actions/playlistActions"
import PlaylistInterface from "../../interfaces/PlaylistInterface"

const initialState = {
  data: null,
  isLoading: false,
  error: null,
} as PlaylistStateInterface

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
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

const { reducer } = playlistSlice


export default reducer