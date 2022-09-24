import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { RootState } from "../redux-store"
import { refreshSpotifyToken, spotifyAuthentication } from "../redux-store/actions/authActions"
import { useAppDispatch, useAppSelector } from "./useTypedSelector"

const useAuth = () => {
  let isInitial = true
  const location = useLocation()
  const code = new URLSearchParams(location.search).get('code')
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state: RootState) => state.auth)
  const authData = authState.data

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    if (code && (!authData || !authData.refresh_token)) {
      dispatch(spotifyAuthentication(code))
      if (authData) console.log('Go Home Screen')
    }
  }, [code, authData, dispatch])

  useEffect(() => {
    if (!authData || !authData.refresh_token || !authData.expires_in) return

    const interval = setInterval(async () => {
      dispatch(refreshSpotifyToken(authData.refresh_token))
    }, (authData.expires_in - 60) * 1000)

    return () => clearInterval(interval)

  }, [authData, dispatch])

  return null
}

export default useAuth