import PlayListsPageInterface from "../PlayListsPageInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface PlayListsStateInterface extends CommonStateInterface {
  data: null | { [key: string]: PlayListsPageInterface }
}