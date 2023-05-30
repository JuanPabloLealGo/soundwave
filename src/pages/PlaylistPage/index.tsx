import { useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../redux-store"
import { getPlaylist } from "../../redux-store/actions/playlistActions"
import { playlistSelector } from "../../redux-store/selectors"
import Player from "../../components/Player"
import Tracklist from "../../components/Tracklist"
import styles from "./PlaylistPage.module.scss"
import { IoIosArrowBack } from 'react-icons/io'

const PlaylistPage = () => {
  const dispatch = useAppDispatch()
  const { playlistId } = useParams()
  const { data, isLoading } = useAppSelector(playlistSelector)

  useEffect(() => {
    if (playlistId) {
      dispatch(getPlaylist(playlistId))
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
        <IoIosArrowBack />
        <span>Home</span>
      </NavLink>
      <div className={styles.PlaylistPlayer}>
        <div className={styles.PlaylistPlayerContent}>
          <p className={isLoading ? `skeleton ${styles.PlaylistSkeletonTitle}` : styles.PlaylistTitle}>
            {data?.name}
          </p>
          <Player isLoading urlImage={data?.images[0].url} />
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