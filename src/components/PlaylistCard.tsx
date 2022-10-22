import PlaylistInterface from "../interfaces/PlaylistInterface"
import styles from "./PlaylistCard.module.scss"

interface Props {
  playlist: PlaylistInterface
}

const PlaylistCard = ({ playlist }: Props) => {
  return (
    <div className={styles.PlaylistCard}>
      <span className={styles.PlaylistCardName}>
        {playlist?.name.toLowerCase()}
      </span>
      <div className={styles.PlaylistCardDescription}>
        {playlist.description}
      </div>
    </div>
  )
}

export default PlaylistCard