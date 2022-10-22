import CategoryPageInterface from "../CategoryInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface CategoryListStateInterface extends CommonStateInterface {
  data: null | CategoryPageInterface
}