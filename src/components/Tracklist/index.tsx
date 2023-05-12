import { useDispatch } from "react-redux"
import TrackInterface from "../../interfaces/TrackInterface"
import TrackItemInterface from "../../interfaces/TrackItemInterface"
import TrackCard from "../TrackCard"
import { updateCurrentPlaylist } from "../../redux-store/reducers/playlistSlice"

import styles from "./Tracklist.module.scss"

interface Props {
  tracks: TrackInterface[],
}

const Tracklist = ({ tracks }: Props) => {
  const dispatch = useDispatch()

  const handleTrackSelect = (track: TrackItemInterface) =>
    dispatch(updateCurrentPlaylist(track.uri))

  return (
    <>
      <div className={styles.TracklistHeader}>
        <span className={styles.TracklistHeaderTitle}>Track / Artist</span>
        <span className={styles.TracklistHeaderAlbum}>Album</span>
        <span className={styles.TracklistHeaderGeneralItem}>Time</span>
        <span className={styles.TracklistHeaderGeneralItem}>Popularity</span>
      </div>
      <div className={styles.TracklistBody}>
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
    </>
  )
}

export default Tracklist