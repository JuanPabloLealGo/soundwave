import { TypeEnum } from "../enums/TypeEnum"
import ExternalUrlsInterface from "./ExternalUrlsInterface"
import ImageInterface from "./ImageInterface"
import OwnerInterface from "./OwnerInterface"
import TracksInterface from "./TracksInterface"

export default interface PlayListInterface {
  collaborative: boolean
  description: string
  external_urls: ExternalUrlsInterface
  href: string
  id: string
  images: ImageInterface[]
  name: string
  owner: OwnerInterface
  public: boolean | null
  snapshot_id: string
  tracks: TracksInterface
  type: TypeEnum
  uri: string
}