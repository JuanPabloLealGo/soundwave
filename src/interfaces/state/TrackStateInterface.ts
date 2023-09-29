import SavedTrackPageDataInterface from "../SavedTrackPageDataInterface";
import TrackPageDataInterface from "../TrackPageDataInterface";
import CommonStateInterface from "./CommonStateInterface";

export default interface TrackStateInterface extends CommonStateInterface {
  trackPageByPlaylist: TrackPageDataInterface
  likedTracks: SavedTrackPageDataInterface
}