import { LiaHeartSolid, LiaHeart } from "react-icons/lia"
import { PiShuffleSimpleFill } from "react-icons/pi"
import { TbRepeat } from "react-icons/tb"

import { convertMsToMinSec } from "../../utils"

import styles from "./ProgressBar.module.scss"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { removeLikedTrack, saveLikedTrack } from "../../redux-store/actions/trackActions"
import TrackItemInterface from "../../interfaces/TrackItemInterface"
import { trackSelector } from "../../redux-store/selectors"
import { useEffect, useState } from "react"

interface Props {
  progressInMs: number
  track: TrackItemInterface
}

const ProgressBar = ({ track, progressInMs }: Props) => {

  const dispatch = useAppDispatch()
  const { likedTracks } = useAppSelector(trackSelector)
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>([])

  const durationInMs = track.duration_ms
  const maxDuration = convertMsToMinSec(progressInMs)
  const progress = convertMsToMinSec(durationInMs)
  const progressPercentage = (progressInMs / durationInMs) * 100
  const isFavorite = likedTrackIds.includes(track.id)

  useEffect(() => {
    if (likedTracks.data) {
      const likedSongIds = likedTracks.data?.items.map((item) => item.track.id)
      setLikedTrackIds(likedSongIds)
    }
  }, [likedTracks])

  const saveTrackHandler = () => {

    if (!isFavorite) {
      dispatch(saveLikedTrack(track))
    } else {
      dispatch(removeLikedTrack(track.id))
    }
  }

  return (
    <article className={styles.ProgressBar}>
      <section className={styles.ProgressBarIndicator}>
        <div style={{ 'width': `${progressPercentage}%` }} className={styles.ProgressBarFiller} />
      </section>
      <section className={styles.ProgressBarTime}>
        <span>{`${maxDuration.minutes}:${maxDuration.seconds}`}</span>
        <span>{`${progress.minutes}:${progress.seconds}`}</span>
      </section>
      <section className={styles.ProgressBarActions}>
        {isFavorite
          ? <LiaHeartSolid className={styles.Selected} onClick={saveTrackHandler} />
          : <LiaHeart onClick={saveTrackHandler} />
        }
        <PiShuffleSimpleFill className={styles.Selected} />
        <TbRepeat />
      </section>
    </article>
  )
}

export default ProgressBar