import { UIEvent, useEffect, useRef, useState } from "react"
import { PaginationEnum } from "../enums/PaginationEnum"
import { RootState, useAppDispatch, useAppSelector } from "../redux-store"
import { getPlaylistsPage } from "../redux-store/actions/playlistsActions"
import PlaylistCard from "./PlaylistCard"
import styles from "./Playlists.module.scss"

interface Props {
  categoryId: string
}

const Playlists = ({ categoryId }: Props) => {

  const dispatch = useAppDispatch()
  const [currentOffset, setCurrentOffset] = useState(0)
  const didMountRef = useRef(true)
  const { data } = useAppSelector((state: RootState) => state.playlists)
  const playlists = data && data[categoryId] ? data[categoryId].items : []

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (categoryId) {
      dispatch(getPlaylistsPage({
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

  if (data && data[categoryId] && data[categoryId].total === 0) {
    return (
      <div>No playlists</div>
    )
  }

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