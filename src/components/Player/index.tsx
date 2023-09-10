import { useRef } from "react"
import Draggable from "react-draggable"
import SpotifyWebPlayer from "react-spotify-web-playback/lib"
import store, { useAppDispatch, useAppSelector } from "../../redux-store"
import styles from "./Player.module.scss"
import { TbDragDrop } from "react-icons/tb"
import { playlistSelector } from "../../redux-store/selectors"
import { playerDragging } from "../../redux-store/reducers/uiSlice"

interface Props {
  isDraggable?: boolean
  isLoading: boolean
  urlImage?: string
}

const Player = ({ isDraggable, isLoading, urlImage }: Props) => {

  const dispatch = useAppDispatch()
  const nodeRef = useRef(null)
  const token = store.getState().auth.data?.access_token
  const { currentUris } = useAppSelector(playlistSelector)
  const imageStyle = urlImage ? { 'backgroundImage': `url(${urlImage})` } : {}
  const draggablePlayerClasses = isDraggable ? styles.DraggablePlayer : ''
  const playerContentClasses = currentUris ? styles.PlayerContent : ''
  const playerImageClasses = !isDraggable && `${styles.PlayerImage} ${isLoading && !urlImage && 'skeleton'}`

  const handleDrag = () => {
    dispatch(playerDragging(true))
  }

  const handleStopDrag = () => {
    dispatch(playerDragging(false))
  }

  return (
    <Draggable
      bounds='parent'
      handle="span"
      nodeRef={nodeRef}
      onDrag={handleDrag}
      onStop={handleStopDrag}
    >
      <article ref={nodeRef} className={draggablePlayerClasses}>
        <div
          style={imageStyle}
          className={`shadowed ${playerContentClasses} ${playerImageClasses}`}
        >
          {currentUris && (
            <div className={`${styles.Player} blurred-background`}>
              {isDraggable && (
                <span className={styles.PlayerContentDrag}>
                  <TbDragDrop />
                </span>
              )}
              <SpotifyWebPlayer
                autoPlay
                token={token ?? ""}
                uris={currentUris?.uris ?? []}
                showSaveIcon
                styles={{
                  activeColor: "#1DB954",
                  bgColor: "transparent",
                  color: "#000000",
                  loaderColor: "#1DB954",
                  sliderColor: "#1DB954",
                  trackArtistColor: "#000000",
                  trackNameColor: "#000000",
                }}
              />
            </div>
          )}
        </div>
      </article>
    </Draggable>
  )
}

export default Player