import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PlayListsStateInterface from "../../interfaces/state/PlayListsStateInterface";
import { getPlayListsPage } from "../actions/playListActions";

const initialState = {
  data: null,
  isLoading: false,
  error: null
} as PlayListsStateInterface

const playListsSlice = createSlice({
  name: 'playLists',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPlayListsPage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlayListsPage.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = { ...state.data, ...payload }
      })
      .addCase(getPlayListsPage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default playListsSlice.reducer