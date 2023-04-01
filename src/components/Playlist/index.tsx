import { UIEvent, useEffect, useRef, useState } from "react"
import { PaginationEnum } from "../../enums/PaginationEnum"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { getPlaylistPage } from "../../redux-store/actions/playlistActions"
import PlaylistCard from "../PlaylistCard"
import styles from "./Playlist.module.scss"
import { playlistSelector } from "../../redux-store/selectors"

interface Props {
  categoryId: string
}

const Playlist = ({ categoryId }: Props) => {

  const dispatch = useAppDispatch()
  const [currentOffset, setCurrentOffset] = useState(0)
  const didMountRef = useRef(true)
  const { data } = useAppSelector(playlistSelector)
  const playlist = data && data[categoryId] ? data[categoryId].items : []

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (categoryId) {
      dispatch(getPlaylistPage({
        categoryId: categoryId,
        limit: PaginationEnum.playlistsLimit,
        offset: currentOffset
      }))
    }
  }, [categoryId, currentOffset, dispatch])

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
    const hasMoreData = data && data[categoryId] && data[categoryId].next !== null

    if (hasMoreData && (Math.floor(scrollWidth - scrollLeft) <= clientWidth)) {
      setCurrentOffset(prev => prev + PaginationEnum.playlistsLimit)
    }
  }


  if (data && data[categoryId] && (data[categoryId].total === 0 || data[categoryId].items.length === 0)) {
    return (
      <div>No playlists</div>
    )
  }

  return (
    <div onScroll={handleScroll} className={styles.Playlists} >
      {playlist.map((playlist, i) => {
        return playlist?.id
          ? <PlaylistCard key={i} categoryId={categoryId} playlist={playlist} />
          : null
      })}
    </div>
  )
}

export default Playlist