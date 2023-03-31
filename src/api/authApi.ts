import axios from "axios"
import AuthPayloadInterface from "../interfaces/AuthPayloadInterface"
import AxiosErrorInterface from "../interfaces/AxiosErrorInterface"

interface ParamsInterface {
  [key: string]: unknown
}

const apiClient = axios.create()

const commonParams: ParamsInterface = {
  redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URL,
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
}

export const spotifyAuth = async (requiredParams: AuthPayloadInterface) => {
  try {
    const params: ParamsInterface = {
      ...requiredParams,
      ...commonParams
    }

    const searchParams = Object.keys(params).map((key) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(params[key] as string)
    ).join('&')

    const response = await apiClient({
      method: 'POST',
      url: `${process.env.REACT_APP_AUTH_URL}/api/token`,
      data: searchParams,
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    })

    return response
  } catch (error) {
    throw ((error as AxiosErrorInterface).response.data)
  }
}