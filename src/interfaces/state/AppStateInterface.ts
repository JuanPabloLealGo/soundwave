import AuthStateInterface from "./AuthStateInterface";
import CategoryListStateInterface from "./CategoryListStateInterface";
<<<<<<< HEAD
import PlaylistsStateInterface from "./PlayListsStateInterface";
import TracksStateInterface from "./TracksStateInterface";
=======
import PlaylistStateInterface from "./PlaylistStateInterface";
import TrackStateInterface from "./TrackStateInterface";
>>>>>>> e560bc2 (feat: redux flux improvements)
import UiStateInterface from "./UiStateInterface";

export default interface AppStateInterface {
  auth: AuthStateInterface
  category: CategoryListStateInterface
  ui: UiStateInterface
  playlist: PlaylistStateInterface
  track: TrackStateInterface
}