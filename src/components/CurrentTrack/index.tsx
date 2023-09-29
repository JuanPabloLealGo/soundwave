import { getArtists } from "../../utils"
import TrackItemInterface from "../../interfaces/TrackItemInterface"

import styles from "./CurrentTrack.module.scss"

interface Props {
  track: TrackItemInterface
}

const CurrentTrack = ({ track }: Props) => {
  return (
    <article className={styles.CurrentTrack}>
      <img alt='track-name' src={track.album.images[0].url} />
      <div className={styles.CurrentTrackInfo}>
        <p className={`${styles.CurrentTrackInfoTitle} color-theme`}>{track.name}</p>
        <p className={styles.CurrentTrackInfoArtists}>{getArtists(track.artists)}</p>
      </div>
    </article>
  )
}

export default CurrentTrack