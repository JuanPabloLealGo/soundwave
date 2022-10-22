import AuthStateInterface from "./AuthStateInterface";
import CategoryListStateInterface from "./CategoryListStateInterface";
import PlayListsStateInterface from "./PlayListsStateInterface";
import UiStateInterface from "./UiStateInterface";

export default interface AppStateInterface {
  auth: AuthStateInterface
  category: CategoryListStateInterface
  ui: UiStateInterface
  playLists: PlayListsStateInterface
}