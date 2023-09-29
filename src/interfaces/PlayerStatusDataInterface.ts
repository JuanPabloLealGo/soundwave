import TrackItemInterface from "./TrackItemInterface"

export default interface PlayerStatusDataInterface {
  currently_playing_type: 'string'
  is_playing: boolean
  item: TrackItemInterface
  progress_ms: number
  repeat_state: string
  shuffle_state: boolean
  timestamp: number
} 