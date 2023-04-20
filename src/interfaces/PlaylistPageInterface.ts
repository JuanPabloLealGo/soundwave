import PaginatedListInterface from "./PaginatedListInterface"
import PlaylistInterface from "./PlayListInterface"

export default interface PlaylistsPageInterface extends PaginatedListInterface {
  items: PlaylistInterface[]
}