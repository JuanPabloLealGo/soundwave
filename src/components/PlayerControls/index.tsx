import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsRewindCircleFill,
  BsFastForwardCircleFill,
} from "react-icons/bs"

import styles from "./PlayerControls.module.scss"

interface Props {
  isPlaying: boolean
  onChangeState: () => void
}

const PlayerControls = ({ isPlaying, onChangeState }: Props) => {

  return (
    <article className={styles.PlayerControls}>
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