import TrackItemInterface from "../../interfaces/TrackItemInterface"
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

  return (
    <div className={styles.TrackCard} onClick={handleClick}>
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
      <div className={styles.TrackCardStars}>points</div>
      <div className={styles.TrackCardTime}>duration</div>
      <div className={styles.TrackCardFavorite}>favorite</div>
    </div>
  )
}

export default TrackCard