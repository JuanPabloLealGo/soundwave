import { useRef } from "react"
import Draggable from "react-draggable"
import SpotifyWebPlayer from "react-spotify-web-playback/lib"
import store, { RootState, useAppSelector } from "../../redux-store"
import styles from "./Player.module.scss"
import { TbDragDrop } from "react-icons/tb"

interface Props {
  isDraggable?: boolean
  showPicture?: boolean
}

const Player = ({ isDraggable, showPicture }: Props) => {

  const nodeRef = useRef(null)
  const token = store.getState().auth.data?.access_token
  const currentUris = useAppSelector((state: RootState) => state.playlists.currentUris)

  const handleDrag = () => {
    // Dragging
  }

  const handleStopDrag = () => {
    // Stop Drag
  }

  if (!currentUris) return null

  return (
    <Draggable
      bounds='parent'
      handle="span"
      nodeRef={nodeRef}
      onDrag={handleDrag}
      onStop={handleStopDrag}
    >
      <div ref={nodeRef} className={isDraggable ? styles.DraggablePlayer : styles.Player}>
        <div className={`shadowed blurred-background ${styles.PlayerContent}`}>
          {isDraggable && (
            <span className={styles.PlayerContentDrag}>
              <TbDragDrop />
            </span>
          )}
          {showPicture && (
            <div>Image</div>
          )}
          <SpotifyWebPlayer
            autoPlay
            token={token ?? ''}
            uris={currentUris}
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