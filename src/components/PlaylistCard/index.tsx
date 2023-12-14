import { useNavigate } from "react-router-dom"
import { capitalizeFirstLetter } from "../../utils"
import PlaylistInterface from "../../interfaces/PlaylistInterface"

import styles from "./PlaylistCard.module.scss"

interface Props {
  playlist?: PlaylistInterface | null
}

const PlaylistCard = ({ playlist }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => playlist && navigate(`/playlist/${playlist.id}`)

  const cardStyle = {
    'backgroundImage': `url(${playlist ? playlist.images[0]?.url : '/assets/images/error_file.png'})`
  }

  return (
    <article className={styles.PlayListItem}>
      <div style={cardStyle} className={`shadowed ${styles.PlaylistCard}`} onClick={handleClick}/*onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}*/>
        {playlist ? (
          <>
            <section className={styles.PlaylistCardBlurredContainer} />
            <section className={styles.PlaylistCardDescription}>
              <span className={styles.PlaylistCardDescriptionTitle}>
                {capitalizeFirstLetter(playlist.name)}
              </span>
              <span className={styles.PlaylistCardDescriptionTracks}>
                {`${playlist.tracks.total} Tracks`}
              </span>
            </section>
          </>
        ) : (
          <section className={styles.PlaylistCardError}>
            <p>Oops..!</p>
            <p>Something went wrong...</p>
          </section>
        )}
      </div>
    </article>
  )
}

export default PlaylistCard