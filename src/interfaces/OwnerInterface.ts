import ExternalUrlsInterface from "./ExternalUrlsInterface"

export default interface OwnerInterface {
  display_name: string
  external_urls: ExternalUrlsInterface
  href: string
  id: string
  type: string
  uri: string
}