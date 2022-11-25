import { useNavigate } from "react-router-dom"
import PlaylistInterface from "../interfaces/PlaylistInterface"
import { capitalizeFirstLetter } from "../utils/methods"
import { BsPlayFill } from "react-icons/bs"
import styles from "./PlaylistCard.module.scss"

interface Props {
  playlist: PlaylistInterface
}

const PlaylistCard = ({ playlist }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => navigate(`/playlist/${playlist.id}`)

  const cardStyle = {
    'backgroundImage': `url(${playlist.images[0].url})`
  }

  return (
    <div className={styles.PlayListItem}>
      <div style={cardStyle} onClick={handleClick} className={`shadowed ${styles.PlaylistCard}`}>
        <div className={styles.PlaylistCardBlurredContainer}></div>
        <div className={styles.PlaylistCardDescription}>
          <div className={styles.PlaylistCardDescriptionTitle}>
            <span>{capitalizeFirstLetter(playlist.name)}</span>
          </div>
          <span className={styles.PlaylistCardDescriptionTracks}>
            {`${playlist.tracks.total} Tracks`}
          </span>
        </div>
      </div>
      <button onClick={() => console.log('PLAY')} className={`shadowed ${styles.PlaylistCardButton}`}>
        <BsPlayFill className={styles.PlaylistCardButtonIcon} />
      </button>
    </div>

  )
}

export default PlaylistCard