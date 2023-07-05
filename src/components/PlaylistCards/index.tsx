import { UIEvent } from "react"
import { useAppSelector } from "../../redux-store"
import PlaylistCard from "../PlaylistCard"
import { uiSelector } from "../../redux-store/selectors"

import styles from "./PlaylistCards.module.scss"
import PlaylistPageInterface from "../../interfaces/PlaylistPageInterface"

interface Props {
  isLoading: boolean
  onScrollHandle: (event: UIEvent<HTMLElement>) => void
  playlists: PlaylistPageInterface
}

const PlaylistCards = ({ isLoading, onScrollHandle, playlists }: Props) => {

  const { isDragging } = useAppSelector(uiSelector)

  return (
    <div
      onScroll={onScrollHandle}
      style={{ 'overflowX': `${isDragging ? 'hidden' : 'auto'}` }}
      className={styles.Playlists}
    >
      {playlists.items.map((item, index) => {
        if (item) {
          return <PlaylistCard key={`${item.id}_${index}`} playlist={item} />
        }
        return <p>empty card</p>
      })}
      {isLoading && <p>Loading...</p>}
    </div>
  )
}

export default PlaylistCards