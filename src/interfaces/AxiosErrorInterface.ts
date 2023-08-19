import AuthErrorInterface from "./AuthErrorInterface"

interface AxiosErrorData {
  data: AuthErrorInterface
}

export default interface AxiosErrorInterface {
  code: string
  message: string
  response: AxiosErrorData
}