import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from "react-icons/bs"
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from "react-icons/tb"
import { BsRewindCircleFill, BsFastForwardCircleFill } from "react-icons/bs"

import styles from "./PlayerControls.module.scss"

interface Props {
  isPlaying: boolean
  onChangeState: () => void
}

const PlayerControls = ({ isPlaying, onChangeState }: Props) => {

  return (
    <article className={styles.PlayerControls}>
      {/*<div>
        <BsShuffle />
        </div>*/}
      {isPlaying ? (
        <BsFillPauseCircleFill className={styles.PlayerControlsPlay} onClick={onChangeState} />
      ) : (
        <BsFillPlayCircleFill className={styles.PlayerControlsPlay} onClick={onChangeState} />
      )}
      <BsRewindCircleFill className={`${styles.PlayerControlsNextPrevious} color-theme`} />
      <BsFastForwardCircleFill className={`${styles.PlayerControlsNextPrevious} color-theme`} />
    </article>
  )
}

export default PlayerControls