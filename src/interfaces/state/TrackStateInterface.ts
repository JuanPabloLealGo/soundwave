import TrackPageInterface from "../TrackPageInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface TrackStateInterface extends CommonStateInterface {
  data: null | TrackPageInterface
}