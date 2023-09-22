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
import { changePlayerState, getCurrentTrack } from "../../redux-store/actions/playerActions"
import { PlayerStateEnum } from "../../enums/PlayerStateEnum"

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
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
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

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handlePlayerClick = () => setShowMobilePlayer(true)

  const handleChangeState = () => {
    const state = playerState.data ? PlayerStateEnum.pause : PlayerStateEnum.play

    if (currentTrack.data && currentTrack.data.item && currentUri)
      dispatch(changePlayerState({
        playerState: state,
        uri: currentUri,
        position: currentUri.indexOf(currentTrack.data.item.uri),
        progress: currentTrack.data?.progress_ms
      }))
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
            onChangeState={handleChangeState}
          />
        </Popup>
      ) : (
        <article className={`${styles.PlayerContainer} background-theme`}>
          <div className={styles.Player}>
            <div className={styles.PlayerData} onClick={isMobile ? handlePlayerClick : () => { }}>
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
                  onChangeState={handleChangeState}
                />
              </section>
            </div>
            <button className={`${styles.SimpleControl} color-theme`} onClick={handleChangeState}>
              {playerState.data ? <PiPauseFill /> : <PiPlayFill />}
            </button>
          </div>
          <IoIosArrowUp className={styles.ShowDetails} onClick={handlePlayerClick} />
        </article>
      )}
    </>
  )
}

export default Player