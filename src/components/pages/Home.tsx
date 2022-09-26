import React from "react"
import { AUTH_URL } from "../../environment/appEnvironment"
import { useAppSelector } from "../../hooks/useTypedSelector"
import { RootState } from "../../redux-store"


const Home = () => {

  const isAuthenticated = useAppSelector((state: RootState) => state.auth.data)

  const handleLoginClick = () => {
    window.location.replace(AUTH_URL)
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>AUTHENTICATED VIEW</div>
      ) : (
        <button onClick={handleLoginClick}>
          Login with Spotify
        </button>
      )}
    </div>
  )
}

export default Home