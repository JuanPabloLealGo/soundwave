import TracksPageInterface from "../TracksPageInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface TracksStateInterface extends CommonStateInterface {
  data: null | TracksPageInterface
}