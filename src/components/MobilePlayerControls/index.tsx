import { IoIosArrowDown } from "react-icons/io"

import ProgressBar from "../ProgressBar"
import PlayerControls from "../PlayerControls"
import PlayerInterface from "../../interfaces/PlayerInterface"
import { getArtists } from "../../utils"

import styles from "./MobilePlayerControls.module.scss"
import { PlayerControlType } from "../../enums/PlayerControlType"
import PlayerStatusDataInterface from "../../interfaces/PlayerStatusDataInterface"

interface Props {
  playerStatus: PlayerStatusDataInterface
  onHide: () => void
  onChangeState: () => void
  onSkipTrack: (type: PlayerControlType) => void
}

const MobilePlayerControls = ({
  playerStatus,
  onHide,
  onChangeState,
  onSkipTrack,
}: Props) => {

  const { item } = playerStatus

  if (!item) {
    return <h1>Empty</h1>
  }

  return (
    <article className={`${styles.MobilePlayer} background-theme`}>
      <header className={styles.MobilePlayerHeader}>
        <IoIosArrowDown onClick={onHide} />
      </header>
      <div className={styles.MobilePlayerContainer}>
        <section className={styles.MobilePlayerTrackData}>
          <img alt='track-name' src={item.album.images[0].url} />
          <h4 className={styles.TrackName}>{item.name}</h4>
          <p className={styles.TrackArtists}>{getArtists(item.artists)}</p>
        </section>
        <section className={styles.MobilePlayerProgressBar}>
          <ProgressBar
            track={item}
            progressInMs={playerStatus.progress_ms}
            suffleIsOn={playerStatus.shuffle_state}
            repeatState={playerStatus.repeat_state}
          />
        </section>
        <section>
          <PlayerControls
            isPlaying={playerStatus.is_playing}
            onChangeState={onChangeState}
            onSkipTrack={onSkipTrack}
          />
        </section>
      </div>
    </article >
  )
}

export default MobilePlayerControls