import TrackItemInterface from "../../interfaces/TrackItemInterface"
import { useAppSelector } from "../../redux-store"
import { uiSelector } from "../../redux-store/selectors"
import { convertMsToMinSec, getArtists } from "../../utils"
import PopularityStars from "../PopularityStars"
import styles from "./TrackCard.module.scss"

interface Props {
  track: TrackItemInterface
  onTrackSelect: (position: number) => void
  position: number
}

const TrackCard = ({ track, onTrackSelect, position }: Props) => {
  const { isDarkTheme } = useAppSelector(uiSelector)
  const handleClick = () => onTrackSelect(position)
  const imageStyle = {
    'backgroundImage': `url(${track.album.images[0]?.url ?? ''})`
  }

  const duration = convertMsToMinSec(track.duration_ms)

  return (
    <article
      className={`
        ${styles.TrackCard} 
        ${isDarkTheme
          ? styles.TrackCardDark
          : styles.TrackCardLight
        } 
      `}
      onClick={handleClick}>
      <section className={styles.TrackCardDescription}>
        <div style={imageStyle} className={styles.TrackCardDescriptionImage} />
        <div className={styles.TrackCardDescriptionText}>
          <p className={styles.TrackCardDescriptionTextName}>
            {track.name}
          </p>
          <p className={styles.TrackCardDescriptionTextArtists}>
            {getArtists(track.artists)}
          </p>
        </div>
      </section>
      <section className={styles.TrackCardAlbum}>{track.album.name}</section>
      <section className={styles.TrackCardTime}>{`${duration.minutes}:${duration.seconds}`}</section>
      <section className={styles.TrackCardPopularity}>
        <PopularityStars value={track.popularity} />
      </section>
    </article>
  )
}

export default TrackCard