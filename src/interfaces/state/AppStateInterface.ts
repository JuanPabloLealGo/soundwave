import AuthStateInterface from "./AuthStateInterface";
import CategoryListStateInterface from "./CategoryListStateInterface";
import PlayerStateInterface from "./PlayerStateInterface";
import PlaylistPageStateInterface from "./PlaylistPageStateInterface";
import PlaylistStateInterface from "./PlaylistStateInterface";
import TrackStateInterface from "./TrackStateInterface";
import UiStateInterface from "./UiStateInterface";

export default interface AppStateInterface {
  auth: AuthStateInterface
  category: CategoryListStateInterface
  ui: UiStateInterface
  playlist: PlaylistStateInterface
  playlistPage: PlaylistPageStateInterface
  track: TrackStateInterface
  player: PlayerStateInterface
}