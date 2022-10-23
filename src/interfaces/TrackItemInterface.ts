import AlbumInterface from "./AlbumInterface"
import ArtistInterface from "./ArtistInterface"

export default interface TrackItemInterface {
  album: AlbumInterface
  artists: ArtistInterface[]
  disc_number: number
  duration_ms: number
  episode: boolean
  explicit: boolean
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string | null
  track: boolean
  track_number: number
  type: string
  uri: string
}