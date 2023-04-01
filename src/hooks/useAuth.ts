import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux-store"
import { spotifyAuthentication } from "../redux-store/actions/authActions"
import { logout } from "../redux-store/reducers/authSlice"
import { setErrorMessage } from "../redux-store/reducers/uiSlice"
import { authSelector } from "../redux-store/selectors"

const useAuth = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const didMountRef = useRef(true)
  const { data, error } = useAppSelector(authSelector)

  const code = new URLSearchParams(location.search).get('code')

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (code && (!data || !data.refresh_token)) {
      dispatch(spotifyAuthentication(code))
      navigate('/')
    }
  }, [code, data, dispatch, navigate])

  useEffect(() => {
    if (!data || !data.refresh_token || !data.expires_in) return

    const interval = setInterval(() => {
      dispatch(logout())
      const errorMessage = 'Your session has expired. Please log in.'

      dispatch(setErrorMessage(errorMessage))
    }, (data.expires_in - 60) * 1000)

    if (error) {
      clearInterval(interval)
      dispatch(logout())
    }
  }, [data, error, dispatch])

  return error

}

export default useAuth