import { LiaHeartSolid, LiaHeart } from "react-icons/lia"
import { PiShuffleSimpleFill } from "react-icons/pi"
import { TbRepeat, TbRepeatOnce } from "react-icons/tb"

import { convertMsToMinSec } from "../../utils"

import styles from "./ProgressBar.module.scss"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { removeLikedTrack, saveLikedTrack } from "../../redux-store/actions/trackActions"
import TrackItemInterface from "../../interfaces/TrackItemInterface"
import { trackSelector } from "../../redux-store/selectors"
import { useEffect, useState } from "react"
import { changePlayerShuffle, changeRepeatMode } from "../../redux-store/actions/playerActions"
import { repeatOptions } from "../../utils/constants"

interface Props {
  progressInMs: number
  track: TrackItemInterface
  suffleIsOn: boolean
  repeatState: string
}

const ProgressBar = ({ track, progressInMs, suffleIsOn, repeatState }: Props) => {

  const dispatch = useAppDispatch()
  const { likedTracks } = useAppSelector(trackSelector)
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>([])

  const durationInMs = track?.duration_ms ?? 0
  const maxDuration = convertMsToMinSec(progressInMs)
  const progress = convertMsToMinSec(durationInMs)
  const progressPercentage = (progressInMs / durationInMs) * 100
  const isFavorite = track ? likedTrackIds.includes(track.id) : false
  const [currentIndex, setCurrentIndex] =
    useState<number>(repeatOptions.indexOf(repeatState))

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

  const changePlayerShuffleHandler = () => {
    dispatch(changePlayerShuffle(!suffleIsOn))
  }

  const getNextRepeatOption = () => {
    const index = (currentIndex + 1) % repeatOptions.length
    setCurrentIndex(index)
    return repeatOptions[index]
  }

  const changeRepeatStateHandler = () => {
    const nextOption = getNextRepeatOption()
    dispatch(changeRepeatMode(nextOption))
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
        <PiShuffleSimpleFill
          className={suffleIsOn ? styles.Selected : ''}
          onClick={changePlayerShuffleHandler}
        />
        {repeatState === repeatOptions[1]
          ? <TbRepeatOnce
            className={styles.Selected}
            onClick={changeRepeatStateHandler}
          />
          : <TbRepeat
            className={repeatState === repeatOptions[2] ? '' : styles.Selected}
            onClick={changeRepeatStateHandler}
          />
        }
      </section>
    </article>
  )
}

export default ProgressBar