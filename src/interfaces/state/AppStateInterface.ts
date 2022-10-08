import AuthStateInterface from "./AuthStateInterface";
import CategoryListStateInterface from "./CategoryListSatateInterface";
import UiStateInterface from "./UiStateInterface";

export default interface AppStateInterface {
  auth: AuthStateInterface
  category: CategoryListStateInterface
  ui: UiStateInterface
}