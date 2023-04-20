import PlaylistInterface from "../PlayListInterface";
import PlaylistsPageInterface from "../PlaylistPageInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface PlaylistsStateInterface extends CommonStateInterface {
  data: null | { [key: string]: PlaylistsPageInterface }
  currentPlaylist: null | PlaylistInterface
}