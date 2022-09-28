import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CategoryPageInterface from "../../interfaces/CategoryPageInterface";
import CategoryListStateInterface from "../../interfaces/state/CategoryListSatateInterface";
import { getCategoryPage } from "../actions/categoryActions";

const initialState = {
  data: null,
  isLoading: false,
  error: null
} as CategoryListStateInterface

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(getCategoryPage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategoryPage.fulfilled, (state, action: PayloadAction<CategoryPageInterface>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getCategoryPage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default categorySlice.reducer