import { useNavigate } from "react-router-dom"
import { capitalizeFirstLetter } from "../../utils"
import { BsPlayFill } from "react-icons/bs"
import styles from "./PlaylistCard.module.scss"
import { useAppDispatch } from "../../redux-store"
import { updateCurrentPlaylist } from "../../redux-store/reducers/playlistSlice"
import PlaylistInterface from "../../interfaces/PlaylistInterface"

interface Props {
  playlist?: PlaylistInterface
}

const PlaylistCard = ({ playlist }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClick = () => playlist && navigate(`/playlist/${playlist.id}`)
  const handlePlaylistSelect = () => playlist && dispatch(updateCurrentPlaylist(playlist.uri))

  const skeletonText = <span className='skeleton skeleton_text' />

  const cardStyle = {
    'backgroundImage': `url(${playlist?.images[0].url})`
  }

  return (
    <article className={styles.PlayListItem}>
      <div style={cardStyle} onClick={handleClick} className={`shadowed ${styles.PlaylistCard}`}>
        <div className={styles.PlaylistCardBlurredContainer}></div>
        <div className={styles.PlaylistCardDescription}>
          {playlist ? (
            <span className={styles.PlaylistCardDescriptionTitle}>
              {capitalizeFirstLetter(playlist.name)}
            </span>
          ) : skeletonText}
          {playlist ? (
            <span className={styles.PlaylistCardDescriptionTracks}>
              {`${playlist.tracks.total} Tracks`}
            </span>
          ) : skeletonText}
        </div>
      </div>
      <button
        className={`shadowed ${styles.PlaylistCardButton} ${playlist ? null : 'skeleton'}`}
        onClick={handlePlaylistSelect}
      >
        <BsPlayFill className={styles.PlaylistCardButtonIcon} />
      </button>
    </article>
  )
}

export default PlaylistCard