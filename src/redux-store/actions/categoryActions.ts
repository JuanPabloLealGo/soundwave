import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllCategories } from "../../api/categoryApi"
import CategoryPageInterface from "../../interfaces/CategoryInterface"

interface Props {
  limit: number
  offset: number
}

export const getCategoryPage = createAsyncThunk(
  'category/getCategoryPage',
  async ({ limit, offset }: Props, thunkAPI) => {
    try {
      const response = await getAllCategories(limit, offset)
      return response.data.categories as CategoryPageInterface
    } catch (error: any) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)