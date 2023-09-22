import PlaybackStateInterface from "../PlaybackStateInterface";
import PlayerDataInterface from "../PlayerDataInterface";

export default interface PlayerStateInterface {
  currentTrack: PlayerDataInterface
  playerState: PlaybackStateInterface
  currentUri: null | string | string[]
}