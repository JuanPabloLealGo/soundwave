import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import PlaylistByCategoryInterface from "../../interfaces/PlaylistByCategoryInterface"
import { ErrorType } from "../../types"
import PlaylistPageStateInterface from "../../interfaces/state/PlaylistPageStateInterface"
import { getPlaylistPageByCategory } from "../actions/playlistPageActions"

const initialState = {
  data: null,
  isLoading: false,
  error: null,
} as PlaylistPageStateInterface

const playlistPageSlice = createSlice({
  name: 'playlistPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylistPageByCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getPlaylistPageByCategory.fulfilled, (state, { payload }: PayloadAction<PlaylistByCategoryInterface>) => {
        state.isLoading = false
        state.error = null
        const categoryId = Object.keys(payload)[0]
        const payloadData = payload[categoryId]
        const isLoadMore = payloadData.offset > 0
        const exists = Object.keys({ ...state.data }).includes(categoryId)
        const stateClone = { ...state.data }
        if (exists && stateClone[categoryId]) {
          stateClone[categoryId] = {
            ...payloadData,
            items: isLoadMore
              ? [...stateClone[categoryId].items, ...payloadData.items]
              : payloadData.items
          }
          state.data = stateClone
        } else {
          state.data = { ...state.data, ...payload }
        }
      })
      .addCase(getPlaylistPageByCategory.rejected, (state, action: PayloadAction<ErrorType>) => {
        state.isLoading = false
        state.error = action.payload
      })

  }
})

const { reducer } = playlistPageSlice

export default reducer