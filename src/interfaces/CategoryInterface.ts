import CategoryItemInterface from "./CategoryItemIterface"
import PaginatedListInterface from "./PaginatedListInterface"

export default interface CategoryPageInterface extends PaginatedListInterface {
  items: CategoryItemInterface[]
} 