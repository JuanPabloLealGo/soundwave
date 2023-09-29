import TrackItemInterface from "./TrackItemInterface"

export default interface PlayerInterface {
  progress_ms: number
  is_playing: boolean
  item: TrackItemInterface
  timestamp: number
}