import { useCallback, useEffect, useState } from "react"
import { PiPlayFill, PiPauseFill } from "react-icons/pi"
import { IoIosArrowUp } from "react-icons/io"

import CurrentTrack from "../CurrentTrack"
import MobilePlayerControls from "../MobilePlayerControls"
import PlayerControls from "../PlayerControls"
import Popup from "../Popup"
import ProgressBar from "../ProgressBar"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { authSelector, playerSelector } from "../../redux-store/selectors"
import { changePlayerState, getPlayerState, skipCurrentTrack } from "../../redux-store/actions/playerActions"
import { PlayerControlType } from "../../enums/PlayerControlType"

import styles from "./Player.module.scss"

interface Props {
  onShowSpotifyMessage: (showMessage: boolean) => void
}

const Player = ({ onShowSpotifyMessage }: Props) => {
  const dispatch = useAppDispatch()
  const { data: isAuthenticated } = useAppSelector(authSelector)
  const { currentUri, playerStatus } = useAppSelector(playerSelector)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [showMobilePlayer, setShowMobilePlayer] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState(false)
  const canPlay = playerStatus.data && currentUri

  useEffect(() => {
    onShowSpotifyMessage(!canPlay)
  }, [canPlay, onShowSpotifyMessage])

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    };
  }, [])

  useEffect(() => {
    const mobileBreakpoint = 768
    setIsMobile(screenWidth <= mobileBreakpoint)
  }, [screenWidth])

  const updatePlayerStatus = useCallback(() => {
    dispatch(getPlayerState())
  }, [dispatch])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isAuthenticated && canPlay) {
      updatePlayerStatus()
      interval = setInterval(() => updatePlayerStatus(), 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isAuthenticated, canPlay, updatePlayerStatus])

  const resizeHandler = () => {
    setScreenWidth(window.innerWidth);
  };

  const playerClickHandler = () => setShowMobilePlayer(true)

  const changePlayerStateHandler = () => {
    const state = playerStatus.data?.is_playing ? PlayerControlType.pause : PlayerControlType.play

    if (playerStatus.data && playerStatus.data.item && currentUri)
      dispatch(changePlayerState({
        type: state,
        uri: currentUri,
        position: currentUri.indexOf(playerStatus.data.item.uri),
        progress: playerStatus.data?.progress_ms
      })).then(() => updatePlayerStatus())
  }

  const skipTrackHandler = (type: PlayerControlType) => {
    dispatch(skipCurrentTrack(type)).then(() => updatePlayerStatus())
  }

  if (!canPlay) {
    return null
  }

  return (
    <>
      {isMobile && showMobilePlayer ? (
        <Popup>
          <MobilePlayerControls
            playerStatus={playerStatus.data!}
            onHide={() => setShowMobilePlayer(false)}
            onChangeState={changePlayerStateHandler}
            onSkipTrack={skipTrackHandler}
          />
        </Popup>
      ) : (
        <article className={`${styles.PlayerContainer} background-theme`}>
          <div className={styles.Player}>
            <div className={styles.PlayerData} onClick={isMobile ? playerClickHandler : () => { }}>
              <section className={styles.PlayerDataTrackInfoSection} >
                {playerStatus.data?.item && (
                  <CurrentTrack track={playerStatus.data.item} />
                )}
              </section>
              <section className={styles.PlayerDataProgressBarSection}>
                <ProgressBar
                  track={playerStatus.data!.item}
                  progressInMs={playerStatus.data!.progress_ms}
                  suffleIsOn={playerStatus.data!.shuffle_state}
                  repeatState={playerStatus.data!.repeat_state}
                />
              </section>
              <section className={styles.PlayerDataControlsSection}>
                <PlayerControls
                  isPlaying={playerStatus.data?.is_playing || false}
                  onChangeState={changePlayerStateHandler}
                  onSkipTrack={skipTrackHandler}
                />
              </section>
            </div>
            <button className={`${styles.SimpleControl} color-theme`} onClick={changePlayerStateHandler}>
              {playerStatus.data ? <PiPauseFill /> : <PiPlayFill />}
            </button>
          </div>
          <IoIosArrowUp className={styles.ShowDetails} onClick={playerClickHandler} />
        </article>
      )}
    </>
  )
}

export default Player