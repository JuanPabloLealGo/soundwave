import { API_CONSTANTS } from "../utils/apiConstants"
import api from "./apiClient"

export const getAllCategories = async () => {
  try {
    const response = await api({
      method: 'GET',
      url: API_CONSTANTS.browseCategories,
    })
    return response
  } catch (error) {
    throw (error)
  }
}