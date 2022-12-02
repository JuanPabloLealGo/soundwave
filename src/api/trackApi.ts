import { BACKEND_URL } from "../environment/appEnvironment"
import api from "./apiClient"

export const getAllTracks = async (playlistId: string, limit: number, offset: number) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${BACKEND_URL}/playlists/${playlistId}/tracks`,
      params: { limit, offset }
    })
    return response
  } catch (error) {
    throw (error)
  }
}