import CategoryItemInterface from "./CategoryItemIterface"
import PaginatedListInterface from "./PaginatedListInterface"

export default interface CategoryInterface extends PaginatedListInterface {
  items: Array<CategoryItemInterface>
} 