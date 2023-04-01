import PaginatedListInterface from "./PaginatedListInterface"
import PlaylistInterface from "./PlayListInterface"

export default interface PlaylistPageInterface extends PaginatedListInterface {
  items: PlaylistInterface[]
}