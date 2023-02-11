import { useRef } from "react"
import Draggable from "react-draggable"
import SpotifyWebPlayer from "react-spotify-web-playback/lib"
import store, { RootState, useAppSelector } from "../../redux-store"
import styles from "./Player.module.scss"
import { TbDragDrop } from "react-icons/tb"

interface Props {
  isDraggable?: boolean
}

const Player = ({ isDraggable }: Props) => {

  const nodeRef = useRef(null)
  const token = store.getState().auth.data?.access_token
  const currentPlaylist = useAppSelector((state: RootState) => state.playlists.currentPlaylist)

  const handleDrag = () => {
    // Dragging
  }

  const handleStopDrag = () => {
    // Stop Drag
  }

  if (!currentPlaylist) return null

  return (
    <Draggable
      bounds='parent'
      handle="span"
      nodeRef={nodeRef}
      onDrag={handleDrag}
      onStop={handleStopDrag}
    >
      <div ref={nodeRef} className={styles.Player}>
        <div className={`shadowed blurred-background ${styles.PlayerContent}`}>
          {isDraggable && (
            <span className={styles.PlayerDrag}>
              <TbDragDrop />
            </span>
          )}
          <SpotifyWebPlayer
            autoPlay
            token={token ?? ''}
            uris={currentPlaylist?.uri}
            showSaveIcon
            styles={{
              activeColor: '#1DB954',
              bgColor: 'transparent',
              color: '#000000',
              loaderColor: '#1DB954',
              sliderColor: '#1DB954',
              trackArtistColor: '#000000',
              trackNameColor: '#000000',
            }}
          />
        </div>
      </div>
    </Draggable>
  )
}

export default Player