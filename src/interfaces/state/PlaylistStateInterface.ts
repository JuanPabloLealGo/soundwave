import PlaylistPageInterface from "../PlaylistPageInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface PlaylistStateInterface extends CommonStateInterface {
  data: null | { [key: string]: PlaylistPageInterface }
  currentUris: null | string | string[]
}