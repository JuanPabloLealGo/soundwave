import axios from "axios"

const apiClient = axios.create()

const commonParams = {
  redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URL,
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
}

export const spotifyAuth = async (requiredParams: any) => {
  try {
    const params: any = {
      ...requiredParams,
      ...commonParams
    }

    const searchParams = Object.keys(params).map((key: any) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    ).join('&')

    const response = await apiClient({
      method: 'POST',
      url: `${process.env.REACT_APP_AUTH_URL}/api/token`,
      data: searchParams,
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    })

    return response
  } catch (error) {
    throw (error)
  }
}