import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { RootState, useAppDispatch, useAppSelector } from "../redux-store"
import { spotifyAuthentication } from "../redux-store/actions/authActions"
import { logout } from "../redux-store/reducers/authSlice"
import { setErrorMessage } from "../redux-store/reducers/uiSlice"
import ErrorMessageInterface from "../interfaces/ErrorMessageInterface"

const useAuth = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state: RootState) => state.auth)

  const didMountRef = useRef(true)
  const authData = authState.data
  const error = authState.error
  const code = new URLSearchParams(location.search).get('code')

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (code && (!authData || !authData.refresh_token)) {
      dispatch(spotifyAuthentication(code))
      navigate('/')
    }
  }, [code, authData, dispatch, navigate])

  useEffect(() => {
    if (!authData || !authData.refresh_token || !authData.expires_in) return

    const interval = setInterval(() => {
      dispatch(logout())
      const errorMessage = {
        title: 'Session Expired',
        error: 'Your session has expired. Please log in.'
      } as ErrorMessageInterface

      dispatch(setErrorMessage(errorMessage))
    }, (authData.expires_in - 60) * 1000)

    if (error) {
      clearInterval(interval)
      dispatch(logout())
    }
  }, [authData, error, dispatch])

  return null
}

export default useAuth