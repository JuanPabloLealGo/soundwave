import styles from './Player.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux-store'
import { authSelector, playerSelector, playlistSelector } from '../../redux-store/selectors'
import CurrentTrack from '../CurrentTrack'
import { changePlayerState, getCurrentTrack } from '../../redux-store/actions/playerActions'
import { useEffect } from 'react'
import PlayerControls from '../PlayerControls'
import { getArtists } from '../../utils'
import { PlayerStateEnum } from '../../enums/PlayerStateEnum'

const NewPlayer = () => {

  const dispatch = useAppDispatch()

  const { data: isAuthenticated } = useAppSelector(authSelector)
  const { currentTrack, playerState } = useAppSelector(playerSelector)
  const { currentUris } = useAppSelector(playlistSelector)

  useEffect(() => {
    if (isAuthenticated) {
      updateCurrentTrack()
      // monitor the track status
      // to update the track
      setInterval(() => updateCurrentTrack(), 2000)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated && currentUris) {
      dispatch(changePlayerState({ playerState: PlayerStateEnum.play, uri: currentUris.uris, position: currentUris.position }))
        .then(() => updateCurrentTrack())
    }
  }, [dispatch, isAuthenticated, currentUris])

  const HandleChangeState = () => {
    const state = playerState.data ? PlayerStateEnum.pause : PlayerStateEnum.play

    if (currentTrack.data && currentTrack.data.item)
      dispatch(changePlayerState({ playerState: state, uri: currentTrack.data.item.uri }))
  }

  const updateCurrentTrack = () => dispatch(getCurrentTrack())

  if (!isAuthenticated || !currentTrack) {
    return null
  }

  return (
    <div className={styles.NewPlayer}>
      {currentTrack.data?.item && (
        <div style={{ display: 'flex' }}>
          <span>{currentTrack.data.item.name}</span>
          <span>{getArtists(currentTrack.data.item.artists)}</span>
        </div>
      )}
      <CurrentTrack />
      <PlayerControls
        playerState={playerState.data}
        onChangeState={HandleChangeState}
      />
    </div>
  )

}

export default NewPlayer