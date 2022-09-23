import { AuthDataInterface } from "../AuthDataInterface"
import { CommonStateInterface } from "./CommonStateInterface"

export interface AuthStateInterface extends CommonStateInterface {
  authData: AuthDataInterface
}