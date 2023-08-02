import { useNavigate } from "react-router-dom"
import { capitalizeFirstLetter } from "../../utils"
import { BsPlayFill } from "react-icons/bs"
import { useAppDispatch } from "../../redux-store"
import { updateCurrentPlaylist } from "../../redux-store/reducers/playlistSlice"
import PlaylistInterface from "../../interfaces/PlaylistInterface"

import styles from "./PlaylistCard.module.scss"

interface Props {
  playlist: PlaylistInterface
}

const PlaylistCard = ({ playlist }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClick = () => playlist && navigate(`/playlist/${playlist.id}`)
  const handlePlaylistSelect = () => playlist && dispatch(updateCurrentPlaylist(playlist.uri))

  const cardStyle = {
    'backgroundImage': `url(${playlist?.images[0]?.url})`
  }

  return (
    <article className={styles.PlayListItem}>
      <div style={cardStyle} onClick={handleClick} className={`shadowed ${styles.PlaylistCard}`}>
        <div className={styles.PlaylistCardBlurredContainer} />
        <div className={styles.PlaylistCardDescription}>
          <span className={styles.PlaylistCardDescriptionTitle}>
            {capitalizeFirstLetter(playlist.name)}
          </span>
          <span className={styles.PlaylistCardDescriptionTracks}>
            {`${playlist.tracks.total} Tracks`}
          </span>
        </div>
      </div>
      <button
        className={`shadowed ${styles.PlaylistCardButton}`}
        onClick={handlePlaylistSelect}
      >
        <BsPlayFill className={styles.PlaylistCardButtonIcon} />
      </button>
    </article>
  )
}

export default PlaylistCard