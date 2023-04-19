import { useNavigate } from "react-router-dom"
import { capitalizeFirstLetter } from "../../utils/methods"
import { BsPlayFill } from "react-icons/bs"
import styles from "./PlaylistCard.module.scss"
import { useAppDispatch } from "../../redux-store"
import { updateCurrentPlaylist } from "../../redux-store/reducers/playlistSlice"
import PlaylistInterface from "../../interfaces/PlayListInterface"

interface Props {
  categoryId: string
  playlist: PlaylistInterface
}

const PlaylistCard = ({ categoryId, playlist }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClick = () => navigate(`/playlist/${categoryId}/${playlist.id}`)
  const handlePlaylistSelect = () => dispatch(updateCurrentPlaylist(playlist.uri))

  const cardStyle = {
    'backgroundImage': `url(${playlist.images[0].url})`
  }

  return (
    <article className={styles.PlayListItem}>
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