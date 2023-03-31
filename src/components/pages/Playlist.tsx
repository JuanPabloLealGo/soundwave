import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { RootState, useAppDispatch, useAppSelector } from "../../redux-store"
import { getTracksPage } from "../../redux-store/actions/tracksActions"
import Player from "../common/Player"
import Spinner from "../common/Spinner"
import Tracklist from "../Tracklist"
import styles from "./Playlist.module.scss"

const Playlist = () => {
  const { playlistId, categoryId } = useParams()
  const didMountRef = useRef(true)
  const dispatch = useAppDispatch()
  const { data: TrackData, isLoading } = useAppSelector((state: RootState) => state.tracks)

  const { data: playlistdata } = useAppSelector((state: RootState) => state.playlists)

  //const description = playlistdata && categoryId && playlistdata[categoryId].

  //const playlists = playlistdata && playlistdata[categoryId] ? playlistdata[categoryId].items : []


  console.log('playlistdata: ', playlistdata ? playlistdata[categoryId ?? ''] : {})

  useEffect(() => {

    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (playlistId) {
      dispatch(getTracksPage({ playlistId, limit: 20, offset: 0 }))
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
                </div>
              </div>
              <Tracklist tracks={TrackData.items} />
            </div>
          )
      }
    </div>
  )
}

export default Playlist