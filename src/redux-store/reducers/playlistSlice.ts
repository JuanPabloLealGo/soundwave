import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PlaylistStateInterface from "../../interfaces/state/PlaylistStateInterface";
import { getPlaylistPage } from "../actions/playlistActions";
import PlaylistByCategoryInterface from "../../interfaces/PlaylistByCategoryInterface";
import { ErrorType } from "../../types";

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
      .addCase(getPlaylistPage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlaylistPage.fulfilled, (state, { payload }: PayloadAction<PlaylistByCategoryInterface>) => {
        state.isLoading = false
        const categoryId = Object.keys(payload)[0]
        const payloadData = payload[categoryId]
        const exists = Object.keys({ ...state.data }).includes(categoryId)
        const stateClone = { ...state.data }
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
      .addCase(getPlaylistPage.rejected, (state, action: PayloadAction<ErrorType>) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const getPlaylistById = (state: PlaylistStateInterface, categoryId?: string, playlistId?: string) =>
  state.data && categoryId && playlistId ? state.data[categoryId].items.find((p) => p.id === playlistId) : null;

const { actions, reducer } = playlistSlice

export const { updateCurrentPlaylist } = actions

export default reducer