import PaginatedListInterface from "./PaginatedListInterface"
import PlaylistInterface from "./PlaylistInterface"

export default interface PlaylistsPageInterface extends PaginatedListInterface {
  items: PlaylistInterface[]
}