import PlayerInterface from "./PlayerInterface";
import CommonStateInterface from "./state/CommonStateInterface";

export default interface PlayerDataInterface extends CommonStateInterface {
  data: null | PlayerInterface
}