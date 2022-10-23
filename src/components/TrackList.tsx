import TrackInterface from "../interfaces/TrackInterface"

interface Props {
  tracks: TrackInterface[]
}

const TrackList = ({ tracks }: Props) => {
  return (
    <div>
      {tracks.map((item) => {
        const { track } = item
        return <div key={track.id}>{track.name}</div>
      })}
    </div>
  )
}

export default TrackList