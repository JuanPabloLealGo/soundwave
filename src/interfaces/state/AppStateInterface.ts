import AuthStateInterface from "./AuthStateInterface";
import CategoryListStateInterface from "./CategoryListStateInterface";
import PlaylistsStateInterface from "./PlaylistsStateInterface";
import UiStateInterface from "./UiStateInterface";

export default interface AppStateInterface {
  auth: AuthStateInterface
  category: CategoryListStateInterface
  ui: UiStateInterface
  playlists: PlaylistsStateInterface
}