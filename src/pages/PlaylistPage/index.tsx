import { useEffect } from "react"
import { useParams } from "react-router-dom"

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
  const { data: trackData, isLoading } = useAppSelector(trackSelector)
  const { data: playlistData } = useAppSelector(playlistSelector)

  useEffect(() => {
    if (playlistId) {
      dispatch(getPlaylist(playlistId))
      dispatch(getTrackPage({ playlistId, limit: 20, offset: 0 }))
    }
  }, [playlistId, dispatch])

  return (
    <div>
      {
        isLoading
          ? <Spinner />
          : trackData && (
            <div className={`grid ${styles.Playlist}`} >
              <div className={styles.PlaylistPlayer}>
                <div className={styles.PlaylistPlayerContent}>
                  Player with image
                  <Player showPicture />
                  <div>{playlistData?.name}</div>
                  <div>{playlistData?.description}</div>
                </div>
              </div>
              <Tracklist tracks={trackData.items} />
            </div>
          )
      }
    </div>
  )
}

export default PlaylistPage