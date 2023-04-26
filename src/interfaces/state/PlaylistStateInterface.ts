import PlaylistInterface from "../PlaylistInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface PlaylistStateInterface extends CommonStateInterface {
  data: null | PlaylistInterface
  currentUris: null | string | string[]
}