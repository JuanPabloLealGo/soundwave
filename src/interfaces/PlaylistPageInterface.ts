import PaginatedListInterface from "./PaginatedListInterface"
import PlaylistInterface from "./PlaylistInterface"

export default interface PlaylistPageInterface extends PaginatedListInterface {
  items: PlaylistInterface[]
}