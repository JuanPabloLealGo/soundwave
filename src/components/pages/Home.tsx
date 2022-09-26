import React from "react"
import { AUTH_URL } from "../../environment/appEnvironment"

interface Props {
  isAuthenticated: boolean
}

const Home = ({ isAuthenticated }: Props) => {

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