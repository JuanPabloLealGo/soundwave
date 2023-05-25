import TrackItemInterface from "../../interfaces/TrackItemInterface"
import TrackCard from "../TrackCard"
import { updateCurrentPlaylist } from "../../redux-store/reducers/playlistSlice"

import styles from "./Tracklist.module.scss"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { useEffect, useState } from "react"
import { trackSelector } from "../../redux-store/selectors"
import { getTrackPage } from "../../redux-store/actions/trackActions"
import { PaginationEnum } from "../../enums/PaginationEnum"

interface Props {
  playlistId: string
}

const Tracklist = ({ playlistId }: Props) => {

  const dispatch = useAppDispatch()
  const [currentOffset, setCurrentOffset] = useState(0)
  const { data, isLoading } = useAppSelector(trackSelector)
  const hasMoreData = data && data.next !== null

  useEffect(() => {
    dispatch(getTrackPage({
      limit: PaginationEnum.tracklistLimit,
      offset: currentOffset,
      playlistId
    }))
  }, [currentOffset, dispatch])

  const handleLoadMore = () => {
    if (hasMoreData) {
      setCurrentOffset(prev => prev + PaginationEnum.tracklistLimit)
    }
  }

  const handleTrackSelect = (track: TrackItemInterface) =>
    dispatch(updateCurrentPlaylist(track.uri))

  if (!data) return null

  return (
    <div>
      <div className={styles.TracklistHeader}>
        <span className={styles.TracklistHeaderTitle}>Track / Artist</span>
        <span className={styles.TracklistHeaderAlbum}>Album</span>
        <span className={styles.TracklistHeaderGeneralItem}>Time</span>
        <span className={styles.TracklistHeaderGeneralItem}>Popularity</span>
      </div>
      <div className={styles.TracklistBody}>
        {data.items.map((item) => {
          const { track } = item
          return (
            <TrackCard
              key={track.id}
              track={track}
              onTrackSelect={handleTrackSelect}
            />
          )
        })}
        {
          isLoading
            ? <span>Loading...</span>
            : hasMoreData && <button onClick={handleLoadMore}>Load More</button>
        }
      </div>
    </div>
  )
}

export default Tracklist