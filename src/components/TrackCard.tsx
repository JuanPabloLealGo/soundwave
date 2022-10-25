import TrackItemInterface from "../interfaces/TrackItemInterface"
import styles from "./TrackCard.module.scss"

interface Props {
  track: TrackItemInterface
  onTrackSelect: (track: TrackItemInterface) => void
}

const TrackCard = ({ track, onTrackSelect }: Props) => {

  const handleClick = () => onTrackSelect(track)

  return (
    <div className={styles.TrackCard} onClick={handleClick}>
      <span className={styles.TrackCardName}>{track.name}</span>
      <div className={styles.TrackCardArtists}>
        {track.artists.map((artist) => {
          return (
            <div>{artist.name}</div>
          )
        })}
      </div>

    </div>
  )
}

export default TrackCard