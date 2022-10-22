import { BACKEND_URL } from "../environment/appEnvironment"
import api from "./apiClient"

export const getAllCategories = async () => {
  try {
    const response = await api({
      method: 'GET',
      url: `${BACKEND_URL}/browse/categories`,
    })
    return response
  } catch (error) {
    throw (error)
  }
}