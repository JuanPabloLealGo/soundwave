import { UIEvent, useEffect } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../redux-store"
import { getPlaylistsPage } from "../redux-store/actions/playlistsActions"
import PlaylistCard from "./PlaylistCard"
import styles from "./Playlists.module.scss"

interface Props {
  categoryId: string
}

const Playlists = ({ categoryId }: Props) => {

  const dispatch = useAppDispatch()

  const {
    data,
    isLoading
  } = useAppSelector((state: RootState) => state.playlists)

  useEffect(() => {
    if (categoryId) {
      const offset = 0
      dispatch(getPlaylistsPage({ categoryId: categoryId, limit: 10, offset }))
    }
  }, [categoryId, dispatch])

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    // Make sure the data is not loading before send a new request

    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget

    if (Math.floor(scrollWidth - scrollLeft) <= clientWidth) {
      console.log('request')
    }
  }

  const playlists = data && data[categoryId] ? data[categoryId].items : []

  return (
    <div onScroll={handleScroll} className={styles.Playlists} >
      {playlists.map((playlist, i) => {
        return playlist?.id
          ? <PlaylistCard key={i} playlist={playlist} />
          : null
      })}
    </div>
  )
}

export default Playlists