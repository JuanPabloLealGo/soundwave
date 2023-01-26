import ErrorMessageInterface from "../ErrorMessageInterface"

export default interface UiStateInterface {
  isDarkTheme: boolean
  errorMessage: ErrorMessageInterface | null
}