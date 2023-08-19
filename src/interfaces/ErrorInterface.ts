interface ErrorResponse {
  data: ErrorData
}

interface ErrorData {
  error: Error
}

interface Error {
  message: string
}

export default interface ErrorInterface {
  response: ErrorResponse
}