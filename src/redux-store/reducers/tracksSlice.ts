import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import TracksStateInterface from "../../interfaces/state/TracksStateInterface"
import TracksPageInterface from "../../interfaces/TracksPageInterface"
import { getTracksPage } from "../actions/tracksActions"

const initialState = {
  data: null,
  isLoading: false,
  error: null
} as TracksStateInterface

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTracksPage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTracksPage.fulfilled, (state, action: PayloadAction<TracksPageInterface>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getTracksPage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default tracksSlice.reducer