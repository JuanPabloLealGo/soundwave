import TrackItemInterface from "../../interfaces/TrackItemInterface"
import { getArtists } from "../../utils"

import styles from "./CurrentTrack.module.scss"

interface Props {
  track: TrackItemInterface
}

const CurrentTrack = ({ track }: Props) => {
  return (
    <section className={styles.CurrentTrack}>
      <img src={track.album.images[0].url} />
      <div className={styles.CurrentTrackInfo}>
        <p className={styles.CurrentTrackInfoTitle}>{track.name}</p>
        <p className={styles.CurrentTrackInfoArtists}>{getArtists(track.artists)}</p>
      </div>
    </section>
  )
}

export default CurrentTrack