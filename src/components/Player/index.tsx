import styles from './Player.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux-store'
import { authSelector, playerSelector } from '../../redux-store/selectors'
import CurrentTrack from '../CurrentTrack'
import { changePlayerState, getCurrentTrack } from '../../redux-store/actions/playerActions'
import { useEffect, useState } from 'react'
import PlayerControls from '../PlayerControls'
import { PlayerStateEnum } from '../../enums/PlayerStateEnum'
import ProgressBar from '../ProgressBar'
import { PiPlayFill, PiPauseFill } from "react-icons/pi"
import MobilePlayerControls from '../MobilePlayerControls'
import { IoIosArrowUp } from "react-icons/io"
import Popup from '../Popup'


const Player = () => {

  const dispatch = useAppDispatch()

  const { data: isAuthenticated } = useAppSelector(authSelector)
  const { currentTrack, currentUris, playerState } = useAppSelector(playerSelector)
  const isPlaying = currentTrack.data && currentUris
  const [showMobilePlayer, setShowMobilePlayer] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

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
  }, [isAuthenticated, isPlaying])

  useEffect(() => {
    if (isAuthenticated && currentUris) {
      dispatch(changePlayerState({
        playerState: PlayerStateEnum.play,
        uri: currentUris.uris,
        position: currentUris.position,
      }))
        .then(() => updateCurrentTrack())
    }
  }, [dispatch, isAuthenticated, currentUris])

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handlePlayerClick = () => setShowMobilePlayer(true)

  const handleChangeState = () => {
    const state = playerState.data ? PlayerStateEnum.pause : PlayerStateEnum.play

    if (currentTrack.data && currentTrack.data.item && currentUris)
      dispatch(changePlayerState({
        playerState: state,
        uri: currentUris.uris,
        position: currentUris.position,
        progress: currentTrack.data?.progress_ms
      }))
  }

  const updateCurrentTrack = () => dispatch(getCurrentTrack())

  if (isAuthenticated && currentUris && !currentTrack.data) {
    return (
      <article className={styles.OpenSpotifyMessage}>
        <p>Please make sure you have spotify open, play any song for one sec and try play your track in our UI</p>
      </article>
    )
  }

  if (!isAuthenticated || !currentTrack.data || !currentUris) {
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
            <div className={`${styles.SimpleControl} color-theme`} onClick={handleChangeState}>
              {playerState.data ? <PiPauseFill /> : <PiPlayFill />}
            </div>
          </div>
          <IoIosArrowUp className={styles.ShowDetails} onClick={handlePlayerClick} />
        </article>
      )}
    </>
  )
}

export default Player