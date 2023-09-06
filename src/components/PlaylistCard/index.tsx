import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { capitalizeFirstLetter } from "../../utils"
import { BsPlayFill } from "react-icons/bs"
import { MdReadMore } from "react-icons/md"
import { useAppDispatch } from "../../redux-store"
import { updateCurrentPlaylist } from "../../redux-store/reducers/playlistSlice"
import PlaylistInterface from "../../interfaces/PlaylistInterface"

import styles from "./PlaylistCard.module.scss"

interface Props {
  playlist?: PlaylistInterface | null
}

const PlaylistCard = ({ playlist }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  //const [isHovering, setIsHovering] = useState(false)

  const handleClick = () => playlist && navigate(`/playlist/${playlist.id}`)
  //const handlePlaylistSelect = () => playlist && dispatch(updateCurrentPlaylist(playlist.uri))

  const cardStyle = {
    'backgroundImage': `url(${playlist ? playlist.images[0]?.url : '/images/error_file.png'})`
  }

  //const handleMouseOver = () => setIsHovering(true);
  //const handleMouseOut = () => setIsHovering(false);

  return (
    <article className={styles.PlayListItem}>
      <div style={cardStyle} className={`shadowed ${styles.PlaylistCard}`} onClick={handleClick}/*onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}*/>
        {playlist ? (
          <>
            <div className={styles.PlaylistCardBlurredContainer} />
            <div className={styles.PlaylistCardDescription}>
              <span className={styles.PlaylistCardDescriptionTitle}>
                {capitalizeFirstLetter(playlist.name)}
              </span>
              <span className={styles.PlaylistCardDescriptionTracks}>
                {`${playlist.tracks.total} Tracks`}
              </span>
            </div>
            {/*isHovering && (
              <div className={styles.PlaylistCardActions}>
                <button
                  className={styles.PlaylistCardButton}
                  onClick={handlePlaylistSelect}
                >
                  <BsPlayFill />
                </button>
                <button
                  className={styles.PlaylistCardButton}
                  onClick={handleClick}
                >
                  <MdReadMore />
                </button>
              </div>
            )*/}
          </>
        ) : (
          <div className={styles.PlaylistCardError}>
            <p>Oops..!</p>
            <p>Something went wrong...</p>
          </div>
        )}
      </div>
    </article>
  )
}

export default PlaylistCard