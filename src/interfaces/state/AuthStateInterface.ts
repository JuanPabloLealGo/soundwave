import AuthDataInterface from "../AuthDataInterface"
import CommonStateInterface from "./CommonStateInterface"

export default interface AuthStateInterface extends CommonStateInterface {
  data: null | AuthDataInterface
}