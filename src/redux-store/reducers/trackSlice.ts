import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import TrackStateInterface from "../../interfaces/state/TrackStateInterface"
import TrackPageInterface from "../../interfaces/TrackPageInterface"
import { getTrackPage } from "../actions/trackActions"
import { ErrorType } from "../../types"

const initialState = {
  data: null,
  isLoading: false,
  error: null
} as TrackStateInterface

const tracksSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTrackPage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTrackPage.fulfilled, (state, action: PayloadAction<TrackPageInterface>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getTrackPage.rejected, (state, action: PayloadAction<ErrorType>) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default tracksSlice.reducer