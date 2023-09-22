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
import { changePlayerState, getCurrentTrack, skipCurrentTrack } from "../../redux-store/actions/playerActions"
import { PlayerControlType } from "../../enums/PlayerControlType"

import styles from "./Player.module.scss"

interface Props {
  onShowSpotifyMessage: (showMessage: boolean) => void
}

const Player = ({ onShowSpotifyMessage }: Props) => {

  const dispatch = useAppDispatch()
  const { data: isAuthenticated } = useAppSelector(authSelector)
  const { currentTrack, currentUri, playerState } = useAppSelector(playerSelector)
  const isPlaying = currentTrack.data && currentUri
  const [showMobilePlayer, setShowMobilePlayer] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const updateCurrentTrack = useCallback(() =>
    dispatch(getCurrentTrack()), [dispatch]
  )

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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isAuthenticated && isPlaying) {
      updateCurrentTrack()
      interval = setInterval(() => updateCurrentTrack(), 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAuthenticated, isPlaying, updateCurrentTrack])

  useEffect(() => {
    onShowSpotifyMessage((isAuthenticated && currentUri && !currentTrack.data) || false)
  }, [isAuthenticated, currentUri, currentTrack, onShowSpotifyMessage])

  const resizeHandler = () => {
    setScreenWidth(window.innerWidth);
  };

  const playerClickHandler = () => setShowMobilePlayer(true)

  const changePlayerStateHandler = () => {
    const state = playerState.data ? PlayerControlType.pause : PlayerControlType.play

    if (currentTrack.data && currentTrack.data.item && currentUri)
      dispatch(changePlayerState({
        type: state,
        uri: currentUri,
        position: currentUri.indexOf(currentTrack.data.item.uri),
        progress: currentTrack.data?.progress_ms
      })).then(() => dispatch(getCurrentTrack()))
  }

  const skipTrackHandler = (type: PlayerControlType) => {
    dispatch(skipCurrentTrack(type)).then(() => dispatch(getCurrentTrack()))
  }

  if (!isAuthenticated || !currentTrack.data || !currentUri) {
    return null
  }

  return (
    <>
      {isMobile && showMobilePlayer ? (
        <Popup>
          <MobilePlayerControls
            onHide={() => setShowMobilePlayer(false)}
            track={currentTrack.data}
            isPlaying={playerState.data}
            onChangeState={changePlayerStateHandler}
            onSkipTrack={skipTrackHandler}
          />
        </Popup>
      ) : (
        <article className={`${styles.PlayerContainer} background-theme`}>
          <div className={styles.Player}>
            <div className={styles.PlayerData} onClick={isMobile ? playerClickHandler : () => { }}>
              <section className={styles.PlayerDataTrackInfoSection} >
                {currentTrack.data?.item && (
                  <CurrentTrack track={currentTrack.data.item} />
                )}
              </section>
              <section className={styles.PlayerDataProgressBarSection}>
                <ProgressBar
                  durationInMs={currentTrack.data?.item?.duration_ms ?? 0}
                  progressInMs={currentTrack.data?.progress_ms ?? 0}
                />
              </section>
              <section className={styles.PlayerDataControlsSection}>
                <PlayerControls
                  isPlaying={playerState.data}
                  onChangeState={changePlayerStateHandler}
                  onSkipTrack={skipTrackHandler}
                />
              </section>
            </div>
            <button className={`${styles.SimpleControl} color-theme`} onClick={changePlayerStateHandler}>
              {playerState.data ? <PiPauseFill /> : <PiPlayFill />}
            </button>
          </div>
          <IoIosArrowUp className={styles.ShowDetails} onClick={playerClickHandler} />
        </article>
      )}
    </>
  )
}

export default Player