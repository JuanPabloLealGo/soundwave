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

export const getSavedTracks = async (limit: number, offset: number) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${BACKEND_URL}/me/tracks`,
      params: { limit, offset }
    })
    return response
  } catch (error) {
    throw (error)
  }
}

export const saveTrack = async (id: string) => {
  try {
    const response = await api({
      method: 'PUT',
      url: `${BACKEND_URL}/me/tracks`,
      params: { 'ids': id }
    })
    return response
  } catch (error) {
    throw (error)
  }
}

export const removeSavedTrack = async (id: string) => {
  try {
    const response = await api({
      method: 'DELETE',
      url: `${BACKEND_URL}/me/tracks`,
      params: { 'ids': id }
    })
    return response
  } catch (error) {
    throw (error)
  }
}