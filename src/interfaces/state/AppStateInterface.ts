import AuthStateInterface from "./AuthStateInterface";
import CategoryListStateInterface from "./CategoryListSatateInterface";

export default interface AppStateInterface {
  auth: AuthStateInterface
  category: CategoryListStateInterface
}