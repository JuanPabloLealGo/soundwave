import AuthStateInterface from "./AuthStateInterface";
import CategoryListStateInterface from "./CategoryListStateInterface";
import PlaylistStateInterface from "./PlaylistStateInterface";
import TrackStateInterface from "./TrackStateInterface";
import UiStateInterface from "./UiStateInterface";

export default interface AppStateInterface {
  auth: AuthStateInterface
  category: CategoryListStateInterface
  ui: UiStateInterface
  playlist: PlaylistStateInterface
  track: TrackStateInterface
}