import axios from "axios"
import { AuthDataInterface } from "../interfaces/AuthDataInterface"
import { IS_AUTHENTICATED, TOKEN_RESPONSE } from "../utils/persistentStateConstants"

const authClient = axios.create()

const commonParams = {
  redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URL,
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
}

export const spotifyAuth = async ({ code, refreshToken }: { code?: string | null, refreshToken?: string | null }) => {

  let requiredParams: any = { code, grant_type: 'authorization_code' }

  console.log('refreshToken > ', refreshToken)
  if (refreshToken) {
    requiredParams = { refresh_token: refreshToken, grant_type: 'refresh_token' }
  }

  try {
    const params: any = {
      ...requiredParams,
      ...commonParams
    }

    // Correct way to be read by Spotify API
    const searchParams = Object.keys(params).map((key: any) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    ).join('&')

    const response = await authClient({
      method: 'POST',
      url: `${process.env.REACT_APP_AUTH_URL}/api/token`,
      data: searchParams,
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    })

    const authData: AuthDataInterface = response.data

    localStorage.setItem(IS_AUTHENTICATED, JSON.stringify(true))
    localStorage.setItem(TOKEN_RESPONSE, JSON.stringify(authData))
    //return authData

    const x: AuthDataInterface = JSON.parse(localStorage.getItem(TOKEN_RESPONSE) as string)

    console.log('X: ', x)

  } catch (error) {
    console.log('Error: ', error)
    throw (error)
  }

}