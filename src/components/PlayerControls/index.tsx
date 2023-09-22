import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsRewindCircleFill,
  BsFastForwardCircleFill,
} from "react-icons/bs"

import styles from "./PlayerControls.module.scss"
import { PlayerControlType } from "../../enums/PlayerControlType"

interface Props {
  isPlaying: boolean
  onChangeState: () => void
  onSkipTrack: (type: PlayerControlType) => void
}

const PlayerControls = ({ isPlaying, onChangeState, onSkipTrack }: Props) => {

  return (
    <article className={styles.PlayerControls}>
      {isPlaying ? (
        <BsFillPauseCircleFill className={styles.PlayerControlsPlay} onClick={onChangeState} />
      ) : (
        <BsFillPlayCircleFill className={styles.PlayerControlsPlay} onClick={onChangeState} />
      )}
      <BsRewindCircleFill
        className={`${styles.PlayerControlsNextPrevious} color-theme`}
        onClick={() => onSkipTrack(PlayerControlType.previous)}
      />
      <BsFastForwardCircleFill
        className={`${styles.PlayerControlsNextPrevious} color-theme`}
        onClick={() => onSkipTrack(PlayerControlType.next)}
      />
    </article>
  )
}

export default PlayerControls