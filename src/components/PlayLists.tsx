import PlaylistInterface from "../interfaces/PlaylistInterface"

interface Props {
  playlists: PlaylistInterface[]
}

const Playlists = ({ playlists }: Props) => {
  return (
    <div>
      {playlists.map((playlist, index) => {
        return playlist?.id
          ? <div key={index}>{playlist?.name.toLowerCase()}</div>
          : null
      })}
    </div>
  )
}

export default Playlists