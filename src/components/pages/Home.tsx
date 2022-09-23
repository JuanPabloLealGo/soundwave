import React from "react"
import { AUTH_URL } from "../../environment/appEnvironment"
import useAuth from "../../hooks/useAuth"


const Home = () => {
  useAuth()

  const handleLoginClick = () => {
    window.location.replace(AUTH_URL)
  }

  return (
    <div>
      <button onClick={handleLoginClick}>
        Login with Spotify
      </button>
    </div>
  )
}

export default Home