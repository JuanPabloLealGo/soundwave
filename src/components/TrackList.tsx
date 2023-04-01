import { useDispatch } from "react-redux"
import TrackInterface from "../interfaces/TrackInterface"
import TrackItemInterface from "../interfaces/TrackItemInterface"
import TrackCard from "./TrackCard"
import styles from "./Tracklist.module.scss"
import { updateCurrentPlaylist } from "../redux-store/reducers/playlistSlice"

interface Props {
  tracks: TrackInterface[],
}

const Tracklist = ({ tracks }: Props) => {
  const dispatch = useDispatch()

  const handleTrackSelect = (track: TrackItemInterface) =>
    dispatch(updateCurrentPlaylist(track.uri))

  return (
    <div className={styles.TracklistItems}>
      <span>Songs</span>
      {tracks.map((item) => {
        const { track } = item
        return (
          <TrackCard
            key={track.id}
            track={track}
            onTrackSelect={handleTrackSelect}
          />
        )
      })}
    </div>
  )
}

export default Tracklist