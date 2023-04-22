import PlaylistByCategoryInterface from "../PlaylistByCategoryInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface PlaylistStateInterface extends CommonStateInterface {
  data: null | PlaylistByCategoryInterface
  currentUris: null | string | string[]
}