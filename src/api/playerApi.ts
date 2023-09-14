import { PlayerStateEnum } from "../enums/PlayerStateEnum"
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

export const setPlayerState = async (playerState: PlayerStateEnum, uri: string | string[], position?: null | number, progress?: null | number) => {

  const isTrack = uri.includes("track");

  const payload = isTrack
    ? { 'uris': [uri] }
    : {
      'context_uri': uri,
      'offset': {
        "position": position
      },
      "position_ms": progress
    }

  try {
    const response = await api({
      method: 'PUT',
      url: `${BACKEND_URL}/me/player/${playerState}`,
      data: payload
    })
    return response
  } catch (error) {
    throw (error)
  }
}