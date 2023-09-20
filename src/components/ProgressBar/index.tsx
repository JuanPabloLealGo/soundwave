import { convertMsToMinSec } from "../../utils"
import { BsFillSuitHeartFill } from "react-icons/bs"
import { PiShuffleSimpleFill } from "react-icons/pi"
import { TbRepeat } from "react-icons/tb"

import styles from "./ProgressBar.module.scss"

interface Props {
  durationInMs: number
  progressInMs: number
}

const ProgressBar = ({ durationInMs, progressInMs }: Props) => {

  const maxDuration = convertMsToMinSec(progressInMs)
  const progress = convertMsToMinSec(durationInMs)
  const progressPercentage = (progressInMs / durationInMs) * 100

  return (
    <article className={styles.ProgressBar}>
      <div className={styles.ProgressBarIndicator}>
        <div style={{ 'width': `${progressPercentage}%` }} className={styles.ProgressBarFiller} />
      </div>
      <div className={styles.ProgressBarTime}>
        <span>{`${maxDuration.minutes}:${maxDuration.seconds}`}</span>
        <span>{`${progress.minutes}:${progress.seconds}`}</span>
      </div>
      <div className={styles.ProgressBarActions}>
        <BsFillSuitHeartFill />
        <PiShuffleSimpleFill className={styles.Selected} />
        <TbRepeat />
      </div>
    </article>
  )
}

export default ProgressBar