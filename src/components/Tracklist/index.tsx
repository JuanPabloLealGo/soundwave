import TrackCard from "../TrackCard"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { useEffect, useState } from "react"
import { trackSelector } from "../../redux-store/selectors"
import { getLikedTracks, getTrackPage } from "../../redux-store/actions/trackActions"
import { PaginationEnum } from "../../enums/PaginationEnum"

import styles from "./Tracklist.module.scss"
import { updateCurrentUri } from "../../redux-store/reducers/playerSlice"
import { changePlayerState, getPlayerState } from "../../redux-store/actions/playerActions"
import { PlayerControlType } from "../../enums/PlayerControlType"
import TrackInterface from "../../interfaces/TrackInterface"

interface Props {
  playlistId?: string
}

const Tracklist = ({ playlistId }: Props) => {

  const dispatch = useAppDispatch()
  const [currentOffset, setCurrentOffset] = useState(0)
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>([])
  const { trackPageByPlaylist, likedTracks } = useAppSelector(trackSelector)
  const { data, isLoading } = trackPageByPlaylist
  const hasMoreData = data && data.next !== null

  useEffect(() => {
    dispatch(getLikedTracks({ limit: 50, offset: 0 }))
  }, [dispatch])

  useEffect(() => {
    const hasMorePages = likedTracks.data?.offset && likedTracks.data.offset > 0
    if (hasMorePages) {
      dispatch(getLikedTracks({ limit: 50, offset: likedTracks.data!.offset! }))
    }
    const likedSongIds = likedTracks.data?.items.map((item) => item.track.id) ?? []
    setLikedTrackIds(likedSongIds)
  }, [likedTracks])

  useEffect(() => {
    if (playlistId) {
      dispatch(getTrackPage({
        limit: PaginationEnum.tracklistLimit,
        offset: currentOffset,
        playlistId
      }))
    }
  }, [currentOffset, dispatch, playlistId])

  const handleLoadMore = () => {
    if (hasMoreData) {
      setCurrentOffset(prev => prev + PaginationEnum.tracklistLimit)
    }
  }

  const handleTrackSelect = (position: number) => {
    if (data?.items) {
      const uris = data.items.map((item: TrackInterface) => item.track.uri)
      dispatch(updateCurrentUri(uris))

      dispatch(changePlayerState({
        type: PlayerControlType.play,
        uri: uris,
        position: position,
        progress: 0,
      })).then(() => dispatch(getPlayerState()))
    }
  }

  if (!data?.items) return null

  return (
    <article>
      <header className={styles.TracklistHeader}>
        <p className={styles.TracklistHeaderTitle}>Track / Artist</p>
        <p className={styles.TracklistHeaderAlbum}>Album</p>
        <p className={styles.TracklistHeaderGeneralItem}>Time</p>
        <p className={styles.TracklistHeaderGeneralItem}>Popularity</p>
      </header>
      <div className={styles.TracklistBody}>
        {data.items.map((item: TrackInterface, index: number) => {
          const { track } = item

          if (!track) return null

          return (
            <TrackCard
              key={track.id}
              position={index}
              track={track}
              onTrackSelect={handleTrackSelect}
            />
          )
        })}
        {
          isLoading
            ? <p>Loading...</p>
            : hasMoreData && <button onClick={handleLoadMore}>Load More</button>
        }
      </div>
    </article>
  )
}

export default Tracklist