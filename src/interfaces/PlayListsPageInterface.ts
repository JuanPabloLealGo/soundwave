import PaginatedListInterface from "./PaginatedListInterface";
import PlayListInterface from "./PlayListInterface";

export default interface PlayListsPageInterface extends PaginatedListInterface {
  items: PlayListInterface[]
}