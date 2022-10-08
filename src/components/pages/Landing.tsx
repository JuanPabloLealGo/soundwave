import { AUTH_URL } from "../../environment/appEnvironment"
import MainButton, { MainButtonType } from "../MainButton"


const Landing = () => {
  const handleLoginClick = () => {
    window.location.replace(AUTH_URL)
  }

  return (
    <div>
      <div className="main-headline">
        Headline Image
      </div>
      <h1 className="text">Landing Page</h1>
      <MainButton
        label='Login with Spotify'
        onClick={handleLoginClick}
        type={MainButtonType.Secondary}
      />
    </div>
  )
}

export default Landing