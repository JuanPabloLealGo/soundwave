import { UIEvent } from "react"
import PlaylistInterface from "../interfaces/PlaylistInterface"
import PlaylistCard from "./PlaylistCard"
import styles from "./Playlists.module.scss"

interface Props {
  onScroll: (event: UIEvent<HTMLElement>) => void
  playlists: PlaylistInterface[]
}

const Playlists = ({ onScroll, playlists }: Props) => {

  return (
    <div onScroll={onScroll} className={styles.Playlists}>
      {playlists.map((playlist) => {
        return playlist?.id
          ? <PlaylistCard key={playlist.id} playlist={playlist} />
          : null
      })}
    </div>
  )
}

export default Playlists