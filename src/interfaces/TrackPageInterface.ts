import PaginatedListInterface from "./PaginatedListInterface";
import TrackInterface from "./TrackInterface";

export default interface TrackPageInterface extends PaginatedListInterface {
  items: TrackInterface[]
}