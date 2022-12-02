import { BACKEND_URL } from "../environment/appEnvironment"
import api from "./apiClient"

export const getAllCategories = async (limit: number, offset: number) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${BACKEND_URL}/browse/categories`,
      params: { limit, offset }
    })
    return response
  } catch (error) {
    throw (error)
  }
}