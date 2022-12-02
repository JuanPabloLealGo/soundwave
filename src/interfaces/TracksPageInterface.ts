import PaginatedListInterface from "./PaginatedListInterface";
import TrackInterface from "./TrackInterface";

export default interface TracksPageInterface extends PaginatedListInterface {
  items: TrackInterface[]
}