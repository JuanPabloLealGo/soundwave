import { IoIosArrowDown } from "react-icons/io"

import ProgressBar from "../ProgressBar"
import PlayerControls from "../PlayerControls"
import PlayerInterface from "../../interfaces/PlayerInterface"
import { getArtists } from "../../utils"

import styles from "./MobilePlayerControls.module.scss"

interface Props {
  track: null | PlayerInterface
  isPlaying: boolean
  onHide: () => void
  onChangeState: () => void
}

const MobilePlayerControls = ({ track, isPlaying, onHide, onChangeState }: Props) => {

  if (!track?.item) {
    return <h1>Empty</h1>
  }

  return (
    <article className={`${styles.MobilePlayer} background-theme`}>
      <header className={styles.MobilePlayerHeader}>
        <IoIosArrowDown onClick={onHide} />
      </header>
      <div className={styles.MobilePlayerContainer}>
        <section className={styles.MobilePlayerTrackData}>
          <img alt='track-name' src={track.item.album.images[0].url} />
          <h4 className={styles.TrackName}>{track.item.name}</h4>
          <p className={styles.TrackArtists}>{getArtists(track?.item.artists)}</p>
        </section>
        <section className={styles.MobilePlayerProgressBar}>
          <ProgressBar
            durationInMs={track.item.duration_ms ?? 0}
            progressInMs={track.progress_ms ?? 0}
          />
        </section>
        <section>
          <PlayerControls
            isPlaying={isPlaying}
            onChangeState={onChangeState}
          />
        </section>
      </div>
    </article >
  )
}

export default MobilePlayerControls