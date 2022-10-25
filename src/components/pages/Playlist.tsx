import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { RootState, useAppDispatch, useAppSelector } from "../../redux-store"
import { getTracksPage } from "../../redux-store/actions/tracksActions"
import Spinner from "../common/Spinner"
import TrackList from "../TrackList"

const Playlist = () => {
  const { id } = useParams()
  const didMountRef = useRef(true)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useAppSelector((state: RootState) => state.tracks)

  useEffect(() => {

    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (id) {
      dispatch(getTracksPage({ playlistId: id, limit: 20, offset: 0 }))
    }

  }, [id, dispatch])

  return (
    <div>
      {
        isLoading
          ? <Spinner />
          : data && <TrackList tracks={data.items} />
      }
    </div>
  )
}

export default Playlist