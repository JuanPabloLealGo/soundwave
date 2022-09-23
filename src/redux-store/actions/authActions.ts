import { Action, Dispatch } from "redux"
import { AuthDataInterface } from "../../interfaces/AuthDataInterface"
import { spotifyAuth } from "../../service/authService"
import { TOKEN_RESPONSE } from "../../utils/persistentStateConstants"
import { spotifyLoginFailed, spotifyLoginRequest, spotifyLoginSuccessful } from "../reducers/authSlice"

// const data: AuthDataInterface = JSON.parse(localStorage.getItem(TOKEN_RESPONSE) as string)
// const refreshToken = data.refresh_token
// const expiresIn = data.expires_in

/*
export const spotifyLogin = (code: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(spotifyLoginRequest())
    try {
      const response = await spotifyAuth({ code, grant_type: 'authorization_code' })
      dispatch(spotifyLoginSuccessful(response))
    } catch (error: any) {
      dispatch(spotifyLoginFailed(error))
    }
  }
}

export const spotifyRefreshToken = (refreshToken: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(spotifyLoginRequest())
    try {
      const response = await spotifyAuth({ refresh_token: refreshToken, grant_type: 'refresh_token' })
      dispatch(spotifyLoginSuccessful(response))
    } catch (error: any) {
      dispatch(spotifyLoginFailed(error))
    }
  }
}
*/