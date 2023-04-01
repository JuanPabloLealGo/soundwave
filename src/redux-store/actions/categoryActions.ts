import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllCategories } from "../../api/categoryApi"
import CategoryPageInterface from "../../interfaces/CategoryInterface"
import { ErrorType } from "../../types"
import ErrorInterface from "../../interfaces/ErrorInterface"

interface CategoryPagePayload {
  limit: number
  offset: number
}

export const getCategoryPage = createAsyncThunk<CategoryPageInterface, CategoryPagePayload, { rejectValue: ErrorType }>(
  'category/getCategoryPage',
  async ({ limit, offset }: CategoryPagePayload, thunkAPI) => {
    try {
      const response = await getAllCategories(limit, offset)
      return response.data.categories
    } catch (error) {
      const { message } = (error as ErrorInterface).error
      return thunkAPI.rejectWithValue(message)
    }
  }
)