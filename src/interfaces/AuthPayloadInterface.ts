export default interface AuthPayloadInterface {
  refresh_token?: string
  code?: string
  grant_type: string
}