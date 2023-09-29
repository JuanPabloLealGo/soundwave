import PlayerStatusDataInterface from "./PlayerStatusDataInterface";
import CommonStateInterface from "./state/CommonStateInterface";

export default interface PlayerStatusInterface extends CommonStateInterface {
  data: null | PlayerStatusDataInterface,
}