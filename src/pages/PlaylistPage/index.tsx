import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../redux-store"
import { getPlaylist } from "../../redux-store/actions/playlistActions"
import { playlistSelector } from "../../redux-store/selectors"
import Player from "../../components/Player"
import Spinner from "../../components/Spinner"
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

  return (
    <>
      {isLoading
        ? <Spinner />
        : (
          <div className='grid' >
            <a className={styles.PlaylistBackButton} href='/'>
              <IoIosArrowBack />
              <span>Home</span>
            </a>
            <div className={styles.PlaylistPlayer}>
              <div className={styles.PlaylistPlayerContent}>
                <p className={styles.PlaylistTitle}>{data?.name}</p>
                <Player urlImage={data?.images[0].url} />
                <p className={styles.PlaylistDescription}>{data?.description}</p>
              </div>
            </div>
            <div className={styles.PlaylistItems}>
              <Tracklist playlistId={playlistId} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default PlaylistPage