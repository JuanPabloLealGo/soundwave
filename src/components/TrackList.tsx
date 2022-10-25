import { useState } from "react"
import SpotifyWebPlayer from "react-spotify-web-playback/lib"
import TrackInterface from "../interfaces/TrackInterface"
import TrackItemInterface from "../interfaces/TrackItemInterface"
import store from "../redux-store"
import TrackCard from "./TrackCard"
import styles from "./TrackList.module.scss"

interface Props {
  tracks: TrackInterface[]
}

const TrackList = ({ tracks }: Props) => {
  const token = store.getState().auth.data?.access_token
  const [selectedTrack, setSelectedTrack] = useState(tracks[0].track)

  const handleTrackSelect = (track: TrackItemInterface) => setSelectedTrack(track)

  return (
    <div className={styles.TrackList}>
      <div className={styles.TrackListPlayer}>
        <SpotifyWebPlayer
          token={token ?? ''}
          uris={selectedTrack.uri}
          styles={{
            bgColor: 'red'
          }}
        />
      </div>
      <div className={styles.TrackListItems}>
        {tracks.map((item) => {
          const { track } = item
          return (
            <TrackCard
              key={track.id}
              track={track}
              onTrackSelect={handleTrackSelect}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TrackList