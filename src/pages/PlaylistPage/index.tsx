import { useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../redux-store"
import { getPlaylist } from "../../redux-store/actions/playlistActions"
import { playlistSelector } from "../../redux-store/selectors"
import Tracklist from "../../components/Tracklist"
import styles from "./PlaylistPage.module.scss"
import { FaArrowLeft } from "react-icons/fa";

const PlaylistPage = () => {
  const dispatch = useAppDispatch()
  const { playlistId } = useParams()
  const { data, isLoading } = useAppSelector(playlistSelector)
  const imageStyle = {
    'backgroundImage': `url(${data?.images[0]?.url ?? ''})`
  }

  useEffect(() => {
    document.body.classList.add(styles.HideScroll);
    if (playlistId) {
      dispatch(getPlaylist(playlistId))
    }
    return () => { 
      document.body.classList.remove(styles.HideScroll);
    }
  }, [playlistId, dispatch])

  if (!playlistId) return null

  let description = <span>{data?.description}</span>

  if (isLoading) {
    description = (
      <>
        <div className={`skeleton ${styles.PlaylistSkeletonDescription}`} />
        <div className={`skeleton ${styles.PlaylistSkeletonDescription}`} />
      </>
    )
  }

  return (
    <div className='grid' >
      <NavLink className={styles.PlaylistBackButton} to='/'>
        <FaArrowLeft />
        <span>Home</span>
      </NavLink>
      <div className={styles.PlaylistInfo}>
        <div className={styles.PlaylistInfoContent}>
          <h1 className={isLoading ? `skeleton ${styles.PlaylistSkeletonTitle}` : styles.PlaylistTitle}>
            {data?.name}
          </h1>
          <div style={imageStyle} className={styles.PlaylistInfoContentImage} />
          <div className={styles.PlaylistDescription}>
            {description}
          </div>
        </div>
      </div>
      <div className={styles.PlaylistItems}>
        <Tracklist playlistId={playlistId} />
      </div>
    </div>
  )
}

export default PlaylistPage