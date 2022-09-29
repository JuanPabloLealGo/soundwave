import { AUTH_URL } from "../../environment/appEnvironment"

const Landing = () => {
  const handleLoginClick = () => {
    window.location.replace(AUTH_URL)
  }

  return (
    <div>
      <h1 className="text">Landing Page</h1>
      <button onClick={handleLoginClick}>
        Login with Spotify
      </button>
    </div>
  )
}

export default Landing