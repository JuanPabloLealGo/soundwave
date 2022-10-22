import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllCategories } from "../../api/categoryApi"
import CategoryPageInterface from "../../interfaces/CategoryInterface"

export const getCategoryPage = createAsyncThunk(
  'categories',
  async (data, thunkAPI) => {
    try {
      const response = await getAllCategories()
      return response.data.categories as CategoryPageInterface
    } catch (error: any) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)