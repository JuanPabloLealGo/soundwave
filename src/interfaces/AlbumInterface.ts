import ArtistInterface from "./ArtistInterface"
import ExternalUrlsInterface from "./ExternalUrlsInterface"
import ImageInterface from "./ImageInterface"

export default interface AlbumInterface {
  album_type: string
  artists: ArtistInterface[]
  external_urls: ExternalUrlsInterface
  href: string
  id: string
  images: ImageInterface[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}