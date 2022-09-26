import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { RootState } from "../redux-store"
import { refreshSpotifyToken, spotifyAuthentication } from "../redux-store/actions/authActions"
import { useAppDispatch, useAppSelector } from "./useTypedSelector"

const useAuth = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state: RootState) => state.auth)

  let isInitial = true
  const authData = authState.data
  const error = authState.error
  const code = new URLSearchParams(location.search).get('code')

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    if (code && (!authData || !authData.refresh_token)) {
      dispatch(spotifyAuthentication(code))
      navigate('/')
    }
  }, [code, authData, dispatch])

  useEffect(() => {
    if (!authData || !authData.refresh_token || !authData.expires_in) return

    const interval = setInterval(() => {
      dispatch(refreshSpotifyToken(authData.refresh_token))
    }, (authData.expires_in - 60) * 1000)

    if (error) {
      return () => clearInterval(interval)
    }
  }, [authData, error, dispatch])

  return null
}

export default useAuth