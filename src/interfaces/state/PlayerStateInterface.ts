import PlayerStatusInterface from "../PlayerStatusInterface";

export default interface PlayerStateInterface {
  currentUri: null | string | string[]
  playerStatus: PlayerStatusInterface
}