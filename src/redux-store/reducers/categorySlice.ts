import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CategoryPageInterface from "../../interfaces/CategoryInterface";
import CategoryListStateInterface from "../../interfaces/state/CategoryListStateInterface";
import { getCategoryPage } from "../actions/categoryActions";
import { ErrorType } from "../../types";

const initialState = {
  data: null,
  isLoading: false,
  error: null
} as CategoryListStateInterface

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryPage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategoryPage.fulfilled, (state, action: PayloadAction<CategoryPageInterface>) => {
        const isLoadMore = action.payload.offset > 0
        state.isLoading = false
        state.data = {
          ...action.payload,
          items: isLoadMore
            ? [...state.data?.items ?? [], ...action.payload.items]
            : action.payload.items
        }
      })
      .addCase(getCategoryPage.rejected, (state, action: PayloadAction<ErrorType>) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

const { reducer } = categorySlice

export default reducer