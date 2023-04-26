import PlaylistByCategoryInterface from "../PlaylistByCategoryInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface PlaylistPageStateInterface extends CommonStateInterface {
  data: null | PlaylistByCategoryInterface
}