import { PlayerControlType } from "../enums/PlayerControlType"
import { BACKEND_URL } from "../environment/appEnvironment"
import api from "./apiClient"

export const getPlaybackState = async () => {
  try {
    const response = await api({
      method: 'GET',
      url: `${BACKEND_URL}/me/player`,
    })
    return response
  } catch (error) {
    throw (error)
  }
}

export const getCurrentPlayingTrack = async () => {
  try {
    const response = await api({
      method: 'GET',
      url: `${BACKEND_URL}/me/player/currently-playing`,
    })
    return response
  } catch (error) {
    throw (error)
  }
}

export const setPlayerState = async (
  type: PlayerControlType,
  uri: string | string[],
  position?: null | number,
  progress?: null | number,
) => {

  const isArray = Array.isArray(uri)

  const payload = {
    'uris': isArray ? uri : [uri],
    'offset': {
      "position": position
    },
    "position_ms": progress
  }

  try {
    const response = await api({
      method: 'PUT',
      url: `${BACKEND_URL}/me/player/${type}`,
      data: payload
    })
    return response
  } catch (error) {
    throw (error)
  }
}

export const skipTrack = async (type: PlayerControlType) => {
  try {
    const response = await api({
      method: 'POST',
      url: `${BACKEND_URL}/me/player/${type}`,
    })
    return response
  } catch (error) {
    throw (error)
  }
} 