import { DEPLOYMENT_MODE } from "../utils/deploymentConstants"
import { isProductionMode } from "./appConfig"
import { BACKEND_PRODUCTION_URL } from "./production"
import { BACKEND_STAGE_URL } from "./staging"

let url

if ((window as any).Configs) {
  if ((window as any).Configs.deploymentEnv === DEPLOYMENT_MODE.STAGE) {
    url = BACKEND_STAGE_URL
  } else if ((window as any).Configs.deploymentEnv === DEPLOYMENT_MODE.PROD) {
    url = BACKEND_PRODUCTION_URL
  }
} else {
  url = isProductionMode ? BACKEND_PRODUCTION_URL : BACKEND_STAGE_URL
}

export const BACKEND_URL = url
export const AUTH_URL = `${process.env.REACT_APP_AUTH_URL}/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URL}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`