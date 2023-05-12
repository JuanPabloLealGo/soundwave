import TrackItemInterface from "../../interfaces/TrackItemInterface"
import { convertMsToMinSec } from "../../utils"
import PopularityStars from "../PopularityStars"
import styles from "./TrackCard.module.scss"

interface Props {
  track: TrackItemInterface
  onTrackSelect: (track: TrackItemInterface) => void
}

const TrackCard = ({ track, onTrackSelect }: Props) => {

  const handleClick = () => onTrackSelect(track)
  const imageStyle = {
    'backgroundImage': `url(${track.album.images[0].url})`
  }

  const getArtists = () => track.artists.map((artist) => artist.name).join(', ')

  const duration = convertMsToMinSec(track.duration_ms)

  return (
    <div className={`applyHover ${styles.TrackCard}`} onClick={handleClick}>
      <div className={styles.TrackCardDescription}>
        <div style={imageStyle} className={styles.TrackCardDescriptionImage} />
        <div className={styles.TrackCardDescriptionText}>
          <span className={styles.TrackCardDescriptionTextName}>
            {track.name}
          </span>
          <span className={styles.TrackCardDescriptionTextArtists}>
            {getArtists()}
          </span>
        </div>
      </div>
      <div className={styles.TrackCardAlbum}>{track.album.name}</div>
      <div className={styles.TrackCardTime}>{`${duration.minutes}:${duration.seconds}`}</div>
      <div className={styles.TrackCardPopularity}>
        <PopularityStars value={track.popularity} />
      </div>
    </div>
  )
}

export default TrackCard