import PlaylistInterface from "../interfaces/PlaylistInterface"
import PlaylistCard from "./PlaylistCard"
import styles from "./Playlists.module.scss"

interface Props {
  playlists: PlaylistInterface[]
}

const Playlists = ({ playlists }: Props) => {
  return (
    <div className={styles.Playlists}>
      {playlists.map((playlist) => {
        return playlist?.id
          ? <PlaylistCard key={playlist.id} playlist={playlist} />
          : null
      })}
    </div>
  )
}

export default Playlists