import { TypeEnum } from "../enums/TypeEnum"
import ExternalUrlsInterface from "./ExternalUrlsInterface"
import ImageInterface from "./ImageInterface"
import OwnerInterface from "./OwnerInterface"
import TrackListInterface from "./TrackListInterface"

export default interface PlaylistInterface {
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
  tracks: TrackListInterface
  type: TypeEnum
  uri: string
}