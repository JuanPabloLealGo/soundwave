import { BACKEND_URL } from "../environment/appEnvironment"
import api from "./apiClient"

export const getCategorysPlayLists = async (categoryId: string, limit: number, offset: number) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${BACKEND_URL}/browse/categories/${categoryId}/playlists`,
      params: { limit, offset }
    })
    return response
  } catch (error) {
    throw (error)
  }
}