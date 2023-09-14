import CurrentUrisInterface from "../CurrentUrisInterface";
import PlaybackStateInterface from "../PlaybackStateInterface";
import PlayerDataInterface from "../PlayerDataInterface";

export default interface PlayerStateInterface {
  currentTrack: PlayerDataInterface
  playerState: PlaybackStateInterface
  currentUris: null | CurrentUrisInterface
}