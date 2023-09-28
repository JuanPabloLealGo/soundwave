import TrackPageInterface from "./TrackPageInterface";
import CommonStateInterface from "./state/CommonStateInterface";

export default interface TrackPageByPlaylistInterface extends CommonStateInterface {
    data: null | TrackPageInterface
} 