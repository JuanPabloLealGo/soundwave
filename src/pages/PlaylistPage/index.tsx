import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { RootState, useAppDispatch, useAppSelector } from "../../redux-store"
import { getTrackPage } from "../../redux-store/actions/trackActions"
import Player from "../../components/Player"
import Spinner from "../../components/Spinner"
import Tracklist from "../../components/Tracklist"
import { playlistSelector, trackSelector } from "../../redux-store/selectors"
import styles from "./PlaylistPage.module.scss"
import { useSelector } from "react-redux"
import { getPlaylistById } from "../../redux-store/reducers/playlistSlice"

const PlaylistPage = () => {
  const { playlistId, categoryId } = useParams()
  const didMountRef = useRef(true)
  const dispatch = useAppDispatch()
  const { data: TrackData, isLoading } = useAppSelector(trackSelector)

  const { data: playlistdata } = useAppSelector(playlistSelector)

  const item = useSelector((state: RootState) =>
    getPlaylistById(state.playlist, categoryId, playlistId))

  console.log('description: ', item?.description);

  console.log('playlistdata: ', playlistdata ? playlistdata[categoryId ?? ''] : {})

  useEffect(() => {

    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (playlistId) {
      dispatch(getTrackPage({ playlistId, limit: 20, offset: 0 }))
    }

  }, [playlistId, dispatch])

  return (
    <div>
      {
        isLoading
          ? <Spinner />
          : TrackData && (
            <div className={`grid ${styles.Playlist}`} >
              <div className={styles.PlaylistPlayer}>
                <div className={styles.PlaylistPlayerContent}>
                  Player with image
                  <Player showPicture />
                  <div>{item?.name}</div>
                  <div>{item?.description}</div>
                </div>
              </div>
              <Tracklist tracks={TrackData.items} />
            </div>
          )
      }
    </div>
  )
}

export default PlaylistPage