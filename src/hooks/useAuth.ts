import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { AuthDataInterface } from "../interfaces/AuthDataInterface"
import { spotifyAuth } from "../service/authService"
import { TOKEN_RESPONSE } from "../utils/persistentStateConstants"

const useAuth = () => {

  let isInitial = true
  const location = useLocation()
  const code = new URLSearchParams(location.search).get('code')
  const authData: AuthDataInterface = JSON.parse(localStorage.getItem(TOKEN_RESPONSE) as string)
  console.log('authData > ', authData)


  const authenticateUser = async (code: string | null) => {
    await spotifyAuth({ code })
  }

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    if (code) authenticateUser(code)
  }, [code])

  useEffect(() => {
    console.log('auth data: ', authData)
    /*
    if (!authData) return

    const refreshToken = authData.refresh_token
    const expiresIn = authData.expires_in

    const interval = setInterval(async () => {
      await spotifyAuth({ refreshToken })
    }, (5 - 60) * 1000)

    return () => clearInterval(interval)
    */
  }, [authData])


  return null
}

export default useAuth