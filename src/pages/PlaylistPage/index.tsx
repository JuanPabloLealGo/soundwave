import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../redux-store"
import { getTrackPage } from "../../redux-store/actions/trackActions"
import { getPlaylist } from "../../redux-store/actions/playlistActions"
import { playlistSelector, trackSelector } from "../../redux-store/selectors"
import Player from "../../components/Player"
import Spinner from "../../components/Spinner"
import Tracklist from "../../components/Tracklist"
import styles from "./PlaylistPage.module.scss"

const PlaylistPage = () => {
  const { playlistId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data: trackData, isLoading } = useAppSelector(trackSelector)
  const { data: playlistData } = useAppSelector(playlistSelector)

  useEffect(() => {
    if (playlistId) {
      dispatch(getPlaylist(playlistId))
      dispatch(getTrackPage({ playlistId, limit: 20, offset: 0 }))
    }
  }, [playlistId, dispatch])

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <>
      {isLoading
        ? <Spinner />
        : trackData && (
          <div className='grid' >
            <button onClick={handleGoBack}>Back</button>
            <div className={styles.PlaylistPlayer}>
              <div className={styles.PlaylistPlayerContent}>
                <p className={styles.PlaylistTitle}>{playlistData?.name}</p>
                <Player urlImage={playlistData?.images[0].url} />
                <p className={styles.PlaylistDescription}>{playlistData?.description}</p>
              </div>
            </div>
            <div className={styles.PlaylistItems}>
              <Tracklist tracks={trackData.items} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default PlaylistPage