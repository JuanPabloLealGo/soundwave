import TrackItemInterface from "../../interfaces/TrackItemInterface"
import TrackCard from "../TrackCard"

import styles from "./Tracklist.module.scss"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { useEffect, useState } from "react"
import { trackSelector } from "../../redux-store/selectors"
import { getTrackPage } from "../../redux-store/actions/trackActions"
import { PaginationEnum } from "../../enums/PaginationEnum"
import { PlayerStateEnum } from "../../enums/PlayerStateEnum"
import { changePlayerState, getCurrentTrack } from "../../redux-store/actions/playerActions"
import TrackInterface from "../../interfaces/TrackInterface"
import { updateCurrentUris } from "../../redux-store/reducers/playlistSlice"

interface Props {
  playlistId?: string
  playlistUri?: string
}

const Tracklist = ({ playlistId, playlistUri }: Props) => {

  const dispatch = useAppDispatch()
  const [currentOffset, setCurrentOffset] = useState(0)
  const { data, isLoading } = useAppSelector(trackSelector)
  const hasMoreData = data && data.next !== null

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
    if (playlistUri) {
      dispatch(updateCurrentUris({ uris: playlistUri, position }))
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
        {data.items.map((item, index) => {
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