import PaginatedListInterface from "./PaginatedListInterface";
import SavedTrackInterface from "./SavedTrackInterface";

export default interface SavedTrackPageInterface extends PaginatedListInterface {
  items: SavedTrackInterface[]
}