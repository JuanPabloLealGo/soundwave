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

const Player = () => {

  const dispatch = useAppDispatch()

  const { data: isAuthenticated } = useAppSelector(authSelector)
  const { currentTrack, currentUris, playerState } = useAppSelector(playerSelector)
  const isPlaying = currentTrack.data && currentUris
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobileBreakpoint = 768;
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= mobileBreakpoint);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isAuthenticated && isPlaying) {
      updateCurrentTrack()
      // monitor the track status
      // to update the track
      interval = setInterval(() => updateCurrentTrack(), 1000)
    }

    return () => {
      // Clear the interval if it exists
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

  const HandleChangeState = () => {
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
      <article>
        <h1>Please make sure you have spotify open, play any song for one sec and try play your track in our UI</h1>
      </article>
    )
  }

  if (!isAuthenticated || !currentTrack.data || !currentUris) {
    return null
  }

  return (
    <article className={styles.PlayerContainer} onClick={isMobile ? () => console.log('OPEN PLAYER DETAILS SCREEN') : () => { }}>
      <div className={styles.Player}>
        <div className={styles.PlayerTrackInfoSection} >
          {currentTrack.data?.item && (
            <CurrentTrack track={currentTrack.data.item} />
          )}
        </div>
        <div className={styles.PlayerProgressBarSection}>
          <ProgressBar
            durationInMs={currentTrack.data?.item?.duration_ms ?? 0}
            progressInMs={currentTrack.data?.progress_ms ?? 0}
          />
        </div>
        <div className={styles.PlayerControlsSection}>
          <PlayerControls
            isPlaying={playerState.data}
            onChangeState={HandleChangeState}
          />
        </div>
        <div className={styles.SimpleControl}>
          {playerState.data ? <PiPauseFill onClick={HandleChangeState} /> : <PiPlayFill onClick={HandleChangeState} />}
        </div>
      </div>
    </article>
  )

}

export default Player