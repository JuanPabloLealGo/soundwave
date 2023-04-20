import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PlaylistInterface from "../../interfaces/PlayListInterface";
import PlaylistsPageInterface from "../../interfaces/PlaylistPageInterface";
import PlaylistsStateInterface from "../../interfaces/state/PlayListsStateInterface";
import { getPlaylistsPage } from "../actions/playlistsActions";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  currentPlaylist: null,
} as PlaylistsStateInterface

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    updateCurrentPlaylist: (
      state: PlaylistsStateInterface,
      action: PayloadAction<PlaylistInterface | null>
    ) => {
      state.currentPlaylist = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPlaylistsPage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlaylistsPage.fulfilled, (state, { payload }) => {
        state.isLoading = false
        const categoryId = Object.keys(payload)[0]
        const payloadData = payload[categoryId]
        const exists = Object.keys({ ...state.data }).includes(categoryId)
        const stateClone = { ...state.data } ?? {} as null | { [key: string]: PlaylistsPageInterface }

        if (exists && stateClone[categoryId]) {
          stateClone[categoryId] = {
            ...payloadData,
            items: [...stateClone[categoryId].items, ...payloadData.items]
          }
          state.data = stateClone
        } else {
          state.data = { ...state.data, ...payload }
        }
      })
      .addCase(getPlaylistsPage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { updateCurrentPlaylist } = playlistsSlice.actions

export default playlistsSlice.reducer