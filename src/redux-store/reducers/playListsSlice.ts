import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PlaylistsStateInterface from "../../interfaces/state/PlaylistsStateInterface";
import { getPlaylistsPage } from "../actions/playlistActions";

const initialState = {
  data: null,
  isLoading: false,
  error: null
} as PlaylistsStateInterface

const playlistsSlice = createSlice({
  name: 'playLists',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPlaylistsPage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlaylistsPage.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = { ...state.data, ...payload }
      })
      .addCase(getPlaylistsPage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default playlistsSlice.reducer