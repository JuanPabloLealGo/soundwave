import CategoryPageInterface from "../CategoryPageInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface CategoryListStateInterface extends CommonStateInterface {
  data: null | CategoryPageInterface
}